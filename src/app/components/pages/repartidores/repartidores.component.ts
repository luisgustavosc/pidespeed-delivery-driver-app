import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { SharedService } from "src/app/services/shared.service"
@Component({
    selector: 'app-repartidores',
    templateUrl: './repartidores.component.html',
    styleUrls: ['./repartidores.component.scss'],
})
export class RepartidoresComponent implements OnInit {
    protected pageTitle = 'Repartidores';
    protected bottomNavData: Array<BottomNavModel>;

    constructor(public sharedService: SharedService) {
        this.bottomNavData = sharedService.repartidoresBottomNavData;
    }


    ngOnInit() { }

}
