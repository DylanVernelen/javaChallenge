import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgbAlertModule, NgbCollapseModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbAlertModule.forRoot(),
    NgbCollapseModule.forRoot(),
    NgbModalModule.forRoot()
  ],
  exports: [
    NgbAlertModule,
    NgbCollapseModule
  ],
  declarations: []
})
export class NgBootstrapModule {
}
