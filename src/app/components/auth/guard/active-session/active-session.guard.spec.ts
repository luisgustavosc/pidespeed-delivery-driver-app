import { TestBed, async, inject } from '@angular/core/testing';

import { ActiveSessionGuard } from './active-session.guard';

describe('ActiveSessionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveSessionGuard]
    });
  });

  it('should ...', inject([ActiveSessionGuard], (guard: ActiveSessionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
