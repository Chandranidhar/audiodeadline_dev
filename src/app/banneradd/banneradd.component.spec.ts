import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanneraddComponent } from './banneradd.component';

describe('BanneraddComponent', () => {
  let component: BanneraddComponent;
  let fixture: ComponentFixture<BanneraddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanneraddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanneraddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
