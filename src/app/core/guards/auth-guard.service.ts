import { AppTokenService } from './../../shared/services/app-token.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { NbAuthService } from '@nebular/auth';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(
    private _router: Router, 
    private _appToken : AppTokenService,

    ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
    if (this._appToken.getToken()) {
        console.log("authguard go home");
        //this._appToken.redirectToHomePage();
        return false;
    }
    console.log("authguard allow login");
    return true;
  }
}