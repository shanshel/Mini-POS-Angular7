import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

interface toastrOptions {
  position?: any;
  status?: any;
  destroyByClick?: boolean;
  duration?: number;
  preventDuplicates?: boolean;
  icon?: any;
}
@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  private _index: number = 0;


  constructor(private toastrService: NbToastrService) {

  }

  get index() {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  showToast(title, message, options: toastrOptions) {
    this.index += 1;
    this.toastrService.show(
      message || null,
      title || null,
      {
        position: options.position || 'bottom-right',
        status: options.status || 'warning',
        destroyByClick: options.destroyByClick || true,
        duration: options.duration || 5000,
        preventDuplicates: options.preventDuplicates || false,
        icon: options.icon || '',
      });
  }
}
