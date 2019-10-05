import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionlistComponent } from './competitionlist.component';

describe('CompetitionlistComponent', () => {
  let component: CompetitionlistComponent;
  let fixture: ComponentFixture<CompetitionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
