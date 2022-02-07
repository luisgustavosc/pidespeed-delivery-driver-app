import { TestBed, inject } from '@angular/core/testing';

import { WorkerRoleGuard } from './worker-role.guard';

describe('AdminRoleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkerRoleGuard]
    });
  });

  it('should ...', inject([WorkerRoleGuard], (guard: WorkerRoleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
