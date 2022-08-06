import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CarCalendarComponent} from './calendar-scheduler/calendar-scheduler/car-calendar/car-calendar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  CarAvailabilityComponent
} from './calendar-scheduler/calendar-scheduler/car-calendar/car-availability/car-availability.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {
  CalendarDisplayComponent
} from './calendar-scheduler/calendar-scheduler/car-calendar/calendar-display/calendar-display.component';
import {DocumentationComponent} from './calendar-scheduler/documentation/documentation.component';
import {NgxTableSchedulerModule} from "../../projects/ngx-calendar-scheduler/src/lib/ngx-table-scheduler.module";
import {MomentModule} from 'ngx-moment';

@NgModule({
  declarations: [
    AppComponent,
    CarCalendarComponent,
    CarAvailabilityComponent,
    CalendarDisplayComponent,
    DocumentationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MomentModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    NgxTableSchedulerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
