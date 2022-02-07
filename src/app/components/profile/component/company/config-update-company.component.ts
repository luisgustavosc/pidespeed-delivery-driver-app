import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { ResolveFormComponentService } from 'src/app/components/forms/services/resolve-component/resolveFormComponent.service';
import { AppFormDirective } from 'src/app/components/forms/directive/directive';

@Component({
    selector: 'app-config-update-company',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateCompanyComponent implements OnInit {
    @ViewChild(AppFormDirective, { static: true })
    appFormDirective: AppFormDirective;

    public user = this.authService.getCurrentUser();
    public formType: string = ResolveFormComponentService.COMPANY_PROFILE_TYPE;
    public isFormLoading = false;
    public pageTitle = 'Editar perfil de empresa';
    public goBackUrl = '/';
    public configId = this.user.empresaDelivery;

    constructor(
        private authService: AuthService,
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
