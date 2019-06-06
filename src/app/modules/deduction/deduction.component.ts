import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MenuItemsService } from '../../core/services/menu-items.service';

@Component({
  selector: 'ngx-deduction',
  template: `
  <ngx-one-column-layout>
    <nb-menu [items]="MENU_ITEMS" autoCollapse="true"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>
  `,
  styleUrls: ['./deduction.component.scss']
})
export class DeductionComponent implements OnInit {
  MENU_ITEMS: NbMenuItem[] = [];

  constructor(private _menuItems: MenuItemsService) { }

  ngOnInit(): void {
    this.MENU_ITEMS = this._menuItems.get();
}

}
