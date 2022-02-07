import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/components/common/bottom-nav/service/bottom-nav.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { CompanyUsersService } from 'src/app/components/users/services/company-users/company-users.service';

@Component({
    selector: 'app-delivers',
    templateUrl: './delivers.component.html',
})
export class DeliversComponent implements OnInit {
    public pageTitle = 'Repartidores';
    public bottomNavData: Array<BottomNavModel> = this.bottomNavService.getDeliverBottomNavData();
    public delivers = null;

    constructor(
        private bottomNavService: BottomNavService,
        private companyUsersService: CompanyUsersService,
        private utils: UtilsService
    ) { }

    ngOnInit() {
        this.getDelivers();
    }

    private getDelivers() {
        this.companyUsersService.getAll(CompanyUsersService.ROLE_WORKER).subscribe(delivers => {
            this.delivers = delivers;
        }, err => {
            this.utils.getSwalError();
        })
    }

}
