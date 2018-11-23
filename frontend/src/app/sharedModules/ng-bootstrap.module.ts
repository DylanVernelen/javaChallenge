import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NgbAlertModule, NgbCollapseModule, NgbModalModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbAlertModule.forRoot(),
    NgbCollapseModule.forRoot(),
    NgbModalModule.forRoot(),
    NgbTooltipModule.forRoot()
  ],
  exports: [
    NgbAlertModule,
    NgbCollapseModule,
    NgbTooltipModule
  ],
  declarations: []
})
export class NgBootstrapModule {
}
