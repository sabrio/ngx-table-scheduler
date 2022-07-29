import { NgModule } from '@angular/core';
import { NgxTableSchedulerComponent } from './ngx-table-scheduler.component';
import {CommonModule} from "./../../node_modules/@angular/common";
import {MomentModule} from "ngx-moment";



@NgModule({
  declarations: [
    NgxTableSchedulerComponent
  ],
  imports: [
    CommonModule,
    MomentModule
  ],
  exports: [
    NgxTableSchedulerComponent
  ]
})
export class NgxTableSchedulerModule { }
