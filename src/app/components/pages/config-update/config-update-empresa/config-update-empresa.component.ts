import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/services/form/form.service";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-config-update-empresa',
    templateUrl: '../../../common/config-update/config-update.component.html',
})
export class ConfigUpdateEmpresaComponent implements OnInit {
    private formType: string = this.formService.getCompanyFormType();
    private configId: string | null = this.activeRoute.snapshot.params.id || null;
    private formGroup: FormGroup;
    private isCompanyFormType: boolean;
    private pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Empresa';
    private goBackUrl: string = '/configuracion/empresas'
    private isFormLoading: boolean = false;

    constructor(private formService: FormService, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.isCompanyFormType = this.formService.isCompanyFormType(this.formType);
    }

    private getForm(form: FormGroup): void {
        this.formGroup = form;
        console.log(this.formGroup);
    }
}
