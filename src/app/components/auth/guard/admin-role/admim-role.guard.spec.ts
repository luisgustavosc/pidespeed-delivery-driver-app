import { TestBed, inject } from '@angular/core/testing';

import { AdminRoleGuard } from './admim-role.guard';

describe('AdminRoleGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AdminRoleGuard]
        });
    });

    it('should ...', inject([AdminRoleGuard], (guard: AdminRoleGuard) => {
        expect(guard).toBeTruthy();
    }));
});
