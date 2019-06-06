import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { AppTokenService } from '../../../shared/services/app-token.service';

@Component({
  selector: 'ngx-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(
    private _authService : NbAuthService,
    private _appToken : AppTokenService,

    ) { }

  ngOnInit() {
    this._authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        this._appToken.setTokenData(token);
        this._appToken.redirectToHomePage();
      } else {
        this._appToken.redirectToLoginPage();
      }
    });
  }

}
