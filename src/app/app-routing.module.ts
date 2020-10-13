import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Componentes
import { DashboardComponent } from "src/app/components/dashboard/dashboard.component";
import { LoginComponent } from "src/app/components/login/login.component";
import { Error503Component } from "./components/error503/error503.component";

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
        component: LoginComponent
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
