import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/components/forms/services/form/form.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-config-update-admin',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateAdminComponent implements OnInit {
    private formType: string = this.formService.getAdminFormType();
    private configId: string | null = this.activeRoute.snapshot.params.id || null;
    private formGroup: FormGroup;
    private isAdminFormType: boolean;
    private pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Usuario';
    private goBackUrl: string = '/configuracion/admins'
    private isFormLoading: boolean = false;

    constructor(private formService: FormService, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.isAdminFormType = this.formService.isAdminFormType(this.formType);
    }

    private getForm(form: FormGroup): void {
        this.formGroup = form;
        console.log(this.formGroup);
    }
}
