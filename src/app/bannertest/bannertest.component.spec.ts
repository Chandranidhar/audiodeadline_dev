import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannertestComponent } from './bannertest.component';

describe('BannertestComponent', () => {
  let component: BannertestComponent;
  let fixture: ComponentFixture<BannertestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannertestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannertestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
