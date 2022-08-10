import {Component, OnInit, ViewChild, Injectable} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {FormControl} from "@angular/forms";
import {NgxTableSchedulerComponent} from 'ngx-table-scheduler'


@Component({
  selector: 'app-car-availability',
  templateUrl: './car-availability.component.html',
  styleUrls: ['./car-availability.component.scss']
})
@Injectable()

export class CarAvailabilityComponent implements OnInit {

  @ViewChild(NgxTableSchedulerComponent) fleetManagement: NgxTableSchedulerComponent | any;

  items: any[] = [];
  cars: any[] = []
  itemWidth = 120;
  itemHeight = 160;
  currentDate = moment().toDate();
  startOfCalendar: any;
  endOfCalendar: any;

  filteredAttributes: any = ['available', 'sold', 'total_cars', 'check_ins', 'check_outs']
  filteredCars: any = []
  selectedFilteredCars = ["Citroen", "DACIA", "VW", "Opel"];
  selectItem = null;
  resourceFields = ["Category", "CarType"];
  searchCtrl = new FormControl();
  showCodeContent: any;


  constructor() {
  }

  ngOnInit(): void {
    this.showTsCode()
    this.startOfCalendar = moment('2021-10-10').subtract(4, 'days').startOf('day')
    this.endOfCalendar = moment('2021-11-10').add(5, 'days').startOf('day')
    this.cars = [
      {
        CarType: "C1",
        Category: "Citroen",
        Code: "C121",
        Number: "CTR1",
        id: "1"
      }, {
        CarType: "Dacia",
        Category: "DACIA",
        Code: "Dac1",
        Number: "CTR1",
        id: "2"
      },
      {
        CarType: "Passat",
        Category: "VW",
        Code: "P1",
        Number: "CTR1",
        id: "3"
      },
      {
        CarType: "Astra",
        Category: "Opel",
        Code: " A1",
        Number: "CTR1",
        id: "3"
      }]
    this.items = [{
      id: '1',
      start_date: moment('2021-10-10'),
      end_date: moment('2021-10-10'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '2',
      start_date: moment('2021-10-12'),
      end_date: moment('2021-10-12'),
      resource_id: '2',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-13'),
      end_date: moment('2021-10-13'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1123',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '3',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1231111',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '2',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '122222',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '2',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '111111',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '3',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-15'),
      end_date: moment('2021-10-15'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-18'),
      end_date: moment('2021-10-18'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-19'),
      end_date: moment('2021-10-19'),
      resource_id: '4',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-06'),
      end_date: moment('2021-10-06'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-06'),
      end_date: moment('2021-10-06'),
      resource_id: '2',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-06'),
      end_date: moment('2021-10-06'),
      resource_id: '3',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }]

    this.cars.sort((a, b) => a['Category'].localeCompare(b['Category']));
    this.filteredCars = [...this.cars];
  }

  filterSelectedCar(event: any) {
    this.filteredCars = this.cars.filter(car => !event.length || event.includes(car.Category));
  }

  showTsCode() {
    this.showCodeContent = `import {Component, OnInit, ViewChild, Injectable} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {FormControl} from "@angular/forms";
import {NgxTableSchedulerComponent} from 'ngx-table-scheduler'


@Component({
  selector: 'app-car-availability',
  templateUrl: './car-availability.component.html',
  styleUrls: ['./car-availability.component.scss']
})
@Injectable()

export class CarAvailabilityComponent implements OnInit {

  @ViewChild(NgxTableSchedulerComponent) fleetManagement: NgxTableSchedulerComponent | any;

  items: any[] = [];
  cars: any[] = []
  itemWidth = 120;
  itemHeight = 160;
  currentDate = moment().toDate();
  startOfCalendar: any;
  endOfCalendar: any;

  filteredAttributes: any = ['available', 'sold', 'total_cars', 'check_ins', 'check_outs']
  filteredCars: any = []
  selectedFilteredCars = ["Citroen", "DACIA", "VW", "Opel"];
  selectItem = null;
  resourceFields = ["Category", "CarType"];
  searchCtrl = new FormControl();
  showCodeContent: any;


  constructor() {
  }

  ngOnInit(): void {
    this.showTsCode()
    this.startOfCalendar = moment('2021-10-10').subtract(4, 'days').startOf('day')
    this.endOfCalendar = moment('2021-11-10').add(5, 'days').startOf('day')
    this.cars = [
      {
        CarType: "C1",
        Category: "Citroen",
        Code: "C121",
        Number: "CTR1",
        id: "1"
      }, {
        CarType: "Dacia",
        Category: "DACIA",
        Code: "Dac1",
        Number: "CTR1",
        id: "2"
      },
      {
        CarType: "Passat",
        Category: "VW",
        Code: "P1",
        Number: "CTR1",
        id: "3"
      },
      {
        CarType: "Astra",
        Category: "Opel",
        Code: " A1",
        Number: "CTR1",
        id: "3"
      }]
    this.items = [{
      id: '1',
      start_date: moment('2021-10-10'),
      end_date: moment('2021-10-10'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '2',
      start_date: moment('2021-10-12'),
      end_date: moment('2021-10-12'),
      resource_id: '2',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-13'),
      end_date: moment('2021-10-13'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1123',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '3',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1231111',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '2',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '122222',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '2',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '111111',
      start_date: moment('2021-10-14'),
      end_date: moment('2021-10-14'),
      resource_id: '3',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-15'),
      end_date: moment('2021-10-15'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-18'),
      end_date: moment('2021-10-18'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-19'),
      end_date: moment('2021-10-19'),
      resource_id: '4',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-06'),
      end_date: moment('2021-10-06'),
      resource_id: '1',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-06'),
      end_date: moment('2021-10-06'),
      resource_id: '2',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }, {
      id: '1',
      start_date: moment('2021-10-06'),
      end_date: moment('2021-10-06'),
      resource_id: '3',
      available: '5',
      check_ins: '3',
      check_outs: '2',
      total: '1',
      sold: '4',
    }]

    this.cars.sort((a, b) => a['Category'].localeCompare(b['Category']));
    this.filteredCars = [...this.cars];
  }

  filterSelectedCar(event: any) {
    this.filteredCars = this.cars.filter(car => !event.length || event.includes(car.Category));
  }}`
  }

}
