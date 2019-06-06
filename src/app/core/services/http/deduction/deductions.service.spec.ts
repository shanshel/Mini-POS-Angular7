import { TestBed } from '@angular/core/testing';

import { DeductionsService } from './deductions.service';

describe('DeductionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeductionsService = TestBed.get(DeductionsService);
    expect(service).toBeTruthy();
  });
});
