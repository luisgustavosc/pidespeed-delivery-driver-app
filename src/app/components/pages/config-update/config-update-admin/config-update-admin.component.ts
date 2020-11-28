import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/services/form/form.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-config-update-admin',
    templateUrl: '../../../common/config-update/config-update.component.html',
})
export class ConfigUpdateAdminComponent implements OnInit {
    private formType: string = this.formService.getUserFormType();
    private configId: string | null = this.activeRoute.snapshot.params.id || null;
    private formGroup: FormGroup;
    private isUserFormType: boolean;
    private pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Usuario';
    private goBackUrl: string = '/configuracion/admins'
    private isLoading: boolean = false;

    constructor(private formService: FormService, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.isUserFormType = this.formService.isUserFormType(this.formType);
    }

    private getForm(form: FormGroup): void {
        this.formGroup = form;
        console.log(this.formGroup);
    }
}
