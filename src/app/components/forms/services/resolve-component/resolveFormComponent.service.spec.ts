import { TestBed } from '@angular/core/testing';

import { ResolveFormComponentService } from './resolveFormComponent.service';

describe('ResolveFormComponentService', () => {
  let service: ResolveFormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolveFormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
