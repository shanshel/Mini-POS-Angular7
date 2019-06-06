import { Observable } from 'rxjs';

export interface Enrollment {
  Id: string;
  EmployeeId: string;
  DepartmentId: string;
  RoleId: string;
  StartDate: Date;
  EndDate: Date;
  Status: Number;
  IsDeleted: Boolean;
}

export abstract class EnrollmentData {
  abstract getEnrollments(): Observable<Enrollment[]>;
}
