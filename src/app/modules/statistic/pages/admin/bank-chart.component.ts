import { Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService, NbColorHelper } from '@nebular/theme';

@Component({
  selector: 'ngx-bank-chart',
  template: `
    <nb-card>
      <nb-card-header>{{bankObject.bankName}}</nb-card-header>
      <nb-card-body>
        <chart type="bar" [data]="data" [options]="options"></chart>
        <chart type="bar" [data]="data2" [options]="options"></chart>
      </nb-card-body>
    </nb-card>
  `,
})
export class BankChartComponent implements OnDestroy {
  @Input() bankObject;
  data: any;
  data2: any;
  options: any;
  themeSubscription: any;
  lables;
  noOfEmployeesDataset;
  totalSalaryesDataset;

  importDetails() {
    let promise = new Promise((resolve, reject) => {
      let lables = [];
      let noOfEmployeesDataset = [];
      let totalSalaryesDataset = [];
      console.log(this.bankObject);
      for (let item of this.bankObject.bankDtos) {
        let current_datetime = new Date(item.payDate);
        let formatted_date =  current_datetime.getFullYear() + "-" + current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1);

        lables.push(formatted_date);
        noOfEmployeesDataset.push(item.noOfEmployees);
        totalSalaryesDataset.push(item.totalSalaryes);
      }
      this.lables = lables; 
      this.noOfEmployeesDataset = noOfEmployeesDataset;
      this.totalSalaryesDataset = totalSalaryesDataset;
      resolve();
    });
    return promise;
  }

  ngOnInit(): void {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.importDetails().then(res => {
        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;
  
        this.data = {
          labels: this.lables,
          datasets: [
            {
              data: this.noOfEmployeesDataset,
              label: 'عدد الموظفين',
              backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
            }
          ],
        };
  
        this.data2 = {
          labels: this.lables,
          datasets: [
            {
              data: this.totalSalaryesDataset,
              label: 'الرواتب',
              backgroundColor: NbColorHelper.hexToRgbA(colors.infoLight, 0.8),
            }
          ],
        };

        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });

   
    });
    
  }
  constructor(private theme: NbThemeService) {
  
  
  }

  
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
