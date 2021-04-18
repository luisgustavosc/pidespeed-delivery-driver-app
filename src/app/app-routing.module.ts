import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { DashboardComponent } from 'src/app/components/dashboard/pages/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/auth/pages/login/login.component';
import { Error503Component } from 'src/app/components/error/error503/error503.component';
import { DeliversComponent } from 'src/app/components/users/delivers/list/delivers.component';
import { DeliversLocationComponent } from 'src/app/components/users/delivers/location/delivers-location.component';
import { ConfigDeliversComponent } from 'src/app/components/users/delivers/list-config/config-delivers.component';
import { ConfigCompanyComponent } from 'src/app/components/affiliated-company/component/list/config-company.component';
import { ConfigAdminsComponent } from 'src/app/components/users/admins/list-config/config-admins.component';
import { ConfigUpdateDeliverComponent } from 'src/app/components/users/delivers/update/config-update-deliver.component';
import { ConfigUpdateCompaniesComponent } from 'src/app/components/affiliated-company/component/update/config-update-company.component';
import { ConfigUpdateAdminComponent } from 'src/app/components/users/admins/update/config-update-admin.component';
import { HelpComponent } from 'src/app/components/help/page/help.component';
import { UpdateAccountComponent } from 'src/app/components/profile/component/account/update-account.component';
import { ConfigUpdateCompanyComponent } from 'src/app/components/profile/component/company/config-update-company.component';
import { OrderListComponent } from './components/orders/pages/list/list.component';

// Guards
import { AuthGuard } from 'src/app/components/auth/guard/auth/auth.guard';
import { ActiveSessionGuard } from 'src/app/components/auth/guard/active-session/active-session.guard';
import { AdminRoleGuard } from 'src/app/components/auth/guard/admin-role/admim-role.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [ActiveSessionGuard]
    },
    {
        path: 'help',
        component: HelpComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'delivers',
        children: [
            { path: 'location', component: DeliversLocationComponent },
            { path: '', component: DeliversComponent },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'settings',
        children: [
            {
                path: 'account',
                component: UpdateAccountComponent,
            },
            {
                path: 'admins',
                component: ConfigAdminsComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: 'admins/add',
                component: ConfigUpdateAdminComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: 'admins/:id',
                component: ConfigUpdateAdminComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: 'company',
                component: ConfigCompanyComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: 'company-profile',
                component: ConfigUpdateCompanyComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: 'company/add',
                component: ConfigUpdateCompaniesComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: 'company/:id',
                component: ConfigUpdateCompaniesComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: 'delivers',
                component: ConfigDeliversComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: 'delivers/add',
                component: ConfigUpdateDeliverComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: 'delivers/:id',
                component: ConfigUpdateDeliverComponent,
                canActivate: [AdminRoleGuard]
            },
            {
                path: '',
                component: UpdateAccountComponent,
                pathMatch: 'full',
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'orders',
        children: [
            { path: ':status', component: OrderListComponent },
            { path: '', component: OrderListComponent },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'error-503',
        component: Error503Component
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
