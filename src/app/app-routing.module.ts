import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Componentes
import { DashboardComponent } from "src/app/components/pages/dashboard/dashboard.component";
import { LoginComponent } from "src/app/components/pages/login/login.component";
import { Error503Component } from "src/app/components/pages/error503/error503.component";
import { RepartidoresComponent } from "src/app/components/pages/repartidores/repartidores.component";
import { RepartidoresUbicacionComponent } from "src/app/components/pages/repartidores-ubicacion/repartidores-ubicacion.component";
import { ConfigRepartidoresComponent } from "src/app/components/pages/config.repartidores/config.repartidores.component";
import { ConfigEmpresasComponent } from "src/app/components/pages/config-empresas/config-empresas.component";

// Servicio de bloqueo de rutas
import { AuthGuard } from "src/app/guards/auth/auth.guard";
import { SesionActivaGuard } from "src/app/guards/sesion-activa/sesion-activa.guard";

const routes: Routes = [
    {
        path: "",
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "repartidores",
        component: RepartidoresComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "repartidores/ubicacion",
        component: RepartidoresUbicacionComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "configuracion/repartidores",
        component: ConfigRepartidoresComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "configuracion/empresas",
        component: ConfigEmpresasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "configuracion/administradores",
        component: ConfigRepartidoresComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "error503",
        component: Error503Component
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
