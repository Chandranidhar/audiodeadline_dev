import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffiliateTreeComponent } from './affiliate-tree.component';

describe('AffiliateTreeComponent', () => {
  let component: AffiliateTreeComponent;
  let fixture: ComponentFixture<AffiliateTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffiliateTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffiliateTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
