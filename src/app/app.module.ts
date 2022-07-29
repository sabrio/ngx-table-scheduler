import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CalendarSchedulerComponent} from './calendar-scheduler/calendar-scheduler/calendar-scheduler.component';
import {CarCalendarComponent} from './calendar-scheduler/calendar-scheduler/car-calendar/car-calendar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CarAvailabilityComponent } from './calendar-scheduler/calendar-scheduler/car-calendar/car-availability/car-availability.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarDisplayComponent } from './calendar-scheduler/calendar-scheduler/car-calendar/calendar-display/calendar-display.component';
import { DocumentationComponent } from './calendar-scheduler/documentation/documentation.component';
// import {NgxTableSchedulerModule} from "../../projects/ngx-table-scheduler/src/lib/ngx-table-scheduler.module";
import {CommonModule} from "@angular/common";
import {NgxTableSchedulerModule} from "NgxTableScheduler";

@NgModule({
  declarations: [
    AppComponent,
    CalendarSchedulerComponent,
    CarCalendarComponent,
    CarAvailabilityComponent,
    CalendarDisplayComponent,
    DocumentationComponent,
  ],
  imports: [
    BrowserModule,

    CommonModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxTableSchedulerModule,
    // NgxTableSchedulerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
