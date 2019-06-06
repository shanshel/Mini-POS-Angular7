import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { EmployeeData, Employee } from '../data/employees';

@Injectable()
export class EmployeesService extends EmployeeData {

  private time: Date = new Date;

  private employees: Employee[] = [

  ];

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }
}
