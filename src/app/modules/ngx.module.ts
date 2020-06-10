import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      BrowserAnimationsModule,
      PerfectScrollbarModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
      }),
      BsDatepickerModule.forRoot(),
      ModalModule.forRoot()
    ],
    exports: [
      PerfectScrollbarModule,
      BsDatepickerModule,
      ModalModule
    ],
    providers: [
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }
    ]
  })
  export class NgxModule { }