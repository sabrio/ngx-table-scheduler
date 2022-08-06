import { OnInit, EventEmitter, ElementRef, SimpleChanges, TemplateRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as i0 from "@angular/core";
interface Row {
    resource: any;
    items: Cell[] | any;
}
interface Cell {
    type: 'item' | 'resource';
    resource?: any[];
    header?: any;
    items?: any[];
    text?: string;
}
export declare class NgxTableSchedulerComponent implements OnInit {
    startOfCalendar: any;
    endOfCalendar: any;
    currentDate: any;
    unassignedItems: any;
    defaultValue: any;
    currentHours: any;
    resources: any[];
    resourceFields: any[];
    items: any[];
    showSearchFilter: boolean;
    itemWidth: any;
    itemHeight: any;
    table: ElementRef<any> | any;
    set filter(filter: string);
    itemTemplateRef: TemplateRef<any> | any;
    itemContentTemplateRef: TemplateRef<any> | any;
    itemAssigned: EventEmitter<any>;
    itemDeleted: EventEmitter<any>;
    itemLeft: number;
    tableRows: Row[];
    itemHeaders: any[];
    filteredResources: any;
    searchCtrl: FormControl;
    selectedItem: any;
    resourceWidth: any;
    noAvailableSlots: any;
    constructor();
    ngOnDestroy(): void;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    prepareAssignItem(item: any): void;
    itemClick(item: any): void;
    generateTable(): void;
    private handleFormSearch;
    private filterResources;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxTableSchedulerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxTableSchedulerComponent, "ngx-table-scheduler", never, { "startOfCalendar": "startOfCalendar"; "endOfCalendar": "endOfCalendar"; "currentDate": "currentDate"; "unassignedItems": "unassignedItems"; "defaultValue": "defaultValue"; "currentHours": "currentHours"; "resources": "resources"; "resourceFields": "resourceFields"; "items": "items"; "showSearchFilter": "showSearchFilter"; "itemWidth": "itemWidth"; "itemHeight": "itemHeight"; "filter": "filter"; "noAvailableSlots": "noAvailableSlots"; }, { "itemAssigned": "itemAssigned"; "itemDeleted": "itemDeleted"; }, ["itemTemplateRef", "itemContentTemplateRef"], never>;
}
export {};
