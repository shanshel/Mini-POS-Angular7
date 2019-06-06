import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NbDialogModule } from '@nebular/theme';
import { ItemsRoutingModule, routedComponents } from './items-routing.module';
import { ItemCreateComponent } from './pages/item-create/item-create.component';


@NgModule({
  declarations: [
    ...routedComponents,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ItemsRoutingModule,
    NbDialogModule.forChild(),
  ],
  entryComponents: [
    ItemCreateComponent
  ],
})
export class ItemsModule { }
