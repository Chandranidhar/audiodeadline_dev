import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsaleoldComponent } from './ticketsaleold.component';

describe('TicketsaleoldComponent', () => {
  let component: TicketsaleoldComponent;
  let fixture: ComponentFixture<TicketsaleoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsaleoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsaleoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
