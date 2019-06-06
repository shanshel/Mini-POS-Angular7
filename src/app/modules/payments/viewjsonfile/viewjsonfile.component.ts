import { StatisticsServeice } from './../../../core/services/http/statistics/statistics.service';
import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-viewjsonfile',
  templateUrl: './viewjsonfile.component.html',
  styleUrls: ['./viewjsonfile.component.scss']
})
export class ViewjsonfileComponent implements OnInit {
  @Input() item;

  columnDefs = [];

  rowData = [];

  constructor(
    protected ref: NbDialogRef<ViewjsonfileComponent>,
    private httpStatistic: StatisticsServeice
    ) { }

  ngOnInit() {

    this.httpStatistic.downloadJsonAsync().subscribe(res => {
      
      let grid = res['data'];
      let headers = [];
      let data = [];
      let x = 0;
      for (let employeeKey in grid['employees']) {
        if (grid['employees'].hasOwnProperty(employeeKey)) {
          if (x === 0) {
            for (let property in grid['employees'][employeeKey]) {
              if (grid['employees'][employeeKey]['EmployeeInfo'].hasOwnProperty(property)) {
                headers.push({headerName: property, field: property });
              }
            }
    
            for (let property in grid['employees'][employeeKey]['EmployeeDeductions']) {
              if (grid['employees'][employeeKey]['EmployeeDeductions'].hasOwnProperty(property)) {
                headers.push({headerName: property, field: property });
              }
            }
    
            for (let property in grid['employees'][employeeKey]['EmployeeAllowances']) {
              if (grid['employees'][employeeKey]['EmployeeAllowances'].hasOwnProperty(property)) {
                headers.push({headerName: property, field: property });
              }
            }
          }
          console.log(grid['employees'][employeeKey]);
          let employeeRow = {
            ...grid['employees'][employeeKey]['EmployeeInfo'], 
            ...grid['employees'][employeeKey]['EmployeeDeductions'], 
            ...grid['employees'][employeeKey]['EmployeeAllowances'] 
          };
          data.push(employeeRow);
          x++;
         
        }
      }



      this.rowData = data;
      this.columnDefs = headers;
    });
  }
  
  dismiss() {
    this.ref.close();
  }

}
