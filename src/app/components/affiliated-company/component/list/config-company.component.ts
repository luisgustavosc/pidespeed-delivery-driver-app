import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { BottomNavService } from 'src/app/components/common/bottom-nav/service/bottom-nav.service';
import { AffiliatedCompanyService } from 'src/app/components/affiliated-company/service/affiliated-company.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
    selector: 'app-config-company',
    templateUrl: './config-company.component.html',
})
export class ConfigCompanyComponent implements OnInit {
    public pageTitle = 'Configuración de Empresas';
    public bottomNavData: Array<BottomNavModel> = this.bottomNavService.getConfigBottomNavData();
    public companyFormType: string = FormService.AFFILIATED_COMPANY_TYPE;
    public currentPath: string = window.location.pathname;
    public companies? = null;

    constructor(
        private formService: FormService,
        private bottomNavService: BottomNavService,
        private affiliatedCompanyService: AffiliatedCompanyService,
        private utils: UtilsService,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getCompanies();
    }

    private getCompanies() {
        this.affiliatedCompanyService.getAll().subscribe(companies => {
            this.companies = companies;
        }, err => {
            this.utils.getSwalError();
        })
    }

    hideCompany = ($id: string): void => {
        const company = this.utils.findItemInArrayById(this.companies, $id);

        const value = {
            _id: company._id,
            publish: !company.publish
        }

        this.affiliatedCompanyService.update(value).subscribe((data: any) => {
            this.companies[this.utils.getIndex(data, this.companies, '_id')].publish = data.publish;
            this.cdRef.detectChanges();
            this.utils.openSnackBar(`Se ha ${data.publish ?'publicado' : 'ocultado'} a ${data.name}`);
        }, err => {
            this.utils.getSwalError();
        });
    }

    deleteCompany = ($id: string): void => {
        this.affiliatedCompanyService.deleteById($id).subscribe((data: any) => {
            this.companies.splice(this.utils.getIndex(data, this.companies, 'id'), 1);
            this.cdRef.detectChanges();
            this.utils.openSnackBar('Se ha borrado exitosamente');
        }, err => {
            this.utils.getSwalError();
        })
    }

}
