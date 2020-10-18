import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { SharedService } from "src/app/services/shared.service";

@Component({
    selector: 'app-config.repartidores',
    templateUrl: './config.repartidores.component.html',
    styleUrls: ['./config.repartidores.component.scss'],
})
export class ConfigRepartidoresComponent implements OnInit {
    protected pageTitle: string = 'Configuración de Repartidores';
    protected bottomNavData: Array<BottomNavModel>;

    constructor(public sharedService: SharedService) {
        this.bottomNavData = sharedService.getConfigBottomNavData();
    }

    ngOnInit() { }

    /**
     *  Desactivar repartidor por su Id
     *
     * @param {Number} $id
     * @return {Boolean}
     */
    disableRepartidor = ($id: number): Boolean => {
        // TODO: Codigo para Desactivar un repartidor?
        // Esto basicamente lo desactivaria para que no pueda recibir ordenes
        alert('Haz DESACTIVADO al repartidor con el ' + $id);
        if ($id) {
            return true;
        }
        return false;
    }

    /**
     *  Eliminar repartidor por su Id
     *
     * @param {Number} $id
     * @return {Void}
     */
    deleteRepartidor = ($id: number): void => {
        // TODO: Codigo para borrar un repartidor
        alert('Haz BORRADO al repartidor con el ' + $id)
    }
}
