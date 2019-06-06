import { AppTokenService } from './shared/services/app-token.service';
import { MenuItemsService } from './core/services/menu-items.service';

import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbLayoutDirectionService, NbLayoutDirection, NbThemeService } from '@nebular/theme';
import { StateService } from './@core/utils';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Router, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet ngxTranslateReplacer></router-outlet>',
})
export class AppComponent implements OnInit {
  directions = NbLayoutDirection;
  constructor(
    private analytics: AnalyticsService,
    private directionService: NbLayoutDirectionService,
    private themeService: NbThemeService,
    protected stateService: StateService,
    private _menuItems: MenuItemsService,
    private _authService : NbAuthService,
    private _appToken : AppTokenService,
    private router: Router
    ) {
  }


  ngOnInit(): void {
    
    this.themeService.changeTheme('corporate');
    this.analytics.trackPageViews();
    this.directionService.setDirection(this.directions.RTL);
    
    /*
    this._authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      
      if (token.isValid()) {
        
        this._appToken.setTokenData(token);
        this._menuItems.buildMenu(token.getPayload().FeRole);

        setTimeout(() => {
          if (this.router.url === '/'){
            this._appToken.redirectToHomePage();
          }
        }, 500);
         
        } 
        else {
          
          console.log("i will go to login");
          this._appToken.setNoToken();
          setTimeout(() => {
            this._appToken.redirectToLoginPage();
          }, 200);
  
        }

        
    });

    this.router.events.subscribe((val) => {
   
      if (val instanceof NavigationEnd) {
        console.log("nav end", this._appToken.getToken());
        if (this._appToken.getToken() === false) {
          this._appToken.redirectToLoginPage();
        }
      }
      
    });

    */
  }

  checkToken() {
    
  }

}
