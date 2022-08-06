import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTableSchedulerComponent } from './ngx-table-scheduler.component';

describe('NgxTableSchedulerComponent', () => {
  let component: NgxTableSchedulerComponent;
  let fixture: ComponentFixture<NgxTableSchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTableSchedulerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTableSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
