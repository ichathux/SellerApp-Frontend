import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeExcelFilePageComponent } from './make-excel-file-page.component';

describe('MakeExcelFilePageComponent', () => {
  let component: MakeExcelFilePageComponent;
  let fixture: ComponentFixture<MakeExcelFilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeExcelFilePageComponent]
    });
    fixture = TestBed.createComponent(MakeExcelFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
