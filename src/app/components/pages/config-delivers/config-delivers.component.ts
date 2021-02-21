import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/services/bottomNav/bottom-nav.service';
import { FormService } from 'src/app/components/forms/services/form/form.service';
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
    public isFormLoading = false;
    constructor(
        private bottomNavService: BottomNavService,
        private formService: FormService,
        private deliversService: DeliversService ,
        private actionService: ActionService,
        private cdRef: ChangeDetectorRef
    ) { }

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
     * @param {string} $id
     * @return {void}
     */
    disableDeliver = ($id: string): void => {
        const deliver = this.actionService.findItemInArrayById(this.delivers, $id);

        const value = {
            _id: deliver._id,
            disabled: !deliver.disabled
        }

        this.deliversService.updateDeliver(value).subscribe((data: any) => {
            this.delivers[this.actionService.getIndex(data, this.delivers, '_id')].disabled = data.disabled;
            this.cdRef.detectChanges();
            this.actionService.openSnackBar(`Se ha ${data.disabled ?'desactivado' : 'activado'} a ${data.nombre}`);
        }, err => {
            this.actionService.getSwalError();
        });
    }

    /**
     * @param {string} $id
     * @return {void}
     */
    deleteDeliver = ($id: string): void => {
        this.deliversService.deleteById($id).subscribe((data: any) => {
            this.delivers.splice(this.actionService.getIndex(data, this.delivers, 'id'), 1);
            this.cdRef.detectChanges();
            this.actionService.openSnackBar('Se ha borrado exitosamente');
        }, err => {
            this.actionService.getSwalError();
        })
    }
}
