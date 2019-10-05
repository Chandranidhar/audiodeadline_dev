import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FebeventComponent } from './febevent.component';

describe('FebeventComponent', () => {
  let component: FebeventComponent;
  let fixture: ComponentFixture<FebeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FebeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FebeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
