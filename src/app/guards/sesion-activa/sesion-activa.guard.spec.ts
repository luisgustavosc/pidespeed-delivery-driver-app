import { TestBed, async, inject } from '@angular/core/testing';

import { SesionActivaGuard } from './sesion-activa.guard';

describe('SesionActivaGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SesionActivaGuard]
    });
  });

  it('should ...', inject([SesionActivaGuard], (guard: SesionActivaGuard) => {
    expect(guard).toBeTruthy();
  }));
});
