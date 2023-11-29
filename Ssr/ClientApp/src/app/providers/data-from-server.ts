import { InjectionToken } from "@angular/core";

export interface DataFromServer {
  someObject: Person;
}

export interface Person {
  firstName: string;
  lastName: string;
}

export const DATA_FROM_SERVER = new InjectionToken<DataFromServer>('DataFromServer');
