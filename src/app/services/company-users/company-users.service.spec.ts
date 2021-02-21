import { TestBed } from '@angular/core/testing';

import { CompanyUsersService } from './company-users.service';

describe('CompanyUsersService', () => {
  let service: CompanyUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
