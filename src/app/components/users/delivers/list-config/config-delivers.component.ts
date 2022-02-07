import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/components/common/bottom-nav/service/bottom-nav.service';
import { CompanyUsersService } from 'src/app/components/users/services/company-users/company-users.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ResolveFormComponentService } from 'src/app/components/forms/services/resolve-component/resolveFormComponent.service';

@Component({
    selector: 'app-config-delivers',
    templateUrl: './config-delivers.component.html',
})
export class ConfigDeliversComponent implements OnInit {
    public pageTitle = 'Configuración de Repartidores';
    public bottomNavData: Array<BottomNavModel> =this.bottomNavService.getConfigBottomNavData();
    public formType: string = ResolveFormComponentService.DELIVER_FORM_TYPE;
    public currentPath: string = window.location.pathname;
    public delivers = null;
    public isFormLoading = false;
    constructor(
        private bottomNavService: BottomNavService,
        private companyUsersService: CompanyUsersService,
        private utils: UtilsService,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getDelivers();
    }

    private getDelivers() {
        this.companyUsersService.getAll(CompanyUsersService.ROLE_WORKER).subscribe(delivers => {
            this.delivers = delivers;
        }, err => {
            this.utils.getSwalError();
        })
    }

    disableDeliver = ($id: string): void => {
        const deliver = this.utils.findItemInArrayById(this.delivers, $id);

        const value = {
            _id: deliver._id,
            disabled: !deliver.disabled
        }

        this.companyUsersService.update(value).subscribe((data: any) => {
            this.delivers[this.utils.getIndex(data, this.delivers, '_id')].disabled = data.disabled;
            this.cdRef.detectChanges();
            this.utils.openSnackBar(`Se ha ${data.disabled ?'desactivado' : 'activado'} a ${data.nombre}`);
        }, err => {
            this.utils.getSwalError();
        });
    }

    deleteDeliver = ($id: string): void => {
        this.companyUsersService.deleteById($id).subscribe((data: any) => {
            this.delivers.splice(this.utils.getIndex(data, this.delivers, 'id'), 1);
            this.cdRef.detectChanges();
            this.utils.openSnackBar('Se ha borrado exitosamente');
        }, err => {
            this.utils.getSwalError();
        })
    }
}
