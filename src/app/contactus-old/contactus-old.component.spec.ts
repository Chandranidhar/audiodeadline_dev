import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusOldComponent } from './contactus-old.component';

describe('ContactusOldComponent', () => {
  let component: ContactusOldComponent;
  let fixture: ComponentFixture<ContactusOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
