import { TestBed } from '@angular/core/testing';

import { NgxTableSchedulerService } from './ngx-table-scheduler.service';

describe('NgxTableSchedulerService', () => {
  let service: NgxTableSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTableSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
