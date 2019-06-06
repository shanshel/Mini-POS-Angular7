import { AppInterceptor } from './../core/interceptors/app-interceptor';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableDropdownComponent } from './components/table-dropdown/table-dropdown.component';
import { ToastrService } from './services/toastr.service';
import { RequestCache } from '../core/services/request-cache.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsHandlerService } from '../core/services/errors-handler.service';
import { AllowancesComponent } from './components/allowances/allowances.component';
import { DeductionsComponent } from './components/deductions/deductions.component';
import { DialogConfirmationComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbToastrService, NbToastrModule } from '@nebular/theme';
import { TranslateDirective } from '../translate.directive';
import { TranslateReplacerDirective } from '../translate-replacer.directive';

@NgModule({
  declarations: [
    TranslateDirective, 
    PaginationComponent,
    TranslateReplacerDirective, 
    TableDropdownComponent, AllowancesComponent, DeductionsComponent, DialogConfirmationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
  ],
  exports: [
    PaginationComponent,
    TableDropdownComponent,
    AllowancesComponent,
    DeductionsComponent,
    ThemeModule,
    TranslateDirective,
    TranslateReplacerDirective,

  ],
  providers: [

    ErrorsHandlerService,
    RequestCache,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
  ],
  entryComponents: [
    DialogConfirmationComponent,
  ]

})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
      ],
    };
  }
}
