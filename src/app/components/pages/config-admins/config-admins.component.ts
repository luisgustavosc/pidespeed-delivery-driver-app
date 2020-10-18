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
