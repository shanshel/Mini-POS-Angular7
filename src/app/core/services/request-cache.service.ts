import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

const maxAge = 0;//1200000;
@Injectable()
export class RequestCache  {

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {

    const url = req.urlWithParams;
    const objectFromLocalStorage = localStorage.getItem(url);

      if (objectFromLocalStorage) {
        const saveJsonObject = JSON.parse(objectFromLocalStorage);
        if (saveJsonObject.lastRead > (Date.now() - maxAge)) {
          return saveJsonObject.response;
        }
      }
      return undefined;
  }

  put(req: HttpRequest<any>, response: any): void {
    if (req.method === 'GET') {
      const url = req.urlWithParams;
      const objectToSave = {
        url,
        response,
        lastRead: Date.now()
      };
      localStorage.setItem( url  , JSON.stringify(objectToSave));
    }
  }
}
