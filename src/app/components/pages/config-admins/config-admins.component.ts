import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { FormService } from "src/app/services/form/form.service";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";

@Component({
    selector: 'app-config-admins',
    templateUrl: './config-admins.component.html',
})
export class ConfigAdminsComponent implements OnInit {
    private pageTitle: string = 'Configuración de Usuarios';
    private bottomNavData: Array<BottomNavModel> = this.bottomNavService.getConfigBottomNavData();
    private adminFormType: string = this.formService.getAdminFormType();
    private currentPath: string = window.location.pathname;

    constructor(private formService: FormService, private bottomNavService: BottomNavService ) { }

    ngOnInit() { }

    /**
     * @param {string} $id
     * @return {void}
     */
    disableAdmin = ($id: string): void => {
        // TODO: Codigo para Desactivar un Admin?
        // Esto basicamente lo desactivaria para que no pueda acceder a su panel u acciones?
        alert('Haz DESACTIVADO al Admin con el ' + $id);
    }

    /**
     * @param {string} $id
     * @return {void}
     */
    deleteAdmin = ($id: string): void => {
        // TODO: Codigo para borrar un Admin
        alert('Haz BORRADO al Admin con el ' + $id)
    }
}
