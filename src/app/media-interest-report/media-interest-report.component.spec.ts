import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInterestReportComponent } from './media-interest-report.component';

describe('MediaInterestReportComponent', () => {
  let component: MediaInterestReportComponent;
  let fixture: ComponentFixture<MediaInterestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaInterestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInterestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
