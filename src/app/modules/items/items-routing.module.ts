
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items.component';
import { ItemViewComponent } from './pages/item-view/item-view.component';
import { ItemCreateComponent } from './pages/item-create/item-create.component';


const routes: Routes = [{
  path: '',
  component: ItemsComponent,
  children: [
    {
        path: '',
        component: ItemViewComponent,
    },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsRoutingModule { }

export const routedComponents = [
  ItemsComponent,
  ItemCreateComponent,
  ItemViewComponent,
];
