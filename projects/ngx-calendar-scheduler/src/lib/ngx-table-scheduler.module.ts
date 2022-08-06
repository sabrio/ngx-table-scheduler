import { NgModule } from '@angular/core';
import { NgxTableSchedulerComponent } from './ngx-table-scheduler.component';
import {MomentModule} from "ngx-moment";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    NgxTableSchedulerComponent
  ],
  imports: [
    MomentModule,
    CommonModule,
  ],
  exports: [
    NgxTableSchedulerComponent
  ]
})
export class NgxTableSchedulerModule { }
