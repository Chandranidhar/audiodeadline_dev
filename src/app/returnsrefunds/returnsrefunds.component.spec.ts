import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnsrefundsComponent } from './returnsrefunds.component';

describe('ReturnsrefundsComponent', () => {
  let component: ReturnsrefundsComponent;
  let fixture: ComponentFixture<ReturnsrefundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnsrefundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnsrefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
