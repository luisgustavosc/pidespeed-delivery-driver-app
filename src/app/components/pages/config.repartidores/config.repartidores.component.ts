import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";
import { FormService } from "src/app/services/form/form.service";

@Component({
    selector: 'app-config.repartidores',
    templateUrl: './config.repartidores.component.html',
    styleUrls: ['./config.repartidores.component.scss'],
})
export class ConfigRepartidoresComponent implements OnInit {
    private pageTitle: string = 'Configuración de Repartidores';
    private bottomNavData: Array<BottomNavModel>;
    private repartidorFormType: string = this.formService.getRepartidorFormType();

    constructor(private bottomNavService: BottomNavService, private formService: FormService) {
        this.bottomNavData = this.bottomNavService.getConfigBottomNavData();
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
