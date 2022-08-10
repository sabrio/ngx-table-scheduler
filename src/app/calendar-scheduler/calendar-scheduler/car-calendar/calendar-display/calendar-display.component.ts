import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import 'moment/locale/pt-br';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import {NgxTableSchedulerComponent} from 'ngx-table-scheduler'

@Component({
  selector: 'app-calendar-display',
  templateUrl: './calendar-display.component.html',
  styleUrls: ['./calendar-display.component.scss']
})
export class CalendarDisplayComponent implements OnInit {
  codeToShow: any;
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

  @ViewChild(NgxTableSchedulerComponent) fleetManagement: NgxTableSchedulerComponent | any;

  _destroyed$ = new Subject<void>();
  destroyed$: Observable<void> = this._destroyed$.asObservable();

  constructor(private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cars = [{
      Category: 'Opel Vivaro',
      Code: 'OP777',
      Number: 'OPEL 001',
      id: '1'
    }, {
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
    this.showTsCode();
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  showTsCode() {
    this.codeToShow = `import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import 'moment/locale/pt-br';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import * as moment from 'moment';
import {NgxTableScheduler} from "ngx-table-scheduler"


@Component({
  selector: 'app-calendar-display',
  templateUrl: './calendar-display.component.html',
  styleUrls: ['./calendar-display.component.scss']
})
export class CalendarDisplayComponent implements OnInit {
  code = \`\`
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

  @ViewChild(NgxTableScheduler) fleetManagement: NgxTableScheduler | any;

  _destroyed$ = new Subject<void>();
  destroyed$: Observable<void> = this._destroyed$.asObservable();

  constructor(private _router: Router,
              private _route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.cars = [{
      Category: 'Opel Vivaro',
      Code: 'OP777',
      Number: 'OPEL 001',
      id: '1'
    },{
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
}
`
  }
}
