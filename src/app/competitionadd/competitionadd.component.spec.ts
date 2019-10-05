import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionaddComponent } from './competitionadd.component';

describe('CompetitionaddComponent', () => {
  let component: CompetitionaddComponent;
  let fixture: ComponentFixture<CompetitionaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
