import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinmovementComponent } from './joinmovement.component';

describe('JoinmovementComponent', () => {
  let component: JoinmovementComponent;
  let fixture: ComponentFixture<JoinmovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinmovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinmovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
