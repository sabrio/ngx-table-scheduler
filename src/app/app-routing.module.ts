import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarCalendarComponent} from "./calendar-scheduler/calendar-scheduler/car-calendar/car-calendar.component";
import {
  CarAvailabilityComponent
} from "./calendar-scheduler/calendar-scheduler/car-calendar/car-availability/car-availability.component";
import {
  CalendarDisplayComponent
} from "./calendar-scheduler/calendar-scheduler/car-calendar/calendar-display/calendar-display.component";
import {DocumentationComponent} from "./calendar-scheduler/documentation/documentation.component";

const routes: Routes = [
  {path: 'car-calendar-scheduler', component: CarCalendarComponent},
  {path: '', redirectTo: '/documentation', pathMatch: 'full'},
  {path: 'documentation', component: DocumentationComponent},
  {path: 'car-calendar-display', component: CalendarDisplayComponent},
  {path: 'car-availability', component: CarAvailabilityComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
