import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { SharedService } from "src/app/services/shared.service";
@Component({
    selector: 'app-config-empresas',
    templateUrl: './config-empresas.component.html',
    styleUrls: ['./config-empresas.component.scss'],
})
export class ConfigEmpresasComponent implements OnInit {
    protected pageTitle: string = 'Configuración de Empresas';
    protected bottomNavData: Array<BottomNavModel>;

    constructor(public sharedService: SharedService) {
        this.bottomNavData = sharedService.getConfigBottomNavData();
    }

    ngOnInit() { }

}
