import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AffiliatedCompanyService } from 'src/app/services/affiliated-company/affiliated-company.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
    selector: 'app-config-update-company',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateCompaniesComponent implements OnInit {
    public formType: string = FormService.AFFILIATED_COMPANY_TYPE;
    public configId: string | null = this.activeRoute.snapshot.params.id || null;
    public formGroup: FormGroup;
    public isAffiliatedCompanyFormType: boolean;
    public pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Empresa';
    public goBackUrl = '/settings/company'
    public isFormLoading = false;

    // Mejorar esto para no tener que definirlas
    isDeliverFormType = null;
    isCompanyProfileFormType = null;
    isAdminFormType = null;

    constructor(
        private formService: FormService,
        private activeRoute: ActivatedRoute,
        private affiliatedCompanyService: AffiliatedCompanyService,
        private actionService: ActionService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.isAffiliatedCompanyFormType = this.formService.isAffiliatedCompanyFormType(this.formType);
    }

    getForm(form: FormGroup): void {
        this.isFormLoading = true;
        if (this.configId) {
            this.affiliatedCompanyService.update(form.value).subscribe(data => {
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
            this.affiliatedCompanyService.create(form.value).subscribe(data => {
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
