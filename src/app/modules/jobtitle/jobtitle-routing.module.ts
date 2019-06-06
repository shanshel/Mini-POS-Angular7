import { JobtitleCreateComponent } from './pages/jobtitle-create/jobtitle-create.component';
import { JobtitleViewComponent } from './pages/jobtitle-view/jobtitle-view.component';
import { JobtitleComponent } from './jobtitle.component';


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  component: JobtitleComponent,
  children: [
    {
        path: '',
        component: JobtitleViewComponent,
    },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobtitleRoutingModule { }

export const routedComponents = [
  JobtitleComponent,
  JobtitleViewComponent,
  JobtitleCreateComponent,
];
