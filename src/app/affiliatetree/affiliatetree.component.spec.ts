import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatetreeComponent } from './affiliatetree.component';

describe('AffiliatetreeComponent', () => {
  let component: AffiliatetreeComponent;
  let fixture: ComponentFixture<AffiliatetreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliatetreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatetreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
