import { ToastrService } from './../../shared/services/toastr.service';
import { Injectable } from '@angular/core';
import { getTranslate } from '../../lang';
@Injectable({
  providedIn: 'root'
})
export class ErrorsHandlerService {

  constructor(private _toastr: ToastrService) { }

  handleSuccess(response, request) {
    
    
    let message = "";
    if (request.method === "POST") {
      if (request.url.includes('api/Auth')) {
        message = getTranslate('logged_successfully') ;

      } else {
        message = getTranslate('data_saved_successfully') ;

      }
      status = 'success';
    }
    if (request.method === "DELETE") {
      message = getTranslate('successfully_deleted') ;

      status = 'success';


    }
    if (request.method === "GET" && response.status === 204) {
      message = getTranslate('there_is_ no_data') ;
      status = 'info';
    }

    if (message !== "") {
      this._toastr.showToast(message, '', {
        status: status
      });
    }

   
  }

  handle(error, req) {

    let message = '';
    let type = 'error';
    if (req.method === 'POST' || req.method === 'DELETE') {
      switch (error.status) {
        case 401: 
          if (error.url.includes('api/Auth')) {
            message = getTranslate('username_or_password_is_wrong') ;
          }
          else {
            message = getTranslate('you_are_not_authorized_to_do') ;
          }
          break;
        case 400:
          type = 'error';
          if (error.error.message === 'empty response') {
            message :getTranslate('there_is_ no_data') ;
          }
          else if (error.error.title === "One or more validation errors occurred.") {
            message = getTranslate('please_check_information_entered');
          }
          else {
            message = getTranslate('insufficient_information') ;
          }
        case 404:
          type = 'info';
          message = getTranslate('there_is_no_data') ;

        break;
        default:
          message =getTranslate('something_went_wrong_please_try_again_later') ;

      }
    }
    else {
      switch (error.status) {
        case 401:
          message = getTranslate('you_are_not_authorize_to_display_this_type_information') ;
          break;
        case 400:
          type = 'info';
          message = getTranslate('there_is_no_data') ;
          break;
        case 404:
          type = 'info';
          message = getTranslate('there_is_no_data') ;
        case 204: 
          type = 'info';
          message =getTranslate('there_is_no_data') ;
          break;
        case 500:
          message = getTranslate('something_went_wrong_please_try_again_later') ;
        break;
        default:
          message =getTranslate('something_went_wrong_please_try_again_later') ;
      }
    }
    

    if (type === 'info') {
      this._toastr.showToast(message, '', {
          status: 'warning'
      });
    } else {
      this._toastr.showToast(message, '', {
          status: 'danger'
      });
    }
  }
}
