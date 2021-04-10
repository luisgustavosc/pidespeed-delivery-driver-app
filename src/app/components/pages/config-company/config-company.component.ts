import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { BottomNavService } from 'src/app/services/bottomNav/bottom-nav.service';
import { AffiliatedCompanyService } from 'src/app/services/affiliated-company/affiliated-company.service';
import { ActionService } from 'src/app/services/action/action.service';

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
        private actionService: ActionService,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getCompanies();
    }

    private getCompanies() {
        this.affiliatedCompanyService.getAll().subscribe(companies => {
            this.companies = companies;
        }, err => {
            this.actionService.getSwalError();
        })
    }

    hideCompany = ($id: string): void => {
        const company = this.actionService.findItemInArrayById(this.companies, $id);

        const value = {
            _id: company._id,
            publish: !company.publish
        }

        this.affiliatedCompanyService.update(value).subscribe((data: any) => {
            this.companies[this.actionService.getIndex(data, this.companies, '_id')].publish = data.publish;
            this.cdRef.detectChanges();
            this.actionService.openSnackBar(`Se ha ${data.publish ?'publicado' : 'ocultado'} a ${data.name}`);
        }, err => {
            this.actionService.getSwalError();
        });
    }

    deleteCompany = ($id: string): void => {
        this.affiliatedCompanyService.deleteById($id).subscribe((data: any) => {
            this.companies.splice(this.actionService.getIndex(data, this.companies, 'id'), 1);
            this.cdRef.detectChanges();
            this.actionService.openSnackBar('Se ha borrado exitosamente');
        }, err => {
            this.actionService.getSwalError();
        })
    }

}
