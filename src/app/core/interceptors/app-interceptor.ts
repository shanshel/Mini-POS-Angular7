import { AppTokenService } from './../../shared/services/app-token.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { RequestCache } from '../services/request-cache.service';
import { ErrorsHandlerService } from '../services/errors-handler.service';
import { NbAuthService } from '@nebular/auth';


@Injectable()
export class AppInterceptor implements HttpInterceptor {
  stagedRequests = {};
  constructor(
    private _cache: RequestCache, 
    private _errorsHanlder : ErrorsHandlerService,
    private _appToken: AppTokenService,
    private _authService : NbAuthService,
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (this._authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${this._appToken.getToken()}`
        }
      });
    }

    //cache only get request
    if (req.method !== 'GET') {
      return this.sendRequest(req, next, this._cache);
    }

    
    const cachedResponse = this._cache.get(req);

    if (cachedResponse) {
      console.log('load from Cache');
    } else {
      console.log('load from API');
    }

    let responseFromLocal;
    if (cachedResponse) {
      responseFromLocal = new HttpResponse({
        body: cachedResponse.body,
        headers: new HttpHeaders(JSON.stringify(cachedResponse.headers)),
        status: cachedResponse.status,
        statusText: cachedResponse.statusText,
        url: cachedResponse.url
      });
    } else {
      responseFromLocal = false;
    }

    return responseFromLocal ? of(responseFromLocal) : this.sendRequest(req, next, this._cache);
  }

  ignoreMethods = ['OPTIONS'];
  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    _cache: RequestCache): Observable<HttpEvent<any>> {

     
 

    return next.handle(req).pipe(
      tap(event => {

        if (event instanceof HttpResponse) {
        

          this._errorsHanlder.handleSuccess(event, req);
          _cache.put(req, event);
        }
      }),
      catchError((error: HttpErrorResponse) => {

        if (!this.ignoreMethods.includes(req.method)) {
          this._errorsHanlder.handle(error, req);
          return throwError(error);
        }
      }),
    );
  }
}
