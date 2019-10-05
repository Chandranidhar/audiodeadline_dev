import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeweventrsvpComponent } from './neweventrsvp.component';

describe('NeweventrsvpComponent', () => {
  let component: NeweventrsvpComponent;
  let fixture: ComponentFixture<NeweventrsvpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeweventrsvpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeweventrsvpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
