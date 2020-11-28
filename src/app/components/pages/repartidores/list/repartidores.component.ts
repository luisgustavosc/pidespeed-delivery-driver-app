import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";
@Component({
    selector: 'app-repartidores',
    templateUrl: './repartidores.component.html',
})
export class RepartidoresComponent implements OnInit {
    private pageTitle: string = 'Repartidores';
    private bottomNavData: Array<BottomNavModel> = this.bottomNavService.getRepartidoresBottomNavData();

    constructor(private bottomNavService: BottomNavService) { }

    ngOnInit() { }

}
