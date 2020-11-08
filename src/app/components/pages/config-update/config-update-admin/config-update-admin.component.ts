import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/services/form/form.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-config-update-admin',
    templateUrl: '../../../common/config-update/config-update.component.html',
})
export class ConfigUpdateAdminComponent implements OnInit {
    private formType: string = this.formService.getUserFormType();
    private configId: string | null = this.activeRoute.snapshot.params.id || null;
    private isUserFormType: boolean;
    private pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Usuario';
    private goBackUrl: string = '/configuracion/admins'

    constructor(private formService: FormService, private activeRoute: ActivatedRoute) { }

    ngOnInit() {
        this.isUserFormType = this.formService.isUserFormType(this.formType);
    }

}
