import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';
import { routedComponents, StatisticRoutingModule } from './statistic-routing.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { BankChartComponent } from './pages/admin/bank-chart.component';

@NgModule({
  declarations: [
    routedComponents,
    BankChartComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StatisticRoutingModule,
    NbDialogModule.forChild(),
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule
  ],
  entryComponents: [
  ],
})
export class StatisticModule { }
