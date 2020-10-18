import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { SharedService } from "src/app/services/shared.service";

@Component({
    selector: 'app-config.repartidores',
    templateUrl: './config.repartidores.component.html',
    styleUrls: ['./config.repartidores.component.scss'],
})
export class ConfigRepartidoresComponent implements OnInit {
    protected pageTitle: string  =  'Configuración de Repartidores';
    protected bottomNavData: Array<BottomNavModel>;

    constructor(public sharedService: SharedService) {
        this.bottomNavData = sharedService.getConfigBottomNavData();
    }

    ngOnInit() {

    }

}
