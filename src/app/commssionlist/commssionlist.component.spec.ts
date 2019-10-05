import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommssionlistComponent } from './commssionlist.component';

describe('CommssionlistComponent', () => {
  let component: CommssionlistComponent;
  let fixture: ComponentFixture<CommssionlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommssionlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommssionlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
