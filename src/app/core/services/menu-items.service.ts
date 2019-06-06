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
          title: getTranslate('statistics') ,
          expanded: false,
          link: '/statistics/operator',
          icon: 'nb-keypad',
        },
        {
          title: getTranslate('employees') ,
          expanded: false,
          link: '/employees',
          icon: 'nb-person',
        },
        {
          title:  getTranslate('job_title_short') ,
          expanded: false,
          link: '/jobtitle',
          icon: 'nb-title',
        },
        {
          title: getTranslate('view_payment_info') ,
          expanded: false,
          link: '/payments',
          icon: 'nb-checkmark-circle'
        },
        {
          title: getTranslate('merits') ,
          expanded: false,
          link: '/allowances/view',
          icon: 'nb-arrow-thin-up'
        },
        {
          title: getTranslate('deductions') ,
          expanded: false,
          link: '/deductions/view',
          icon: 'nb-arrow-thin-down'
        },
        {
          title:getTranslate('calculation_of_salaries') ,
          expanded: false,
          icon: 'nb-compose',
          link: '/payments/calculate-payment',
        }

      ];
    }
    else if (role === environment.Role.Admin) {
      this.MENU_ITEMS = [
        {
          title:getTranslate('statistics'),
          expanded: false,
          link: '/statistics/admin',
          icon: 'nb-bar-chart',
        },
        {
          title: getTranslate('users') ,
          expanded: false,
          icon: 'nb-person',
          link: '/users',
        },
        {
          title : getTranslate('circuits') ,
          expanded: false,
          icon: 'nb-home',
          link: '/departments',
        },

        {
          title: getTranslate('view_payment'),
          expanded: false,
          link: '/payments',
          icon: 'nb-compose',
        },
        {
          title:getTranslate('banks'),
          expanded: false,
          link: '/bank',
          icon: 'nb-layout-centre',
        }
      ];
    }

    else if (role === environment.Role.Accountant) {
      this.MENU_ITEMS = [
        {
          title: getTranslate('statistics'),
          expanded: false,
          link: '/statistics/accountant',
          icon: 'nb-keypad',
        },
        {
          title: getTranslate('employees') ,
          expanded: false,
          link: '/employees',
          icon: 'nb-person',
        },

        {
          title: getTranslate('view_payment_info'),
          expanded: false,
          link: '/payments',
          icon: 'nb-checkmark-circle',
        },



      ];
    }
 

  }




}
