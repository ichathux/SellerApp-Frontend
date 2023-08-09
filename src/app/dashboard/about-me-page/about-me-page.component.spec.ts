import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMePageComponent } from './about-me-page.component';

describe('AboutMePageComponent', () => {
  let component: AboutMePageComponent;
  let fixture: ComponentFixture<AboutMePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutMePageComponent]
    });
    fixture = TestBed.createComponent(AboutMePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
