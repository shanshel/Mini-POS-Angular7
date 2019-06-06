import { TestBed } from '@angular/core/testing';

import { AllowancesService } from './allowances.service';

describe('AllowancesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllowancesService = TestBed.get(AllowancesService);
    expect(service).toBeTruthy();
  });
});
