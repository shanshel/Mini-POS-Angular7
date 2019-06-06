import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { MenuItemsService } from '../../core/services/menu-items.service';

@Component({
  selector: 'ngx-allowances',
  template: `
  <ngx-one-column-layout>
    <nb-menu [items]="MENU_ITEMS" autoCollapse="true"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>
  `,
  styleUrls: ['./allowances.component.scss']
})
export class AllowancesComponent implements OnInit {
  MENU_ITEMS: NbMenuItem[] = [];

  constructor(private _menuItems: MenuItemsService) { }

  ngOnInit(): void {
    this.MENU_ITEMS = this._menuItems.get();
}

}
