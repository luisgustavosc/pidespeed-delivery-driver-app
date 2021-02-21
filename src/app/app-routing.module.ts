import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { DashboardComponent } from 'src/app/components/dashboard/pages/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/auth/pages/login/login.component';
import { Error503Component } from 'src/app/components/error/error503/error503.component';
import { DeliversComponent } from 'src/app/components/pages/delivers/list/delivers.component';
import { DeliversLocationComponent } from 'src/app/components/pages/delivers/location/delivers-location.component';
import { ConfigDeliversComponent } from 'src/app/components/pages/config-delivers/config-delivers.component';
import { ConfigCompanyComponent } from 'src/app/components/pages/config-company/config-company.component';
import { ConfigAdminsComponent } from 'src/app/components/pages/config-admins/config-admins.component';
import { ConfigUpdateDeliverComponent } from 'src/app/components/pages/config-update/config-update-deliver/config-update-deliver.component';
import { ConfigUpdateCompaniesComponent } from 'src/app/components/pages/config-update/config-update-affiliated-company/config-update-company.component';
import { ConfigUpdateAdminComponent } from 'src/app/components/pages/config-update/config-update-admin/config-update-admin.component';
import { HelpComponent } from 'src/app/components/pages/help/help.component';
import { UpdateAccountComponent } from './components/pages/config-update/update-account/update-account.component';
import { ConfigUpdateCompanyComponent } from './components/pages/config-update/config-update-company-profile/config-update-company.component';
import { ListComponent } from './components/orders/pages/list/list.component';

// Servicio de bloqueo de rutas
import { AuthGuard } from 'src/app/components/auth/guard/auth/auth.guard';
import { ActiveSessionGuard } from 'src/app/components/auth/guard/active-session/active-session.guard';

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
            { path: 'account', component: UpdateAccountComponent },
            { path: 'admins', component: ConfigAdminsComponent },
            { path: 'admins/add', component: ConfigUpdateAdminComponent },
            { path: 'admins/:id', component: ConfigUpdateAdminComponent },
            { path: 'company', component: ConfigCompanyComponent },
            { path: 'company-profile', component: ConfigUpdateCompanyComponent },
            { path: 'company/add', component: ConfigUpdateCompaniesComponent },
            { path: 'company/:id', component: ConfigUpdateCompaniesComponent },
            { path: 'delivers', component: ConfigDeliversComponent },
            { path: 'delivers/add', component: ConfigUpdateDeliverComponent },
            { path: 'delivers/:id', component: ConfigUpdateDeliverComponent },
            { path: '', component: UpdateAccountComponent, pathMatch: 'full'}
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'orders',
        children: [
            { path: ':status', component: ListComponent },
            { path: '', component: ListComponent },
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
