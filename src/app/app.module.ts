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
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
