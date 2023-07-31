import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingPageComponent } from './tracking-page.component';

describe('TrackingPageComponent', () => {
  let component: TrackingPageComponent;
  let fixture: ComponentFixture<TrackingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrackingPageComponent]
    });
    fixture = TestBed.createComponent(TrackingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
