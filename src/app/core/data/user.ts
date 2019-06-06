import { Observable } from 'rxjs';

export interface User {
  Id: string;
  Email: string;
  Password: string;
  Role: string;
  CreateDate: Date;
  IsDeleted: Boolean;
}

export abstract class UserData {
  abstract getUsers(): Observable<User[]>;
}
