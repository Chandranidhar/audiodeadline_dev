import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionuserlistComponent } from './competitionuserlist.component';

describe('CompetitionuserlistComponent', () => {
  let component: CompetitionuserlistComponent;
  let fixture: ComponentFixture<CompetitionuserlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionuserlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
