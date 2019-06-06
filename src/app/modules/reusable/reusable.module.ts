import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReusableRoutingModule, routedComponents } from './reusable-routing.module';
import { ReusableDialogComponent } from './pages/reusable-view-page/reusable-dialog/reusable-dialog.component';
import { NbDialogModule } from '@nebular/theme';
import { ReusableChartPageComponent } from './pages/reusable-chart-page/reusable-chart-page.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  declarations: [
    routedComponents,
    ReusableChartPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReusableRoutingModule,
    NbDialogModule.forChild(),
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
  ],
  entryComponents: [
    ReusableDialogComponent,
  ],
})
export class ReusableModule { }
