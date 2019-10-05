import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitioneditComponent } from './competitionedit.component';

describe('CompetitioneditComponent', () => {
  let component: CompetitioneditComponent;
  let fixture: ComponentFixture<CompetitioneditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitioneditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitioneditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
