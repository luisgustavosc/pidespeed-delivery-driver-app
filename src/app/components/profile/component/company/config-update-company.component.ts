import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { CompanyProfileService } from 'src/app/components/profile/service/companyProfile.service';

@Component({
    selector: 'app-config-update-company',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateCompanyComponent implements OnInit {
    public user = this.authService.getCurrentUser();
    public formType: string = FormService.COMPANY_PROFILE_TYPE;
    public formGroup: FormGroup;
    public isFormLoading = false;
    public isCompanyProfileFormType: boolean;
    public pageTitle = 'Editar perfil de cuenta';
    public goBackUrl = '/';
    public configId = this.user.empresaDelivery;

    // Mejorar esto para no tener que definirlas
    isAffiliatedCompanyFormType = null;
    isDeliverFormType = null;
    isAdminFormType = null;

    constructor(
        private formService: FormService,
        private utils: UtilsService,
        private router: Router,
        private authService: AuthService,
        private companyProfileService: CompanyProfileService,
    ) { }

    ngOnInit() {
        this.isCompanyProfileFormType = this.formService.isCompanyProfileFormType(this.formType);
    }

    getForm(form: any): void {
        this.isFormLoading = true;
        this.companyProfileService.update(form.value, this.user.empresaDelivery).subscribe(data => {
            this.utils.openSnackBar('Se ha actualizado exitosamente');
            this.isFormLoading = false;
        }, err => {
            this.isFormLoading = false;
            this.utils.getSwalError();
        });
    }
}
