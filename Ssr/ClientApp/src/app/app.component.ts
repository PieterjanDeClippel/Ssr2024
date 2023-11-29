import { Component, Inject, Optional, PLATFORM_ID, TransferState, makeStateKey } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, isPlatformServer } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DATA_FROM_SERVER, DataFromServer, Person } from './providers/data-from-server';

const someObjectState = makeStateKey<Person>('someObject');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translateService: TranslateService, private router: Router, private route: ActivatedRoute, private transferState: TransferState, @Inject(PLATFORM_ID) private platformId: any, @Optional() @Inject(DATA_FROM_SERVER) private dataFromServer: DataFromServer) {
    this.translateService.setDefaultLang('en');
    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe((params: any) => {
        const lang = params.get('lang');
        if (lang) {
          this.translateService.use(lang);
        }
      });

    if (isPlatformServer(this.platformId)) {
      this.someObject = dataFromServer?.someObject;
      this.transferState.set(someObjectState, this.someObject);
    } else if (this.transferState.hasKey(someObjectState)) {
      this.someObject = this.transferState.get(someObjectState, undefined);
      this.transferState.remove(someObjectState);
    } else {
      // This is not the landing page component
      // We need to send a webrequest to retrieve the data
    }
  }

  title = 'ClientApp';
  someObject?: Person;

  useLanguage(language: string) {
    this.router.navigate([], {
      queryParams: {
        lang: language
      }
    });
  }
}
