import { NgModule } from '@angular/core';
import { NgxTableSchedulerComponent } from './ngx-table-scheduler.component';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    NgxTableSchedulerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NgxTableSchedulerComponent
  ]
})
export class NgxTableSchedulerModule { }
