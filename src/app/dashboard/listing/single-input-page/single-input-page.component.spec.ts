import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInputPageComponent } from './single-input-page.component';

describe('SingleInputPageComponent', () => {
  let component: SingleInputPageComponent;
  let fixture: ComponentFixture<SingleInputPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleInputPageComponent]
    });
    fixture = TestBed.createComponent(SingleInputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
