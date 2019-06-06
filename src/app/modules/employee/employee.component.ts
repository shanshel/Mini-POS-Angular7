import { MenuItemsService } from './../../core/services/menu-items.service';
import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';


@Component({
  selector: 'ngx-admin',
  styleUrls: ['employee.component.scss'],
  template: `
  <ngx-one-column-layout>
    <nb-menu [items]="MENU_ITEMS" autoCollapse="true"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>
  `,
})
export class EmployeeComponent implements OnInit {
    MENU_ITEMS: NbMenuItem[] = [];

    constructor(private _menuItems: MenuItemsService) {

    }

    ngOnInit(): void {
      this.MENU_ITEMS = this._menuItems.get();
    }
}
