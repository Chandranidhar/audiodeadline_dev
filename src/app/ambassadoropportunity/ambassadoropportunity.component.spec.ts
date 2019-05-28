import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbassadoropportunityComponent } from './ambassadoropportunity.component';

describe('AmbassadoropportunityComponent', () => {
  let component: AmbassadoropportunityComponent;
  let fixture: ComponentFixture<AmbassadoropportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmbassadoropportunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbassadoropportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
