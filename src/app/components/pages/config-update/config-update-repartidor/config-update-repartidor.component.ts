import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/services/form/form.service";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-config-update-repartidor',
    templateUrl: '../../../common/config-update/config-update.component.html',
})
export class ConfigUpdateRepartidorComponent implements OnInit {
    private formType: string = this.formService.getRepartidorFormType();
    private configId: string | null = this.activeRoute.snapshot.params.id || null;
    private formGroup: FormGroup;
    private isLoading: boolean = false;
    private isRepartidorFormType: boolean;
    private pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Repartidor';
    private goBackUrl: string = '/configuracion/repartidores';

    constructor(private formService: FormService, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.isRepartidorFormType = this.formService.isRepartidorFormType(this.formType);
    }

    private getForm(form: any): void {
        this.formGroup = form;
        console.log(this.formGroup);
    }
}
