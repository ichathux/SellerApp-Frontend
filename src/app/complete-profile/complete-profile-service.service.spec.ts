import { TestBed } from '@angular/core/testing';

import { CompleteProfileServiceService } from './complete-profile-service.service';

describe('CompleteProfileServiceService', () => {
  let service: CompleteProfileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteProfileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
