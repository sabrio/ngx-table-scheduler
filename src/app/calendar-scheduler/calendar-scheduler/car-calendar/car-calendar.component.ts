import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import 'moment/locale/pt-br';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import {NgxTableSchedulerComponent} from 'ngx-table-scheduler'
@Component({
  selector: 'app-car-calendar',
  templateUrl: './car-calendar.component.html',
  styleUrls: ['./car-calendar.component.scss']
})

export class CarCalendarComponent implements OnInit {
  searchCtrl = new FormControl();
  currentDate = moment().toDate();
  startOfCalendar: any;
  endOfCalendar: any
  daysOfMonth: any[] = [];
  currentHours = this.currentDate.getHours() + ":" + this.currentDate.getMinutes()
  extraCheckOutHours: any;
  cellWidth = 70
  item: any;
  cars: any[] = []
  items: any[] = []
  noAvailableSlots: any
  unassignedItems: any[] = []
  supplierId: any;
  selectItem: any = null;
  resourceFields = ["Category", "Code", "Number"];
  codeToShow: any;

  @ViewChild(NgxTableSchedulerComponent) fleetManagement: NgxTableSchedulerComponent | any;

  _destroyed$ = new Subject<void>();
  destroyed$: Observable<void> = this._destroyed$.asObservable();

  constructor(private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.items = [{
      id: '11241244',
      start_date: moment('2021-10-07'),
      end_date: moment('2021-10-09'),
      resource_id: '1',
      color: "#2F4F4F",
      text: 'HOLD',
      tooltip: "Assigned",
      confirmation_no: '11111',
    },
      {
        id: '2333123',
        start_date: moment('2021-10-16'),
        end_date: moment('2021-10-19'),
        resource_id: '2',
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }
      , {
        id: '31122',
        start_date: moment('2021-10-07'),
        end_date: moment('2021-10-11'),
        resource_id: '4',
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      },
      {
        id: '4123123',
        start_date: moment('2021-10-26'),
        end_date: moment('2021-10-29'),
        resource_id: '5',
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      },
      {
        id: '6124124',
        start_date: moment('2021-10-20'),
        end_date: moment('2021-10-29'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      },
      {
        id: '71111',
        start_date: moment('2021-10-16'),
        end_date: moment('2021-10-19'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }, {
        id: '1242148',
        start_date: moment('2021-10-26'),
        end_date: moment('2021-10-29'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }, {
        id: '9124142',
        start_date: moment('2021-10-12'),
        end_date: moment('2021-10-14'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }, {
        id: '1123130',
        start_date: moment('2021-10-15'),
        end_date: moment('2021-10-19'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }
    ]
    this.cars = [
      {
        Category: 'Opel Vivaro',
        Code: 'OP777',
        Number: 'OPEL 001',
        id: '1'
      },
      {
        Category: 'Mercedes',
        Code: 'M111',
        Number: 'Mercedes 002',
        id: '2'
      },
      {
        Category: 'Citroen',
        Code: 'C876',
        Number: 'Citroen 003',
        id: '3'
      },
      {
        Category: 'Golf',
        Code: 'G745',
        Number: 'Golf 004',
        id: '4'
      },
      {
        Category: 'Audi',
        Code: 'A999',
        Number: 'Audi 005',
        id: '5'
      }]
    this.items = this.items.filter(x => x.text === "HOLD")
    this.cars.sort((a, b) => a['Category'].localeCompare(b['Category']));
    this.startOfCalendar = moment('2021-10-10').subtract(4, 'days').startOf('day')
    this.endOfCalendar = moment('2021-11-10').add(5, 'days').startOf('day')
    this.unassignedItems = this.items.filter(x => x.resource_id == null).filter(x => x.text === "HOLD")
    this.showCodeContent()
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  carReservationSelected(event: any) {
    this.selectItem = null;
    this.unassignedItems = this.unassignedItems.filter(item => item.id !== event.id);
  }

  carReservationDeleted(event: any) {
    this.items.find(x => event.id === x.id).resource_id = null;
    this.fleetManagement?.generateTable();
    this.unassignedItems.push(event);
  }


  assigningItem(item: any) {
    if (this.selectItem?.id == item.id) {
      this.selectItem = null
    } else {
      this.selectItem = item;
    }
    this.fleetManagement.prepareAssignItem(item)
  }

  a: any;

  showCodeContent() {
    this.codeToShow = `import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import 'moment/locale/pt-br';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {CalendarSchedulerComponent} from "../calendar-scheduler.component";
import * as moment from 'moment';

@Component({
  selector: 'app-car-calendar',
  templateUrl: './car-calendar.component.html',
  styleUrls: ['./car-calendar.component.scss']
})

export class CarCalendarComponent implements OnInit {
  searchCtrl = new FormControl();
  currentDate = moment().toDate();
  startOfCalendar: any;
  endOfCalendar: any
  daysOfMonth: any[] = [];
  currentHours = this.currentDate.getHours() + ":" + this.currentDate.getMinutes()
  extraCheckOutHours: any;
  cellWidth = 70
  cars: any[] = []
  items: any[] = []
  noAvailableSlots: any
  unassignedItems: any[] = []
  supplierId: any;
  selectItem: any = null;
  resourceFields = ["Category", "Code", "Number"];

  @ViewChild(CalendarSchedulerComponent) fleetManagement: CalendarSchedulerComponent | any;

  _destroyed$ = new Subject<void>();
  destroyed$: Observable<void> = this._destroyed$.asObservable();

  constructor(private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.items = [{
      id: '11241244',
      start_date: moment('2021-10-07'),
      end_date: moment('2021-10-09'),
      resource_id: '1',
      color: "#2F4F4F",
      text: 'HOLD',
      tooltip: "Assigned",
      confirmation_no: '11111',
    },
      {
        id: '2333123',
        start_date: moment('2021-10-16'),
        end_date: moment('2021-10-19'),
        resource_id: '2',
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }
      , {
        id: '31122',
        start_date: moment('2021-10-07'),
        end_date: moment('2021-10-11'),
        resource_id: '4',
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      },
      {
        id: '4123123',
        start_date: moment('2021-10-26'),
        end_date: moment('2021-10-29'),
        resource_id: '5',
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      },
      {
        id: '6124124',
        start_date: moment('2021-10-20'),
        end_date: moment('2021-10-29'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      },
      {
        id: '71111',
        start_date: moment('2021-10-16'),
        end_date: moment('2021-10-19'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }, {
        id: '1242148',
        start_date: moment('2021-10-26'),
        end_date: moment('2021-10-29'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }, {
        id: '9124142',
        start_date: moment('2021-10-12'),
        end_date: moment('2021-10-14'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }, {
        id: '1123130',
        start_date: moment('2021-10-15'),
        end_date: moment('2021-10-19'),
        color: "#2F4F4F",
        text: 'HOLD',
        tooltip: "Assigned",
        confirmation_no: '11111',
      }
    ]
    this.cars = [
      {
        Category: 'Opel Vivaro',
        Code: 'OP777',
        Number: 'OPEL 001',
        id: '1'
      },
      {
        Category: 'Mercedes',
        Code: 'M111',
        Number: 'Mercedes 002',
        id: '2'
      },
      {
        Category: 'Citroen',
        Code: 'C876',
        Number: 'Citroen 003',
        id: '3'
      },
      {
        Category: 'Golf',
        Code: 'G745',
        Number: 'Golf 004',
        id: '4'
      },
      {
        Category: 'Audi',
        Code: 'A999',
        Number: 'Audi 005',
        id: '5'
      }]
    this.items = this.items.filter(x => x.text === "HOLD")
    this.cars.sort((a, b) => a['Category'].localeCompare(b['Category']));
    this.startOfCalendar = moment('2021-10-10').subtract(4, 'days').startOf('day')
    this.endOfCalendar = moment('2021-11-10').add(5, 'days').startOf('day')
    this.unassignedItems = this.items.filter(x => x.resource_id == null).filter(x => x.text === "HOLD")
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  carReservationSelected(event: any) {
    this.selectItem = null;
    this.unassignedItems = this.unassignedItems.filter(item => item.id !== event.id);
  }

  carReservationDeleted(event: any) {
    this.items.find(x => event.id === x.id).resource_id = null;
    this.fleetManagement.generateTable();
    this.unassignedItems.push(event);
  }


  assigningItem(item: any) {
    if (this.selectItem?.id == item.id) {
      this.selectItem = null
    } else {
      this.selectItem = item;
    }
    this.fleetManagement.prepareAssignItem(item)
  }

}
`
    this.a = `<div class="float-container pl-20">
  <div class="search-input">
        <span>
        <input class="input-search" type="text" [formControl]="searchCtrl"
               aria-label="Sizing example input"
               aria-describedby="inputGroup-sizing-default" placeholder="Search"/>
        </span>
  </div>
  <div class="d-inline-flex unassigned-item ml-2">
    <ul class="list-style ">
      <li *ngFor="let item of unassignedItems; let i = index"
          class="size-item-list cursor-pointer" (click)="assigningItem(item)"
          [ngClass]="{'selected': selectItem?.id === item.id}">
        <p class="m-0 p-0">Confirmation No#:</p>
        <p class="text-muted">{{item.confirmation_no}}</p>
        {{item.start_date | date}}
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z"/>
        </svg>
        {{item.end_date | date}}
        {{this.noAvailableSlots ? 'No available slots for this reservation' : null}}
      </li>
    </ul>
  </div>
</div>

 <div class="container-fluid">
  <div class="row">
    <div class="col-12 mt-4">
      <app-calendar-scheduler
        [resources]="cars"
        [resourceFields]="resourceFields"
        [currentDate]="currentDate"
        [items]="items"
        [startOfCalendar]="startOfCalendar"
        [endOfCalendar]="endOfCalendar"
        [itemWidth]="cellWidth"
        [noAvailableSlots]="noAvailableSlots"
        [showSearchFilter]="true"
        [filter]="searchCtrl.value"
        (itemAssigned)="carReservationSelected($event)"
        (itemDeleted)="carReservationDeleted($event)"
      >
        <ng-template #itemContentTemplate let-item let-selectedItem let-row>
          <div *ngIf="item.temporary" class="check icon"></div>
          <label
            class="item-style">{{item?.id == selectedItem?.id && row.resource?.id == selectedItem?.resource_id ? '' : item?.text }}</label>
          <svg (click)="carReservationDeleted(item)" *ngIf="!item.temporary" class="delete-icon mr-2"
               viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"/>
          </svg>
          <span class="extra-hours" [ngStyle]="{'width.px':extraCheckOutHours}"></span>
        </ng-template>
      </app-calendar-scheduler>
    </div>
  </div>
</div>`
  }


}
