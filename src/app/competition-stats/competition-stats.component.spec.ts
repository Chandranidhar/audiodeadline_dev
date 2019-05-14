import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionStatsComponent } from './competition-stats.component';

describe('CompetitionStatsComponent', () => {
  let component: CompetitionStatsComponent;
  let fixture: ComponentFixture<CompetitionStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
