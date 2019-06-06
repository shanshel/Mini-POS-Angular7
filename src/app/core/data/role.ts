import { Observable } from 'rxjs';

export interface Role {
  Id: string;
  CompanyId: string;
  Name: string;
  Salaray: Number;
  IsDeleted: Boolean;
}

export abstract class RoleData {
  abstract getRoles(): Observable<Role[]>;
}
