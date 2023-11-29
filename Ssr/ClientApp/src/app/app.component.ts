import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translateService: TranslateService, private router: Router, private route: ActivatedRoute) {
    this.translateService.setDefaultLang('en');
    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe((params: any) => {
        const lang = params.get('lang');
        if (lang) {
          this.translateService.use(lang);
        }
      });
  }

  title = 'ClientApp';

  useLanguage(language: string) {
    this.router.navigate([], {
      queryParams: {
        lang: language
      }
    });
  }
}
