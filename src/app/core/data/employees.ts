import { Observable } from 'rxjs';

export interface Employee {
  id?: string;
  govId?: string;
  companyId?: string;
  employeePhotoId?: string;
  gander: Number;
  maritalStatus: Number;
  qiCardNum: string;
  qiAccountNum: string;
  insuranceNum: string;
  firstName: string;
  lastName: string;
  surname: string;
  motherFullName: string;
  phone: string;
  address: string;
  nationalCardNumber: string;
  birthday: Date;
  isDeleted: Boolean;
}

export abstract class EmployeeData {
  abstract getEmployees(): Observable<Employee[]>;
}
