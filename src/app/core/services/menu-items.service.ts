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

    if (role === environment.Role.Operator) {
      this.MENU_ITEMS = [
        {
          title: 'الاحصائيات',
          expanded: false,
          link: '/statistics/operator',
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
          link: '/jobtitle',
          icon: 'nb-title',
        }
      ];
    }
    else if (role === environment.Role.Admin) {
      this.MENU_ITEMS = [
        {
          title: 'الاحصائيات',
          expanded: false,
          link: '/statistics/operator',
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
          link: '/jobtitle',
          icon: 'nb-title',
        }
      ];
    }

    else if (role === environment.Role.Accountant) {
      this.MENU_ITEMS = [
        {
          title: 'الاحصائيات',
          expanded: false,
          link: '/statistics/operator',
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
          link: '/jobtitle',
          icon: 'nb-title',
        }


      ];
    }
 

  }




}
