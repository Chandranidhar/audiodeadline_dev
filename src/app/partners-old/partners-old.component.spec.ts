import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersOldComponent } from './partners-old.component';

describe('PartnersOldComponent', () => {
  let component: PartnersOldComponent;
  let fixture: ComponentFixture<PartnersOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
