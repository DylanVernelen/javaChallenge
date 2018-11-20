import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChallengesComponent } from './challenges.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  imports: [
    CommonModule, NgbDropdownModule,FormsModule, ReactiveFormsModule

  ],
  declarations: [ChallengesComponent]
})
export class ChallengesModule { }
