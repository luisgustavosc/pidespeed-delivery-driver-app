import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/services/bottomNav/bottom-nav.service';
import { FormService } from 'src/app/services/form/form.service';
import { DeliversService } from 'src/app/services/delivers/delivers.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
    selector: 'app-config-delivers',
    templateUrl: './config-delivers.component.html',
})
export class ConfigDeliversComponent implements OnInit {
    private pageTitle = 'Configuración de Repartidores';
    private bottomNavData: Array<BottomNavModel> =this.bottomNavService.getConfigBottomNavData();
    private deliverFormType: string = this.formService.getDeliverFormType();
    private currentPath: string = window.location.pathname;
    private delivers = null;
    //public isFormLoading = false;
    constructor(private bottomNavService: BottomNavService, private formService: FormService, private deliversService: DeliversService , private actionService: ActionService) { }

    ngOnInit() {
        this.getDelivers();
    }

    getDelivers() {
        this.deliversService.getAll().subscribe(delivers => {
            this.delivers = delivers;
        }, err => {
            this.actionService.getSwalError();
        })
    }
    /**
     *  Desactivar repartidor por su Id
     *
     * @param {number} $id
     * @return {boolean}
     */
    disableDeliver = ($id: number): boolean => {
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
    deleteDeliver = ($id: number): void => {
        this.deliversService.deleteById($id).subscribe(delivers => {
            this.actionService.openSnackBar('Se ha borrado exitosamente');
            //this.delivers = delivers;
        }, err => {
            this.actionService.getSwalError();
        })
    }
}
