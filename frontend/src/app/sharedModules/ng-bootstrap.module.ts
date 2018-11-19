import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbAlertModule.forRoot()
  ],
  exports: [
    NgbAlertModule
  ],
  declarations: []
})
export class NgBootstrapModule {
}
