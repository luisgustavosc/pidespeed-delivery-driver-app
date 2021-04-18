import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResolveFormComponentService } from 'src/app/components/forms/services/resolve-component/resolveFormComponent.service';
import { AppFormDirective } from 'src/app/components/forms/directive/directive';

@Component({
    selector: 'app-config-update-company',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateCompaniesComponent implements OnInit {
    @ViewChild(AppFormDirective, { static: true })
    appFormDirective: AppFormDirective;

    public formType: string = ResolveFormComponentService.AFFILIATED_COMPANY_TYPE;
    public configId: string | null = this.activeRoute.snapshot.params.id || null;
    public pageTitle: string = this.configId ? 'Editar Empresa' : 'Agregar Empresa';
    public goBackUrl = '/settings/company'
    public isFormLoading = false;

    constructor(
        private activeRoute: ActivatedRoute,
        private resolveForm: ResolveFormComponentService
    ) { }

    ngOnInit() {
        this.initForm()
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
