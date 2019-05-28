import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliatemediamarketingComponent } from './affiliatemediamarketing.component';

describe('AffiliatemediamarketingComponent', () => {
  let component: AffiliatemediamarketingComponent;
  let fixture: ComponentFixture<AffiliatemediamarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliatemediamarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliatemediamarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
