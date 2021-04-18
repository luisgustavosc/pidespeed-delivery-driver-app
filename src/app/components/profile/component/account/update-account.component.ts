import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyUsersService } from 'src/app/components/users/services/company-users/company-users.service';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { AppFormDirective } from 'src/app/components/forms/directive/directive';
import { ResolveFormComponentService } from 'src/app/components/forms/services/resolve-component/resolveFormComponent.service';

@Component({
    selector: 'app-update-account',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class UpdateAccountComponent implements OnInit {
    @ViewChild(AppFormDirective, { static: true })
    appFormDirective: AppFormDirective;

    public user = this.authService.getCurrentUser();
    public formType: string;
    public isFormLoading = false;
    public pageTitle = 'Editar mi cuenta';
    public goBackUrl = '/';

    constructor(
        private authService: AuthService,
        private resolveForm: ResolveFormComponentService

    ) { }

    ngOnInit() {
        if (this.user) {
            this.formType = this.user.role === CompanyUsersService.ROLE_ADMIN
                    ? ResolveFormComponentService.ADMIN_FORM_TYPE
                    :  ResolveFormComponentService.DELIVER_FORM_TYPE;

            this.initForm();
        }
    }

    initForm() {
        const viewContainerRef = this.appFormDirective.viewContainerRef;
        this.resolveForm.loadComponent(
            viewContainerRef,
            this.formType,
            {
                isFormLoading: this.isFormLoading,
                configId: this.user._id,
            }
        );
    }
}
