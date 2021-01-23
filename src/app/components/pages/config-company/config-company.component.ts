import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { FormService } from "src/app/services/form/form.service";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";
@Component({
    selector: 'app-config-company',
    templateUrl: './config-company.component.html',
})
export class ConfigCompanyComponent implements OnInit {
    private pageTitle: string = 'Configuración de Empresas';
    private bottomNavData: Array<BottomNavModel> = this.bottomNavService.getConfigBottomNavData();
    private companyFormType: string = this.formService.getCompanyFormType();
    private currentPath: string = window.location.pathname;

    constructor(private formService: FormService, private bottomNavService: BottomNavService ) { }

    ngOnInit() { }

    /**
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
     * @param {Number} $id
     * @return {Void}
     */
    deleteCompany = ($id: number): void => {
        // TODO: Codigo para borrar un Empresa
        alert('Haz BORRADO al Empresa con el ' + $id)
    }

}
