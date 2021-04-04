import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/components/forms/services/form/form.service";
import { FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { ActionService } from 'src/app/services/action/action.service';
import { CompanyUsersService } from 'src/app/services/company-users/company-users.service';

@Component({
    selector: 'app-config-update-admin',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateAdminComponent implements OnInit {
    public formType: string = FormService.ADMIN_FORM_TYPE;
    public configId: string | null = this.activeRoute.snapshot.params.id || null;
    public formGroup: FormGroup;
    public isFormLoading = false;
    public isAdminFormType: boolean;
    public pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Usuario';
    public goBackUrl: string = '/settings/admins';

    //Mejorar esto para no tener que definirlas
    isAffiliatedCompanyFormType = null;
    isDeliverFormType = null;
    isCompanyProfileFormType = null;

    constructor(
        private formService: FormService,
        private activeRoute: ActivatedRoute,
        private companyUsersService: CompanyUsersService,
        private actionService: ActionService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.isAdminFormType = this.formService.isAdminFormType(this.formType);
    }

    getForm(form: any): void {
        this.isFormLoading = true;
        if (this.configId) {
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

        if (!this.configId) {
            this.companyUsersService.create(form.value).subscribe(data => {
                this.actionService.openSnackBar('Se ha creado exitosamente');
                setTimeout(() => {
                    this.router.navigateByUrl(this.goBackUrl);
                }, 2100);
            }, err => {
                this.isFormLoading = false;
                this.actionService.getSwalError();
            });
        }
    }
}
