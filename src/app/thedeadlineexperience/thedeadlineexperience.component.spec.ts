import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThedeadlineexperienceComponent } from './thedeadlineexperience.component';

describe('ThedeadlineexperienceComponent', () => {
  let component: ThedeadlineexperienceComponent;
  let fixture: ComponentFixture<ThedeadlineexperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThedeadlineexperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThedeadlineexperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
