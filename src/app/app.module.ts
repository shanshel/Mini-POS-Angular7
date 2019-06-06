import { CommonModule } from '@angular/common';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormsModule } from 'ngx-custom-validators';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { environment } from '../environments/environment';
import { AuthGuard } from './core/guards/auth-guard.service';
import { LoggedInGuard } from './core/guards/logged-in-guard.service';
import { CoreModule } from './@core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from './@theme/theme.module';
import { NbToastrModule } from '@nebular/theme';
import { TranslateReplacerDirective } from './translate-replacer.directive';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    CoreModule.forRoot(),

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          baseEndpoint: '',
          login: {
            endpoint: environment.EndPoint.AUTH,
            redirect: {
              success: '/auth/redirect',
              failure: null,
            },
          },
          logout: {
            endpoint: '',
            method: 'get',
            redirect: {
              success: '/auth/login',
              failure: null,
            },
          },
        }),
      ],
      forms: {},
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
     AuthGuard,
     LoggedInGuard
  ],
})
export class AppModule {
}
