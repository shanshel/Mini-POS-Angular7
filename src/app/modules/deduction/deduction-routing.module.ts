import { AddDeductionComponent } from './dialog/add-deduction/add-deduction.component';
import { ViewDeductionsComponent } from './pages/view-deductions/view-deductions.component';
import { DeductionComponent } from './deduction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditDeductionComponent } from './dialog/edit-deduction/edit-deduction.component';



const routes: Routes = [{
  path: '',
  component: DeductionComponent,
  children: [
    {
        path: 'view',
        component: ViewDeductionsComponent,
    },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeductionRoutingModule { }

export const dRoutedComponents = [
  ViewDeductionsComponent,
  DeductionComponent,
  AddDeductionComponent,
  EditDeductionComponent
];
