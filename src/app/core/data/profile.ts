import { Observable } from 'rxjs';

export interface Profile {
  Id: string;
  UserId: string;
  CompanyId: string;
  FirstName: string;
  LastName: string;
  Surname: string;
  MotherFullName: string;
  EmployeePhotoId: string;
  Gander: Number;
  Phone: string;
  MaritalStatus: Number;
  Address: string;
  NationalCardNumber: string;
  Birthday: Date;
  IsDeleted: Boolean;
}

export abstract class ProfileData {
  abstract getProfiles(): Observable<Profile[]>;
}
