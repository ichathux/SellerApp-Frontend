import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInventoryItemComponent } from './view-inventory-item.component';

describe('ViewInventoryItemComponent', () => {
  let component: ViewInventoryItemComponent;
  let fixture: ComponentFixture<ViewInventoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInventoryItemComponent]
    });
    fixture = TestBed.createComponent(ViewInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
