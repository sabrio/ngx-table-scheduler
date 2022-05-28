import {
  Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef,
  SimpleChanges,
  ContentChild,
  TemplateRef
} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';

interface Row {
  resource: any;
  items: Cell[] | any;
}

interface Cell {
  type: 'item' | 'resource';
  resource?: any[]
  header?: any;
  items?: any[];
  text?: string;
}

@Component({
  selector: 'app-calendar-scheduler',
  templateUrl: './calendar-scheduler.component.html',
  styleUrls: ['./calendar-scheduler.component.scss']
})
export class CalendarSchedulerComponent implements OnInit {
  @Input() startOfCalendar: any;
  @Input() endOfCalendar: any;
  @Input() currentDate: any;
  @Input() unassignedItems: any;
  @Input() defaultValue: any;
  @Input() currentHours: any;
  @Input() resources: any[] = [];
  @Input() resourceFields: any[] = [];
  @Input() items: any[] = [];
  @Input() showSearchFilter: boolean = false;
  @Input() itemWidth: any;
  @Input() itemHeight: any

  @ViewChild('table', {read: ElementRef}) public table: ElementRef<any> | any;

  @Input() set filter(filter: string) {
    this.searchCtrl.setValue(filter);
    if (this.tableRows) {
      this.filterResources(filter);
      this.generateTable();
    }
  }

  @ContentChild("itemTemplate", {static: false}) itemTemplateRef: TemplateRef<any> | any;
  @ContentChild("itemContentTemplate", {static: false}) itemContentTemplateRef: TemplateRef<any> | any;

  @Output() itemAssigned: EventEmitter<any> = new EventEmitter();
  @Output() itemDeleted: EventEmitter<any> = new EventEmitter()

  itemLeft = 0;
  tableRows: Row[] = [];
  itemHeaders: any[] = [];

  filteredResources: any = [];
  searchCtrl = new FormControl();

  selectedItem: any = null;
  resourceWidth: any;
  @Input() noAvailableSlots: any;


  constructor() {
  }

  ngOnDestroy() {
  }

  ngOnInit(): void {
    this.handleFormSearch();
    this.filteredResources = this.resources
    this.generateTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    let shouldGenerate = false;
    if (changes['startOfCalendar'] && !(this.startOfCalendar instanceof moment)) {
      this.startOfCalendar = moment(this.startOfCalendar);
    }
    if (changes['endOfCalendar'] && !(this.endOfCalendar instanceof moment)) {
      this.endOfCalendar = moment(this.endOfCalendar);
    }
    if (changes['items']) {
      shouldGenerate = true;
    }
    if (changes['resources']) {
      this.filteredResources = this.resources;
      shouldGenerate = true;
    }

    if (shouldGenerate)
      this.generateTable();
  }

  prepareAssignItem(item: any) {
    this.items = this.items.filter(i => !i.temporary);
    this.noAvailableSlots = false;

    if (this.selectedItem?.id === item.id) {
      this.selectedItem = null;
      this.generateTable()
      return;
    }
    this.selectedItem = item;
    for (const resource of this.resources) {
      const resourceItems = this.items.filter(x => x.resource_id === resource.id)
      let qualifies = true;

      for (const resourceItem of resourceItems) {
        if (moment(resourceItem.start_date).isBefore(item.end_date) && moment(resourceItem.end_date).isAfter(item.start_date))
          qualifies = false;
      }

      if (!qualifies)
        continue;
      this.items.push({
        ...item,
        resource_id: resource.id,
        temporary: true,
        color: 'rgb(162 155 178 / 62%)',

      })
    }
    const temporaryItem = this.items.filter(x => x.temporary)

    if (temporaryItem.length === 0) {
      this.noAvailableSlots = true;
    }

    this.generateTable();
    if (this.searchCtrl.value) {
      this.filterResources(this.searchCtrl.value);
    }
    // Scroll to event
    const differenceInPixel = moment(item.start_date).diff(this.startOfCalendar, 'days') * this.itemWidth;
    setTimeout(() => {
      this.table.nativeElement.scrollLeft = differenceInPixel;
    }, 50);
  }

  itemClick(item: any) {
    if (!item.temporary)
      return;
    this.items = this.items.filter(i => !i.temporary);
    this.items.find(i => i.id === item?.id).resource_id = item?.resource_id;
    console.log('i', item)

    this.generateTable();
    this.itemAssigned.emit(item);
  }

  public generateTable() {
    if (this.searchCtrl.value) {
      this.filterResources(this.searchCtrl.value);
    }

    this.tableRows = [];
    for (const resource of this.filteredResources) {
      const cells: Cell[] = [];
      for (const field of this.resourceFields) {
        cells.push(
          {
            type: 'resource',
            resource: resource,
            text: resource[field],
          });
      }
      this.resourceWidth = 100 * this.resourceFields.length;
      this.tableRows.push({resource: resource, items: cells});
    }

    this.itemHeaders = [];

    for (const i = this.startOfCalendar.clone(); i.isBefore(this.endOfCalendar); i.add(1, "day")) {
      this.itemHeaders.push({
        date: i.clone(),
        dayOfWeek: i.day(),
        currentDate: i.date(),
      });
    }

    for (const row of this.tableRows) {
      for (const header of this.itemHeaders) {
        const cell: Cell = {
          type: 'item',
          resource: row.resource,
          header: header,
          items: [],
        };
        row.items.push(cell);
        const items = this.items.filter(x => x.resource_id === row?.resource?.id && (header.date.isSame(x.start_date, 'day') || (header.date.isSame(this.startOfCalendar, 'day') && this.startOfCalendar.isAfter(x.start_date))))
        for (const item of items) {
          const duration = moment.duration(item.end_date.diff(item.start_date));
          const hours = duration.asHours();

          let addPixels = 0;
          if (moment(item.end_date).isAfter(this.endOfCalendar)) {
            const offsetDuration = moment.duration(this.endOfCalendar.diff(item.end_date));
            const offsetHours = offsetDuration.asHours();
            addPixels = offsetHours / 24 * this.itemWidth;
          }

          let substract = 0;
          if (this.startOfCalendar.isAfter(item.start_date)) {
            const inHours = moment.duration(this.startOfCalendar.diff(item.start_date))
            const diffHours = inHours.asHours();
            substract = diffHours / 24 * this.itemWidth;
          }

          // @ts-ignore
          cell.items.push({
            ...item,
            _width: ((hours / 24) * this.itemWidth) + addPixels - substract,
            _left: substract ? this.itemLeft : this.itemWidth / 24 * moment(item.start_date).get("hours"),
          })
        }
      }
    }
    this.unassignedItems = this.items.filter(x => x.resource_id == null).filter(x => x.text === "HOLD")
  }

  private handleFormSearch() {
    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(125),
        distinctUntilChanged(),
      )
      .subscribe(value => {
        this.filterResources(value)
        this.generateTable();
      });
  }

  // @ts-ignore
  private filterResources(value: any) {
    if (value === null) {
      return true;
    }
    this.filteredResources = this.resources.filter(resource => {
      const {Category, Code, id, Number} = resource
      const resourceInformation = (Category + Code + id + Number).toLowerCase();
      return resourceInformation.includes(value?.toLowerCase());
    });
  }
}
