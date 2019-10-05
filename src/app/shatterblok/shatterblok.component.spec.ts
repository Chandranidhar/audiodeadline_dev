import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShatterblokComponent } from './shatterblok.component';

describe('ShatterblokComponent', () => {
  let component: ShatterblokComponent;
  let fixture: ComponentFixture<ShatterblokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShatterblokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShatterblokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
