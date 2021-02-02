import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Componentes
import { DashboardComponent } from 'src/app/components/pages/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/pages/login/login.component';
import { Error503Component } from 'src/app/components/pages/error503/error503.component';
import { DeliversComponent } from 'src/app/components/pages/delivers/list/delivers.component';
import { DeliversLocationComponent } from 'src/app/components/pages/delivers/location/delivers-location.component';
import { ConfigDeliversComponent } from 'src/app/components/pages/config-delivers/config-delivers.component';
import { ConfigCompanyComponent } from 'src/app/components/pages/config-company/config-company.component';
import { ConfigAdminsComponent } from 'src/app/components/pages/config-admins/config-admins.component';
import { ConfigUpdateDeliverComponent } from 'src/app/components/pages/config-update/config-update-deliver/config-update-deliver.component';
import { ConfigUpdateCompaniesComponent } from 'src/app/components/pages/config-update/config-update-company/config-update-company.component';
import { ConfigUpdateAdminComponent } from 'src/app/components/pages/config-update/config-update-admin/config-update-admin.component';
import { HelpComponent } from 'src/app/components/pages/help/help.component';

// Servicio de bloqueo de rutas
import { AuthGuard } from 'src/app/guards/auth/auth.guard';
import { ActiveSessionGuard } from 'src/app/guards/active-session/active-session.guard';

// TODO: revisar. Comentado guard por un error en el navegador
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
        component: DeliversComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'delivers/location',
        component: DeliversLocationComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/delivers',
        component: ConfigDeliversComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/company',
        component: ConfigCompanyComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/admins',
        component: ConfigAdminsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/delivers/add',
        component: ConfigUpdateDeliverComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/company/add',
        component: ConfigUpdateCompaniesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/admins/add',
        component: ConfigUpdateAdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/delivers/:id',
        component: ConfigUpdateDeliverComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/company/:id',
        component: ConfigUpdateCompaniesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'settings/admins/:id',
        component: ConfigUpdateAdminComponent,
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
