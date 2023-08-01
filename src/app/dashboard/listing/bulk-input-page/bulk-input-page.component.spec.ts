import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkInputPageComponent } from './bulk-input-page.component';

describe('BulkInputPageComponent', () => {
  let component: BulkInputPageComponent;
  let fixture: ComponentFixture<BulkInputPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BulkInputPageComponent]
    });
    fixture = TestBed.createComponent(BulkInputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
