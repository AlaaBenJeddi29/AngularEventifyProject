import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeedbacksComponent } from './feedbacks.component';
import { FormComponent } from './form/form.component';
import { FeedbacksRoutingModule } from './feedbacks-routing.module';
import { CardEventComponent } from "../../layout/card-event/card-event.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule, // ← this line is required for ngModel
    FeedbacksRoutingModule,
    CardEventComponent
],
  declarations: [FeedbacksComponent, FormComponent]
})
export class FeedbacksModule { }