import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/components/common/bottom-nav/service/bottom-nav.service';
import { CompanyUsersService } from 'src/app/components/users/services/company-users/company-users.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { ResolveFormComponentService } from 'src/app/components/forms/services/resolve-component/resolveFormComponent.service';

@Component({
    selector: 'app-config-admins',
    templateUrl: './config-admins.component.html',
})
export class ConfigAdminsComponent implements OnInit {
    public pageTitle = 'Configuración de Usuarios';
    public bottomNavData: Array<BottomNavModel> =this.bottomNavService.getConfigBottomNavData();
    public formType: string = ResolveFormComponentService.ADMIN_FORM_TYPE;
    public currentPath: string = window.location.pathname;
    public users = null;
    public isFormLoading = false;

    constructor(
        private bottomNavService: BottomNavService,
        private companyUsersService: CompanyUsersService,
        private utils: UtilsService,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getUsers();
    }
    getUsers() {
        this.companyUsersService.getAll(CompanyUsersService.ROLE_ADMIN).subscribe(users => {
            this.users = users;
        }, err => {
            this.utils.getSwalError();
        })
    }

    disableUser = ($id: string): void => {
        const user = this.utils.findItemInArrayById(this.users, $id);

        const value = {
            _id: user._id,
            disabled: !user.disabled
        }

        this.companyUsersService.update(value).subscribe((data: any) => {
            this.users[this.utils.getIndex(data, this.users, '_id')].disabled = data.disabled;
            this.cdRef.detectChanges();
            this.utils.openSnackBar(`Se ha ${data.disabled ?'desactivado' : 'activado'} a ${data.nombre}`);
        }, err => {
            this.utils.getSwalError();
        });
    }

    deleteUser = ($id: string): void => {
        this.companyUsersService.deleteById($id).subscribe((data: any) => {
            this.users.splice(this.utils.getIndex(data, this.users, 'id'), 1);
            this.cdRef.detectChanges();
            this.utils.openSnackBar('Se ha borrado exitosamente');
        }, err => {
            this.utils.getSwalError();
        })
    }
}
