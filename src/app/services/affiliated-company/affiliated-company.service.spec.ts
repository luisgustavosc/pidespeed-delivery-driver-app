import { TestBed } from '@angular/core/testing';

import { AffiliatedCompanyService } from './affiliated-company.service';

describe('AffiliatedCompanyService', () => {
  let service: AffiliatedCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffiliatedCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
