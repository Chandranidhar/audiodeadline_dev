import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannereditComponent } from './banneredit.component';

describe('BannereditComponent', () => {
  let component: BannereditComponent;
  let fixture: ComponentFixture<BannereditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannereditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannereditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
