import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/services/bottomNav/bottom-nav.service';
import { FormService } from 'src/app/services/form/form.service';
import { RepartidoresService } from 'src/app/services/repartidores/repartidores.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
    selector: 'app-config-repartidores',
    templateUrl: './config-repartidores.component.html',
})
export class ConfigRepartidoresComponent implements OnInit {
    private pageTitle = 'Configuración de Repartidores';
    private bottomNavData: Array<BottomNavModel> =this.bottomNavService.getConfigBottomNavData();
    private repartidorFormType: string = this.formService.getRepartidorFormType();
    private currentPath: string = window.location.pathname;
    //public isLoading = false;
    constructor(private bottomNavService: BottomNavService, private formService: FormService, private repartidoresService: RepartidoresService , private actionService: ActionService) { }

    ngOnInit() {
        console.log(123)
        this.listRepartidores();
    }

    listRepartidores() {
        this.repartidoresService.listRepartidores().subscribe(repartidores => {
            console.log(repartidores)
        }, err => {
            //this.isLoading = false;
            this.actionService.getErrorSwal();
        })
    }
    /**
     *  Desactivar repartidor por su Id
     *
     * @param {number} $id
     * @return {boolean}
     */
    disableRepartidor = ($id: number): boolean => {
        // TODO: Codigo para Desactivar un repartidor?
        // Esto basicamente lo desactivaria para que no pueda recibir ordenes
        alert('Haz DESACTIVADO al repartidor con el ' + $id);
        if ($id) {
            return true;
        }
        return false;
    }

    /**
     * @param {Number} $id
     * @return {Void}
     */
    deleteRepartidor = ($id: number): void => {
        // TODO: Codigo para borrar un repartidor
        alert('Haz BORRADO al repartidor con el ' + $id)
    }
}
