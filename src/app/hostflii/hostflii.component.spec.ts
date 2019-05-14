import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostfliiComponent } from './hostflii.component';

describe('HostfliiComponent', () => {
  let component: HostfliiComponent;
  let fixture: ComponentFixture<HostfliiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostfliiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostfliiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
