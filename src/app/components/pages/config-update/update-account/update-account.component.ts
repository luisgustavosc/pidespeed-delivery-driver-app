import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/components/forms/services/form/form.service";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ActionService } from 'src/app/services/action/action.service';
import { CompanyUsersService } from 'src/app/services/company-users/company-users.service';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';

@Component({
    selector: 'app-update-account',
    templateUrl: './update-account.component.html',
})
export class UpdateAccountComponent implements OnInit {
    public user = this.authService.getCurrentUser();
    public formType: string;
    public formGroup: FormGroup;
    public isFormLoading = false;
    public isDeliverFormType: boolean;
    public isAdminFormType: boolean;
    public pageTitle: string = 'Editar mi cuenta';
    public goBackUrl = '/';

    constructor(
        private formService: FormService,
        private companyUsersService: CompanyUsersService,
        private actionService: ActionService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.formType = this.formService.getFormType(this.user.type);
        this.isDeliverFormType = this.formService.isDeliverFormType(this.formType);
        this.isAdminFormType = this.formService.isAdminFormType(this.formType);
    }

    getForm(form: any): void {
        this.isFormLoading = true;
        this.companyUsersService.update(form.value).subscribe(data => {
            this.actionService.openSnackBar('Se ha actualizado exitosamente');
            setTimeout(() => {
                this.router.navigateByUrl(this.goBackUrl);
            }, 2100);
        }, err => {
            this.isFormLoading = false;
            this.actionService.getSwalError();
        });
    }
}
