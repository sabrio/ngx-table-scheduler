import * as i0 from '@angular/core';
import { Injectable, EventEmitter, ElementRef, Component, Input, ViewChild, ContentChild, Output, NgModule } from '@angular/core';
import * as moment from 'moment';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from 'ngx-moment';
import { MomentModule } from 'ngx-moment';

class NgxTableSchedulerService {
    constructor() { }
}
NgxTableSchedulerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxTableSchedulerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
NgxTableSchedulerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxTableSchedulerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxTableSchedulerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }], ctorParameters: function () { return []; } });

class NgxTableSchedulerComponent {
    constructor() {
        this.resources = [];
        this.resourceFields = [];
        this.items = [];
        this.showSearchFilter = false;
        this.itemAssigned = new EventEmitter();
        this.itemDeleted = new EventEmitter();
        this.itemLeft = 0;
        this.tableRows = [];
        this.itemHeaders = [];
        this.filteredResources = [];
        this.searchCtrl = new FormControl();
        this.selectedItem = null;
    }
    set filter(filter) {
        this.searchCtrl.setValue(filter);
        if (this.tableRows) {
            this.filterResources(filter);
            this.generateTable();
        }
    }
    ngOnDestroy() {
    }
    ngOnInit() {
        this.handleFormSearch();
        this.filteredResources = this.resources;
        this.generateTable();
    }
    ngOnChanges(changes) {
        console.log(moment().toISOString());
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
    prepareAssignItem(item) {
        var _a;
        this.items = this.items.filter(i => !i.temporary);
        this.noAvailableSlots = false;
        if (((_a = this.selectedItem) === null || _a === void 0 ? void 0 : _a.id) === item.id) {
            this.selectedItem = null;
            this.generateTable();
            return;
        }
        this.selectedItem = item;
        for (const resource of this.resources) {
            const resourceItems = this.items.filter(x => x.resource_id === resource.id);
            let qualifies = true;
            for (const resourceItem of resourceItems) {
                if (moment(resourceItem.start_date).isBefore(item.end_date) && moment(resourceItem.end_date).isAfter(item.start_date))
                    qualifies = false;
            }
            if (!qualifies)
                continue;
            this.items.push(Object.assign(Object.assign({}, item), { resource_id: resource.id, temporary: true, color: 'rgb(162 155 178 / 62%)' }));
        }
        const temporaryItem = this.items.filter(x => x.temporary);
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
    itemClick(item) {
        if (!item.temporary)
            return;
        this.items = this.items.filter(i => !i.temporary);
        this.items.find(i => i.id === (item === null || item === void 0 ? void 0 : item.id)).resource_id = item === null || item === void 0 ? void 0 : item.resource_id;
        console.log('i', item);
        this.generateTable();
        this.itemAssigned.emit(item);
    }
    generateTable() {
        if (this.searchCtrl.value) {
            this.filterResources(this.searchCtrl.value);
        }
        this.tableRows = [];
        for (const resource of this.filteredResources) {
            const cells = [];
            for (const field of this.resourceFields) {
                cells.push({
                    type: 'resource',
                    resource: resource,
                    text: resource[field],
                });
            }
            this.resourceWidth = 100 * this.resourceFields.length;
            this.tableRows.push({ resource: resource, items: cells });
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
                const cell = {
                    type: 'item',
                    resource: row.resource,
                    header: header,
                    items: [],
                };
                row.items.push(cell);
                const items = this.items.filter(x => { var _a; return x.resource_id === ((_a = row === null || row === void 0 ? void 0 : row.resource) === null || _a === void 0 ? void 0 : _a.id) && (header.date.isSame(x.start_date, 'day') || (header.date.isSame(this.startOfCalendar, 'day') && this.startOfCalendar.isAfter(x.start_date))); });
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
                        const inHours = moment.duration(this.startOfCalendar.diff(item.start_date));
                        const diffHours = inHours.asHours();
                        substract = diffHours / 24 * this.itemWidth;
                    }
                    // @ts-ignore
                    cell.items.push(Object.assign(Object.assign({}, item), { _width: ((hours / 24) * this.itemWidth) + addPixels - substract, _left: substract ? this.itemLeft : this.itemWidth / 24 * moment(item.start_date).get("hours") }));
                }
            }
        }
        this.unassignedItems = this.items.filter(x => x.resource_id == null).filter(x => x.text === "HOLD");
    }
    handleFormSearch() {
        this.searchCtrl.valueChanges
            .pipe(debounceTime(125), distinctUntilChanged())
            .subscribe(value => {
            this.filterResources(value);
            this.generateTable();
        });
    }
    // @ts-ignore
    filterResources(value) {
        if (value === null) {
            return true;
        }
        this.filteredResources = this.resources.filter(resource => {
            const { Category, Code, id, Number } = resource;
            const resourceInformation = (Category + Code + id + Number).toLowerCase();
            return resourceInformation.includes(value === null || value === void 0 ? void 0 : value.toLowerCase());
        });
    }
}
NgxTableSchedulerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxTableSchedulerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgxTableSchedulerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: NgxTableSchedulerComponent, selector: "ngx-table-scheduler", inputs: { startOfCalendar: "startOfCalendar", endOfCalendar: "endOfCalendar", currentDate: "currentDate", unassignedItems: "unassignedItems", defaultValue: "defaultValue", currentHours: "currentHours", resources: "resources", resourceFields: "resourceFields", items: "items", showSearchFilter: "showSearchFilter", itemWidth: "itemWidth", itemHeight: "itemHeight", filter: "filter", noAvailableSlots: "noAvailableSlots" }, outputs: { itemAssigned: "itemAssigned", itemDeleted: "itemDeleted" }, queries: [{ propertyName: "itemTemplateRef", first: true, predicate: ["itemTemplate"], descendants: true }, { propertyName: "itemContentTemplateRef", first: true, predicate: ["itemContentTemplate"], descendants: true }], viewQueries: [{ propertyName: "table", first: true, predicate: ["table"], descendants: true, read: ElementRef }], usesOnChanges: true, ngImport: i0, template: "<div class=\"table-outer\">\n  <div class=\"table-inner\" #table [ngStyle]=\"{'margin-left.px':resourceWidth}\">\n    <table>\n      <tr>\n        <th *ngFor=\"let field of resourceFields\" class=\"resource-header\">{{field}}</th>\n        <th *ngFor=\"let date of itemHeaders\" class=\"item-header\" [style.width.px]=\"itemWidth\"\n            [class.currentDay]=\"date.currentDate == currentDate.getDate()\"\n            [class.weekend]=\"date.dayOfWeek==0 || date.dayOfWeek==6\">\n          {{ date.date   | amDateFormat : ' MMM  d '}}\n        </th>\n      </tr>\n\n      <tr *ngFor=\"let row of tableRows\">\n        <td *ngFor=\"let cell of row.items\"\n            [class.resource-cell]=\"cell.type == 'resource'\"\n            [class.item-cell]=\"cell.type == 'item'\"\n            [class.weekend]=\"cell?.header?.dayOfWeek == 0 || cell?.header?.dayOfWeek == 6\"\n            [class.currentDay]=\"cell?.header?.currentDate == currentDate.getDate()\"\n            [style.width.px]=\"cell.type == 'item' && itemWidth \"\n            [style.height.px]=\"(cell.type ==='item' || cell.type === 'resource') && itemHeight\">\n          <span *ngIf=\"!cell.items || cell.items.length == 0\">{{cell.text}}</span>\n          <span>\n                          <ng-template #defaultItemTemplateContent let-item>\n                <div *ngIf=\"item.temporary\" class=\"check icon\"></div>\n                            {{item?.id == selectedItem?.id && row.resource?.id == selectedItem?.resource_id ? '' : item?.text }}\n              </ng-template>\n              <ng-template #defaultItemTemplate let-item let-i>\n                <div class=\"default-item\"\n                     (click)=\"itemClick(item)\"\n                     [class.selected-item]=\"item?.id == selectedItem?.id  && row.resource.id == selectedItem?.resource_id\"\n                     [ngStyle]=\"{ 'left.px': item._left, 'width.px': item._width, 'background-color': item?.color}\">\n                    <ng-container\n                      [ngTemplateOutlet]=\"itemContentTemplateRef || defaultItemTemplateContent\"\n                      [ngTemplateOutletContext]=\"{ $implicit: item, index: i}\">\n                   </ng-container>\n                </div>\n              </ng-template>\n              <ng-container\n                *ngFor=\"let item of cell.items;let i=index\"\n                [ngTemplateOutlet]=\"itemTemplateRef || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: item, index: i}\">\n             </ng-container>\n         </span>\n        </td>\n      </tr>\n    </table>\n  </div>\n  <div class=\"row\">\n    <div class=\"col text-right mr-2\">\n      {{this.startOfCalendar  | amDateFormat}}\n      <svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n        <path fill=\"currentColor\" d=\"M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z\"/>\n      </svg>\n      {{this.endOfCalendar  | amDateFormat }}\n    </div>\n  </div>\n</div>\n\n<div class=\"no-car-exists\" *ngIf=\"filteredResources.length == 0\">\n  {{this.filteredResources.length == 0 ? \"No results found with this car resource\" : \"\"}}\n</div>\n", styles: [".table-outer{position:relative;border:1px solid #ccc}.table-outer .table-inner{overflow-x:scroll;overflow-y:visible;border-left:1px solid #ccc}.table-outer .table-inner table{table-layout:fixed;width:100%;border-collapse:collapse;border-spacing:0;border-radius:20px}.table-outer .table-inner table td,.table-outer .table-inner table th{border-top:unset;vertical-align:top;text-align:center;border-bottom:1px solid #ccc;padding:10px 0;border-left:1px solid #ccc}.table-outer .table-inner table td td:hover,.table-outer .table-inner table th td:hover{background-color:#ff0}.table-outer .table-inner table td:first-child,.table-outer .table-inner table th:first-child{border-left:0px!important}.table-outer .table-inner table .resource-cell,.table-outer .table-inner table .item-cell{height:45px;line-height:25px}.table-outer .table-inner table .resource-header,.table-outer .table-inner table .resource-cell{position:absolute;width:100px}.table-outer .table-inner table .resource-header,.table-outer .table-inner table .resource-cell,.table-outer .table-inner table .item-header{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.table-outer .table-inner table .resource-header:nth-child(1),.table-outer .table-inner table .resource-cell:nth-child(1){left:0}.table-outer .table-inner table .resource-header:nth-child(2),.table-outer .table-inner table .resource-cell:nth-child(2){left:100px}.table-outer .table-inner table .resource-header:nth-child(3),.table-outer .table-inner table .resource-cell:nth-child(3){left:200px}.table-outer .table-inner table .resource-header:nth-child(4),.table-outer .table-inner table .resource-cell:nth-child(4){left:300px}.table-outer .table-inner table .item-cell,.table-outer .table-inner table .item-header{width:50px;position:relative}.table-outer .table-inner table .item-cell .event{position:absolute;left:0;height:20px;z-index:999;top:calc(50% - 10px)}.reserved-resource{width:117px;left:25%;background-color:#00f}.weekend{background-color:#ffe1064a}.currentDay{background-color:#b2fad4}.paragraph-style{color:#fff}.check.icon{color:#fff;position:absolute;margin-left:3px;margin-top:4px;width:14px;height:8px;border-bottom:solid 2px currentColor;border-left:solid 2px currentColor;transform:rotate(-45deg)}.float-container{display:flex;margin-bottom:10px}.flex-container{border-collapse:collapse;width:25%;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;gap:3px}.unassigned-item{flex:3 0;overflow:auto}.size-item-list{background-color:#b0e0e6;transition:background-color .5s;border:1px solid rgba(0,0,0,.125);border-radius:8px;padding:10px;text-overflow:ellipsis;min-width:305px;float:left;font-size:12px;position:relative;display:block}.size-item-list:hover{background-color:#66f115ab}.form-control:focus{border-color:#68efdbcc;box-shadow:0 1px 1px #00000013 inset,0 0 8px #68dbef99;outline:0 none}.input-search{width:50%;box-sizing:border-box;border:2px solid #ccc;border-radius:8px;background-image:url(/assets/img/icons8-search-30.png);background-position:7px 7px;background-repeat:no-repeat;font-size:16px;background-color:#fff;padding:12px 20px 12px 40px;transition:width .5s ease-in-out}.input-search:focus{width:100%;border-color:#59aff6cc;box-shadow:0 1px 1px #00000013 inset,0 0 8px #68efeb99;outline:0 none}.search-icon{width:31px;height:47px}.search-input{flex:1 0}.no-car-exists{background:#c7c5c5;padding:10px;border-radius:10px;text-align:center;margin-top:30px}.list-style{flex-direction:row;gap:7px;display:flex;padding-left:0;margin-bottom:0}.assign-button{color:#fff;background-color:#0069d9;border-color:#0062cc;margin-left:3px;border-radius:5px;box-shadow:0 8px 16px #0003,0 6px 20px #00000030}.delete-icon{width:24px;height:20px;float:right;cursor:pointer}.delete-icon:hover{transition-timing-function:ease-out;transition:.25s;transform:translateY(-5px)}table .item-cell ::ng-deep .default-item{position:absolute;left:0;height:20px;z-index:999;top:calc(50% - 10px)}.text-right{text-align:right}\n"], directives: [{ type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet"] }], pipes: { "amDateFormat": i2.DateFormatPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxTableSchedulerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-table-scheduler', template: "<div class=\"table-outer\">\n  <div class=\"table-inner\" #table [ngStyle]=\"{'margin-left.px':resourceWidth}\">\n    <table>\n      <tr>\n        <th *ngFor=\"let field of resourceFields\" class=\"resource-header\">{{field}}</th>\n        <th *ngFor=\"let date of itemHeaders\" class=\"item-header\" [style.width.px]=\"itemWidth\"\n            [class.currentDay]=\"date.currentDate == currentDate.getDate()\"\n            [class.weekend]=\"date.dayOfWeek==0 || date.dayOfWeek==6\">\n          {{ date.date   | amDateFormat : ' MMM  d '}}\n        </th>\n      </tr>\n\n      <tr *ngFor=\"let row of tableRows\">\n        <td *ngFor=\"let cell of row.items\"\n            [class.resource-cell]=\"cell.type == 'resource'\"\n            [class.item-cell]=\"cell.type == 'item'\"\n            [class.weekend]=\"cell?.header?.dayOfWeek == 0 || cell?.header?.dayOfWeek == 6\"\n            [class.currentDay]=\"cell?.header?.currentDate == currentDate.getDate()\"\n            [style.width.px]=\"cell.type == 'item' && itemWidth \"\n            [style.height.px]=\"(cell.type ==='item' || cell.type === 'resource') && itemHeight\">\n          <span *ngIf=\"!cell.items || cell.items.length == 0\">{{cell.text}}</span>\n          <span>\n                          <ng-template #defaultItemTemplateContent let-item>\n                <div *ngIf=\"item.temporary\" class=\"check icon\"></div>\n                            {{item?.id == selectedItem?.id && row.resource?.id == selectedItem?.resource_id ? '' : item?.text }}\n              </ng-template>\n              <ng-template #defaultItemTemplate let-item let-i>\n                <div class=\"default-item\"\n                     (click)=\"itemClick(item)\"\n                     [class.selected-item]=\"item?.id == selectedItem?.id  && row.resource.id == selectedItem?.resource_id\"\n                     [ngStyle]=\"{ 'left.px': item._left, 'width.px': item._width, 'background-color': item?.color}\">\n                    <ng-container\n                      [ngTemplateOutlet]=\"itemContentTemplateRef || defaultItemTemplateContent\"\n                      [ngTemplateOutletContext]=\"{ $implicit: item, index: i}\">\n                   </ng-container>\n                </div>\n              </ng-template>\n              <ng-container\n                *ngFor=\"let item of cell.items;let i=index\"\n                [ngTemplateOutlet]=\"itemTemplateRef || defaultItemTemplate\"\n                [ngTemplateOutletContext]=\"{ $implicit: item, index: i}\">\n             </ng-container>\n         </span>\n        </td>\n      </tr>\n    </table>\n  </div>\n  <div class=\"row\">\n    <div class=\"col text-right mr-2\">\n      {{this.startOfCalendar  | amDateFormat}}\n      <svg style=\"width:24px;height:24px\" viewBox=\"0 0 24 24\">\n        <path fill=\"currentColor\" d=\"M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z\"/>\n      </svg>\n      {{this.endOfCalendar  | amDateFormat }}\n    </div>\n  </div>\n</div>\n\n<div class=\"no-car-exists\" *ngIf=\"filteredResources.length == 0\">\n  {{this.filteredResources.length == 0 ? \"No results found with this car resource\" : \"\"}}\n</div>\n", styles: [".table-outer{position:relative;border:1px solid #ccc}.table-outer .table-inner{overflow-x:scroll;overflow-y:visible;border-left:1px solid #ccc}.table-outer .table-inner table{table-layout:fixed;width:100%;border-collapse:collapse;border-spacing:0;border-radius:20px}.table-outer .table-inner table td,.table-outer .table-inner table th{border-top:unset;vertical-align:top;text-align:center;border-bottom:1px solid #ccc;padding:10px 0;border-left:1px solid #ccc}.table-outer .table-inner table td td:hover,.table-outer .table-inner table th td:hover{background-color:#ff0}.table-outer .table-inner table td:first-child,.table-outer .table-inner table th:first-child{border-left:0px!important}.table-outer .table-inner table .resource-cell,.table-outer .table-inner table .item-cell{height:45px;line-height:25px}.table-outer .table-inner table .resource-header,.table-outer .table-inner table .resource-cell{position:absolute;width:100px}.table-outer .table-inner table .resource-header,.table-outer .table-inner table .resource-cell,.table-outer .table-inner table .item-header{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.table-outer .table-inner table .resource-header:nth-child(1),.table-outer .table-inner table .resource-cell:nth-child(1){left:0}.table-outer .table-inner table .resource-header:nth-child(2),.table-outer .table-inner table .resource-cell:nth-child(2){left:100px}.table-outer .table-inner table .resource-header:nth-child(3),.table-outer .table-inner table .resource-cell:nth-child(3){left:200px}.table-outer .table-inner table .resource-header:nth-child(4),.table-outer .table-inner table .resource-cell:nth-child(4){left:300px}.table-outer .table-inner table .item-cell,.table-outer .table-inner table .item-header{width:50px;position:relative}.table-outer .table-inner table .item-cell .event{position:absolute;left:0;height:20px;z-index:999;top:calc(50% - 10px)}.reserved-resource{width:117px;left:25%;background-color:#00f}.weekend{background-color:#ffe1064a}.currentDay{background-color:#b2fad4}.paragraph-style{color:#fff}.check.icon{color:#fff;position:absolute;margin-left:3px;margin-top:4px;width:14px;height:8px;border-bottom:solid 2px currentColor;border-left:solid 2px currentColor;transform:rotate(-45deg)}.float-container{display:flex;margin-bottom:10px}.flex-container{border-collapse:collapse;width:25%;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;gap:3px}.unassigned-item{flex:3 0;overflow:auto}.size-item-list{background-color:#b0e0e6;transition:background-color .5s;border:1px solid rgba(0,0,0,.125);border-radius:8px;padding:10px;text-overflow:ellipsis;min-width:305px;float:left;font-size:12px;position:relative;display:block}.size-item-list:hover{background-color:#66f115ab}.form-control:focus{border-color:#68efdbcc;box-shadow:0 1px 1px #00000013 inset,0 0 8px #68dbef99;outline:0 none}.input-search{width:50%;box-sizing:border-box;border:2px solid #ccc;border-radius:8px;background-image:url(/assets/img/icons8-search-30.png);background-position:7px 7px;background-repeat:no-repeat;font-size:16px;background-color:#fff;padding:12px 20px 12px 40px;transition:width .5s ease-in-out}.input-search:focus{width:100%;border-color:#59aff6cc;box-shadow:0 1px 1px #00000013 inset,0 0 8px #68efeb99;outline:0 none}.search-icon{width:31px;height:47px}.search-input{flex:1 0}.no-car-exists{background:#c7c5c5;padding:10px;border-radius:10px;text-align:center;margin-top:30px}.list-style{flex-direction:row;gap:7px;display:flex;padding-left:0;margin-bottom:0}.assign-button{color:#fff;background-color:#0069d9;border-color:#0062cc;margin-left:3px;border-radius:5px;box-shadow:0 8px 16px #0003,0 6px 20px #00000030}.delete-icon{width:24px;height:20px;float:right;cursor:pointer}.delete-icon:hover{transition-timing-function:ease-out;transition:.25s;transform:translateY(-5px)}table .item-cell ::ng-deep .default-item{position:absolute;left:0;height:20px;z-index:999;top:calc(50% - 10px)}.text-right{text-align:right}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { startOfCalendar: [{
                type: Input
            }], endOfCalendar: [{
                type: Input
            }], currentDate: [{
                type: Input
            }], unassignedItems: [{
                type: Input
            }], defaultValue: [{
                type: Input
            }], currentHours: [{
                type: Input
            }], resources: [{
                type: Input
            }], resourceFields: [{
                type: Input
            }], items: [{
                type: Input
            }], showSearchFilter: [{
                type: Input
            }], itemWidth: [{
                type: Input
            }], itemHeight: [{
                type: Input
            }], table: [{
                type: ViewChild,
                args: ['table', { read: ElementRef }]
            }], filter: [{
                type: Input
            }], itemTemplateRef: [{
                type: ContentChild,
                args: ["itemTemplate", { static: false }]
            }], itemContentTemplateRef: [{
                type: ContentChild,
                args: ["itemContentTemplate", { static: false }]
            }], itemAssigned: [{
                type: Output
            }], itemDeleted: [{
                type: Output
            }], noAvailableSlots: [{
                type: Input
            }] } });

class NgxTableSchedulerModule {
}
NgxTableSchedulerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxTableSchedulerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxTableSchedulerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxTableSchedulerModule, declarations: [NgxTableSchedulerComponent], imports: [MomentModule,
        CommonModule], exports: [NgxTableSchedulerComponent] });
NgxTableSchedulerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxTableSchedulerModule, imports: [[
            MomentModule,
            CommonModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: NgxTableSchedulerModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        NgxTableSchedulerComponent
                    ],
                    imports: [
                        MomentModule,
                        CommonModule,
                    ],
                    exports: [
                        NgxTableSchedulerComponent
                    ]
                }]
        }] });

/*
 * Public API Surface of ngx-calendar-scheduler
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxTableSchedulerComponent, NgxTableSchedulerModule, NgxTableSchedulerService };
//# sourceMappingURL=ngx-table-scheduler.mjs.map
