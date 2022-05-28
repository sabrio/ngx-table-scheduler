import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCalendarComponent } from './car-calendar.component';

describe('CarCalendarComponent', () => {
  let component: CarCalendarComponent;
  let fixture: ComponentFixture<CarCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
