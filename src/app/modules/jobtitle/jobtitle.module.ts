import { JobtitleCreateComponent } from './pages/jobtitle-create/jobtitle-create.component';
import { JobtitleRoutingModule, routedComponents } from './jobtitle-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    JobtitleRoutingModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    JobtitleCreateComponent
  ],
})
export class JobtitleModule { }
