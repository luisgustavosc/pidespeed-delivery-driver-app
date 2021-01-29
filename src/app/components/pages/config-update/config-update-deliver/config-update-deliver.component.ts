import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/services/form/form.service";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DeliversService } from 'src/app/services/delivers/delivers.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
    selector: 'app-config-update-deliver',
    templateUrl: '../../../common/config-update/config-update.component.html',
})
export class ConfigUpdateDeliverComponent implements OnInit {
    private formType: string = this.formService.getDeliverFormType();
    private configId: string | null = this.activeRoute.snapshot.params.id || null;
    private formGroup: FormGroup;
    private isFormLoading = false;
    private isDeliverFormType: boolean;
    private pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Repartidor';
    private goBackUrl = '/settings/delivers';

    constructor(
        private formService: FormService,
        private activeRoute: ActivatedRoute,
        private deliversService: DeliversService,
        private actionService: ActionService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.isDeliverFormType = this.formService.isDeliverFormType(this.formType);
    }

    private getForm(form: any): void {
        this.isFormLoading = true;
        if (this.configId) {
            this.deliversService.updateDeliver(form.value).subscribe(data => {
                this.actionService.openSnackBar('Se ha actualizado exitosamente');
                setTimeout(() => {
                    this.router.navigateByUrl(this.goBackUrl);
                }, 2100);
            }, err => {
                this.isFormLoading = false;
                this.actionService.getSwalError();
            });
        }

        if (!this.configId) {
            this.deliversService.createDeliver(form.value).subscribe(data => {
                this.actionService.openSnackBar('Se ha creado exitosamente');
                setTimeout(() => {
                    this.router.navigateByUrl(this.goBackUrl);
                }, 2100);
            }, err => {
                this.isFormLoading = false;
                this.actionService.getSwalError();
            });
        }
    }
}
