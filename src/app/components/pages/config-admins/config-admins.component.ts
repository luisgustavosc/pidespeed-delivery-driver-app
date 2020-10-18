import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { SharedService } from "src/app/services/shared.service";
@Component({
    selector: 'app-config-admins',
    templateUrl: './config-admins.component.html',
    styleUrls: ['./config-admins.component.scss'],
})
export class ConfigAdminsComponent implements OnInit {
    protected pageTitle: string = 'Configuración de Administradores';
    protected bottomNavData: Array<BottomNavModel>;

    constructor(public sharedService: SharedService) {
        this.bottomNavData = sharedService.getConfigBottomNavData();
    }

    ngOnInit() { }

}
