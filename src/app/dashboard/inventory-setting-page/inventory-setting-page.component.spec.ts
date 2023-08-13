import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySettingPageComponent } from './inventory-setting-page.component';

describe('InventorySettingPageComponent', () => {
  let component: InventorySettingPageComponent;
  let fixture: ComponentFixture<InventorySettingPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InventorySettingPageComponent]
    });
    fixture = TestBed.createComponent(InventorySettingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
