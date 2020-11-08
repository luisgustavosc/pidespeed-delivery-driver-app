import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { FormService } from "src/app/services/form/form.service";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";
@Component({
    selector: 'app-config-empresas',
    templateUrl: './config-empresas.component.html',
})
export class ConfigEmpresasComponent implements OnInit {
    private pageTitle: string = 'Configuración de Empresas';
    private bottomNavData: Array<BottomNavModel> = this.bottomNavService.getConfigBottomNavData();
    private companyFormType: string = this.formService.getCompanyFormType();
    private currentPath: string = window.location.pathname;

    constructor(private formService: FormService, private bottomNavService: BottomNavService ) { }

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
