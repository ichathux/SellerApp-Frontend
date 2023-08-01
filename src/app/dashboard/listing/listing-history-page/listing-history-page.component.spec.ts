import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingHistoryPageComponent } from './listing-history-page.component';

describe('ListingHistoryPageComponent', () => {
  let component: ListingHistoryPageComponent;
  let fixture: ComponentFixture<ListingHistoryPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListingHistoryPageComponent]
    });
    fixture = TestBed.createComponent(ListingHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
