import { Observable } from 'rxjs';

export interface Governorate {
  Id: string;
  Name: string;
}

export abstract class GovernorateData {
  abstract getGovernorates(): Observable<Governorate[]>;
}
