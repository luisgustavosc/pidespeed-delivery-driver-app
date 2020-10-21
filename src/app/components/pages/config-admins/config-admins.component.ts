import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { FormService } from "src/app/services/form/form.service";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";

@Component({
    selector: 'app-config-admins',
    templateUrl: './config-admins.component.html',
    styleUrls: ['./config-admins.component.scss'],
})
export class ConfigAdminsComponent implements OnInit {
    private pageTitle: string = 'Configuración de Usuarios';
    private bottomNavData: Array<BottomNavModel> = this.bottomNavService.getConfigBottomNavData();
    private userFormType: string = this.formService.getUserFormType();

    constructor(private formService: FormService, private bottomNavService: BottomNavService ) { }

    ngOnInit() { }

    /**
     *  Desactivar Admin por su Id
     *
     * @param {Number} $id
     * @return {Boolean}
     */
    disableAdmin = ($id: number): Boolean => {
        // TODO: Codigo para Desactivar un Admin?
        // Esto basicamente lo desactivaria para que no pueda acceder a su panel u acciones?
        alert('Haz DESACTIVADO al Admin con el ' + $id);
        if ($id) {
            return true;
        }
        return false;
    }

    /**
     *  Eliminar Admin por su Id
     *
     * @param {Number} $id
     * @return {Void}
     */
    deleteAdmin = ($id: number): void => {
        // TODO: Codigo para borrar un Admin
        alert('Haz BORRADO al Admin con el ' + $id)
    }
}
