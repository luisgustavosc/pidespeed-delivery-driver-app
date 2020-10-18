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

    constructor(protected sharedService: SharedService) {
        this.bottomNavData = sharedService.getConfigBottomNavData();
    }

    ngOnInit() { }

    /**
     *  Ocultar empresa por su Id
     *
     * @param {Number} $id
     * @return {Boolean}
     */
    hideCompany = ($id: number): Boolean => {
        alert('Haz Ocultado la Empresa con el ' + $id);
        if ($id) {
            return true;
        }
        return false;
    }

    /**
     *  Eliminar Empresa por su Id
     *
     * @param {Number} $id
     * @return {Void}
     */
    deleteCompany = ($id: number): void => {
        // TODO: Codigo para borrar un Empresa
        alert('Haz BORRADO al Empresa con el ' + $id)
    }

}
