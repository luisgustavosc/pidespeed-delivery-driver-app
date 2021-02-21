import { Component, OnInit } from '@angular/core';
import { FormService } from "src/app/components/forms/services/form/form.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { AffiliatedCompanyService } from 'src/app/services/affiliated-company/affiliated-company.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
    selector: 'app-config-update-company',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateCompaniesComponent implements OnInit {
    private formType: string = FormService.AFFILIATED_COMPANY_TYPE;
    private configId: string | null = this.activeRoute.snapshot.params.id || null;
    private formGroup: FormGroup;
    private isAffiliatedCompanyFormType: boolean;
    private pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Empresa';
    private goBackUrl: string = '/settings/company'
    private isFormLoading: boolean = false;

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

    private getForm(form: FormGroup): void {
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
