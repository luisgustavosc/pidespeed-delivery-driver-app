import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";
import { ActionService } from 'src/app/services/action/action.service';
import { CompanyUsersService } from 'src/app/services/company-users/company-users.service';
@Component({
    selector: 'app-delivers',
    templateUrl: './delivers.component.html',
})
export class DeliversComponent implements OnInit {
    private pageTitle: string = 'Repartidores';
    private bottomNavData: Array<BottomNavModel> = this.bottomNavService.getDeliverBottomNavData();
    private delivers = null;
    constructor(private bottomNavService: BottomNavService, private companyUsersService: CompanyUsersService, private actionService: ActionService) { }

    ngOnInit() {
        this.getDelivers();
    }

    getDelivers() {
        this.companyUsersService.getAll(CompanyUsersService.TYPE_DELIVERY).subscribe(delivers => {
            this.delivers = delivers;
        }, err => {
            //this.isFormLoading = false;
            this.actionService.getSwalError();
        })
    }

}
