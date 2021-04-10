import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionService } from 'src/app/services/action/action.service';
import { CompanyUsersService } from 'src/app/services/company-users/company-users.service';

@Component({
    selector: 'app-config-update-deliver',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateDeliverComponent implements OnInit {
    public formType: string = FormService.DELIVER_FORM_TYPE;
    public configId: string | null = this.activeRoute.snapshot.params.id || null;
    public formGroup: FormGroup;
    public isFormLoading = false;
    public isDeliverFormType: boolean;
    public pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Repartidor';
    public goBackUrl = '/settings/delivers';

    // Mejorar esto para no tener que definirlas
    isAffiliatedCompanyFormType = null;
    isCompanyProfileFormType = null;
    isAdminFormType = null;

    constructor(
        private formService: FormService,
        private activeRoute: ActivatedRoute,
        private companyUsersService: CompanyUsersService,
        private actionService: ActionService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.isDeliverFormType = this.formService.isDeliverFormType(this.formType);
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
