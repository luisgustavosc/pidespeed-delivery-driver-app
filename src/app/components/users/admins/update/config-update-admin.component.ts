import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResolveFormComponentService } from 'src/app/components/forms/services/resolve-component/resolveFormComponent.service';
import { AppFormDirective } from 'src/app/components/forms/directive/directive';

@Component({
    selector: 'app-config-update-admin',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateAdminComponent implements OnInit {
    @ViewChild(AppFormDirective, { static: true })
    appFormDirective: AppFormDirective;

    public formType: string = ResolveFormComponentService.ADMIN_FORM_TYPE;
    public configId: string | null = this.activeRoute.snapshot.params.id || null;
    public isFormLoading = false;
    public pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Usuario';
    public goBackUrl = '/settings/admins';

    constructor(
        private activeRoute: ActivatedRoute,
        private resolveForm: ResolveFormComponentService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        const viewContainerRef = this.appFormDirective.viewContainerRef;
        this.resolveForm.loadComponent(
            viewContainerRef,
            this.formType,
            {
                isFormLoading: this.isFormLoading,
                configId: this.configId,
            }
        );
    }
}
