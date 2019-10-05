import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamOldComponent } from './team-old.component';

describe('TeamOldComponent', () => {
  let component: TeamOldComponent;
  let fixture: ComponentFixture<TeamOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
