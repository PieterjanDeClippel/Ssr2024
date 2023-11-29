import { InjectionToken } from "@angular/core";

export interface DataFromServer { }
export const DATA_FROM_SERVER = new InjectionToken<DataFromServer>('DataFromServer');
