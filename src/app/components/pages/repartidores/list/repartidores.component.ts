import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";
@Component({
    selector: 'app-repartidores',
    templateUrl: './repartidores.component.html',
})
export class RepartidoresComponent implements OnInit {
    private pageTitle = 'Repartidores';
    private bottomNavData: Array<BottomNavModel>;

    constructor(private bottomNavService: BottomNavService) {
        this.bottomNavData = this.bottomNavService.getRepartidoresBottomNavData();
    }

    ngOnInit() { }

}
