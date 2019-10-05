import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompetitionSignupComponent } from './manage-competition-signup.component';

describe('ManageCompetitionSignupComponent', () => {
  let component: ManageCompetitionSignupComponent;
  let fixture: ComponentFixture<ManageCompetitionSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageCompetitionSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageCompetitionSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
