import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/services/form/form.service";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { RepartidoresService } from 'src/app/services/repartidores/repartidores.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
    selector: 'app-config-update-repartidor',
    templateUrl: '../../../common/config-update/config-update.component.html',
})
export class ConfigUpdateRepartidorComponent implements OnInit {
    private formType: string = this.formService.getRepartidorFormType();
    private configId: string | null = this.activeRoute.snapshot.params.id || null;
    private formGroup: FormGroup;
    private isFormLoading = false;
    private isRepartidorFormType: boolean;
    private pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Repartidor';
    private goBackUrl = '/configuracion/repartidores';

    constructor(
        private formService: FormService,
        private activeRoute: ActivatedRoute,
        private repartidoresService: RepartidoresService,
        private actionService: ActionService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.isRepartidorFormType = this.formService.isRepartidorFormType(this.formType);
    }

    private getForm(form: any): void {
        if (this.configId) {
            this.repartidoresService.updateRepartidor(form.value).subscribe(data => {
                console.log(data);
                this.actionService.openSnackBar('Se ha actualizado exitosamente');
                setTimeout(() => {
                   // this.router.navigateByUrl(this.goBackUrl);
                }, 2100);
            }, err => {
                this.isFormLoading = false;
                this.actionService.getSwalError();
            });
        }

        if (!this.configId) {
            this.repartidoresService.addRepartidor(form.value).subscribe(data => {
                this.actionService.openSnackBar('Se ha creado exitosamente');
                setTimeout(() => {
                    this.router.navigateByUrl(this.goBackUrl);
                }, 2100);            }, err => {
                console.log(err)
                this.isFormLoading = false;
                this.actionService.getSwalError();
            });
        }
    }
}
