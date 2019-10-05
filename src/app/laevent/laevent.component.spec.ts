import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaeventComponent } from './laevent.component';

describe('LaeventComponent', () => {
  let component: LaeventComponent;
  let fixture: ComponentFixture<LaeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
