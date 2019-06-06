import { AppTokenService } from './../../shared/services/app-token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class LoggedInGuard implements CanActivate {


  constructor(
    private _router: Router, 
    private _appToken : AppTokenService,
    ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log("loggedin", this._appToken.getToken());
    if (this._appToken.getToken()) {
      console.log("loggedguard allow");

      return true;
    }
    console.log("loggedguard go login page");
    //this._appToken.redirectToLoginPage();
    return false;
    

  }
}