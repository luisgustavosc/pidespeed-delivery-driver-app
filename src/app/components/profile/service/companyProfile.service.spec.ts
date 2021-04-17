import { TestBed } from '@angular/core/testing';

import { CompanyProfileService } from './companyProfile.service';

describe('CompanyProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyProfileService = TestBed.inject(CompanyProfileService);
    expect(service).toBeTruthy();
  });
});
