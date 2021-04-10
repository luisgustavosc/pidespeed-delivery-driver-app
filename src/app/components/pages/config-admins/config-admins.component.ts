import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/services/bottomNav/bottom-nav.service';
import { FormService } from 'src/app/components/forms/services/form/form.service';
import { CompanyUsersService } from 'src/app/services/company-users/company-users.service';
import { ActionService } from 'src/app/services/action/action.service';

@Component({
    selector: 'app-config-admins',
    templateUrl: './config-admins.component.html',
})
export class ConfigAdminsComponent implements OnInit {
    public pageTitle = 'Configuración de Usuarios';
    public bottomNavData: Array<BottomNavModel> =this.bottomNavService.getConfigBottomNavData();
    public adminFormType: string = FormService.ADMIN_FORM_TYPE;
    public currentPath: string = window.location.pathname;
    public users = null;
    public isFormLoading = false;

    constructor(
        private bottomNavService: BottomNavService,
        private companyUsersService: CompanyUsersService,
        private actionService: ActionService,
        private cdRef: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getUsers();
    }
    getUsers() {
        this.companyUsersService.getAll().subscribe(users => {
            this.users = users;
        }, err => {
            this.actionService.getSwalError();
        })
    }

    disableUser = ($id: string): void => {
        const user = this.actionService.findItemInArrayById(this.users, $id);

        const value = {
            _id: user._id,
            disabled: !user.disabled
        }

        this.companyUsersService.update(value).subscribe((data: any) => {
            this.users[this.actionService.getIndex(data, this.users, '_id')].disabled = data.disabled;
            this.cdRef.detectChanges();
            this.actionService.openSnackBar(`Se ha ${data.disabled ?'desactivado' : 'activado'} a ${data.nombre}`);
        }, err => {
            this.actionService.getSwalError();
        });
    }

    deleteUser = ($id: string): void => {
        this.companyUsersService.deleteById($id).subscribe((data: any) => {
            this.users.splice(this.actionService.getIndex(data, this.users, 'id'), 1);
            this.cdRef.detectChanges();
            this.actionService.openSnackBar('Se ha borrado exitosamente');
        }, err => {
            this.actionService.getSwalError();
        })
    }
}
