import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionOldComponent } from './competition-old.component';

describe('CompetitionOldComponent', () => {
  let component: CompetitionOldComponent;
  let fixture: ComponentFixture<CompetitionOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
