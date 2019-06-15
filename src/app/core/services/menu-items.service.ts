import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { environment } from '../../../environments/environment';
import { getTranslate } from '../../lang';

@Injectable({
  providedIn: 'root'
})
export class MenuItemsService {

  MENU_ITEMS: NbMenuItem[] = [];


  constructor() { }

  set(menuList) {
    this.MENU_ITEMS = menuList;
  }

  get() {
    return this.MENU_ITEMS;
  }

  buildMenu(role) {

    this.MENU_ITEMS = [
      {
        title: 'البيع',
        expanded: false,
        link: '/sell',
        icon: 'nb-keypad',
      },
      {
        title: 'المواد',
        expanded: false,
        link: '/items',
        icon: 'nb-keypad',
      },
      {
        title: 'الزبائن',
        expanded: false,
        link: '/customer',
        icon: 'nb-person',
      },
      {
        title: 'الفواتير',
        expanded: false,
        link: '/invoices',
        icon: 'nb-title',
      }
    ];
 

  }




}
