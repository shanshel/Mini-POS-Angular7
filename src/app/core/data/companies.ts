import { Observable } from 'rxjs';

export interface Company {
  Id: String;
  IsInsured: Number;
  Name: String;
  CreatedDate: Date;
  IsDeleted: Boolean;
}

export abstract class CompanyData {
  abstract getCompanies(): Observable<Company[]>;
}
