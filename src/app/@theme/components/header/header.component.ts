import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { AppTokenService } from '../../../shared/services/app-token.service';
import { filter, map } from 'rxjs/operators';
import { NbAuthService } from '@nebular/auth';
import { Router, NavigationEnd } from '@angular/router';
import { getTranslate } from '../../../lang';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: any;
  currentUrl = "";
  userMenu = [{ title: getTranslate('logout')  }];
  langaugeList = [{ title: 'عربي' }, { title: 'English' }, { title: 'Kurdish' }];
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserData,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,
              private _appToken : AppTokenService,
              private nbMenuService: NbMenuService,
              private _authService : NbAuthService,
              private router: Router
              
              ) {
  }

  ngOnInit() {

    this.nbMenuService.onItemClick()
      .subscribe(title => {
        if (title.item.title === getTranslate('logout')) {
          this._authService.logout('email').subscribe(res => {
            console.log('dddbb', res);
          });

        }
        else if (title.item.title === 'عربي') {
          localStorage.setItem('lang', 'ar');
          location.reload();
        }
        else if (title.item.title === 'Kurdish') {
          localStorage.setItem('lang', 'kr');
          location.reload();
        }
        else if (title.item.title === 'English') {
          localStorage.setItem('lang', 'en');
          location.reload();
        }
      });


      this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
       .subscribe((event:NavigationEnd) => {
         this.currentUrl = this.router.url;
       });
      this.user = {name: this._appToken.getPayload().email, picture: 's'};


  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
