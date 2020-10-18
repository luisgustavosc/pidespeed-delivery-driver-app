/**
* Angular
*/
import { APP_INITIALIZER, ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";

/**
* Packages
*/
import { JwtModule } from "@auth0/angular-jwt";
import { MaterialModule } from "./material.module";
import { ImageCropperModule } from "ngx-image-cropper";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { NgxImageCompressService } from 'ngx-image-compress';

/**
* Pipes
*/
import { MesPipe } from "./pipes/mes.pipe";
import { HorariosPipe } from "./pipes/horarios.pipe";

/**
* Componentes
*/
// Pages
import { AppComponent } from "src/app/app.component";
import { DashboardComponent } from "src/app/components/pages/dashboard/dashboard.component";
import { LoginComponent } from "src/app/components/pages/login/login.component";
import { Error503Component } from "src/app/components/pages/error503/error503.component";
import { RepartidoresComponent } from "src/app/components/pages/repartidores/repartidores.component";
import { RepartidoresUbicacionComponent } from "src/app/components/pages/repartidores-ubicacion/repartidores-ubicacion.component";
import { ConfigRepartidoresComponent } from "src/app/components/pages/config.repartidores/config.repartidores.component";
import { ConfigEmpresasComponent } from "src/app/components/pages/config-empresas/config-empresas.component";
import { ConfigAdminsComponent } from "src/app/components/pages/config-admins/config-admins.component";
// Common
import { NavComponent } from "src/app/components/common/nav/nav.component";
import { MobileMenuComponent } from "src/app/components/common/mobile-menu/mobile-menu.component";
import { CardComponent } from "src/app/components/common/card/card.component";
import { UserRowComponent } from "src/app/components/common/user-row/user-row.component";
import { BottomNavComponent } from "src/app/components/common/bottom-nav/bottom-nav.component";

/**
* Servicios
*/
import { AuthService } from "src/app/services/auth/auth.service";
import { DashboardService } from "src/app/services/dashboard/dashboard.service";
import { InvoiceService } from "src/app/services/invoice/invoice.service";
import { OrdersService } from "src/app/services/orders/orders.service"
import { ProfileService } from "src/app/services/profile/profile.service";
import { ProductosService } from "src/app/services/productos/productos.service";
import { WebSocketService } from "src/app/services/webSocket/web-socket.service";
import * as Sentry from '@sentry/angular';

export function jwtTokenGetter() {
    return localStorage.getItem("ACCESS_TOKEN");
}
export function jwtTokenAdminGetter() {
    return localStorage.getItem("TOKEN_ADMIN");
}
@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        Error503Component,
        NavComponent,
        MobileMenuComponent,
        RepartidoresComponent,
        CardComponent,
        BottomNavComponent,
        RepartidoresUbicacionComponent,
        ConfigRepartidoresComponent,
        ConfigEmpresasComponent,
        ConfigAdminsComponent,
        UserRowComponent,
        MesPipe,
        HorariosPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        NgxMaterialTimepickerModule,
        CommonModule,
        FormsModule,
        ImageCropperModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: jwtTokenGetter
            }
        }),
        JwtModule.forRoot({
            config: {
                tokenGetter: jwtTokenAdminGetter
            }
        })
    ],
    providers: [
        // {
        //     provide: ErrorHandler,
        //     useValue: Sentry.createErrorHandler({
        //         showDialog: true,
        //     }),
        // },
        // {
        //     provide: Sentry.TraceService,
        //     deps: [Router],
        // },
        // {
        //     provide: APP_INITIALIZER,
        //     useFactory: () => () => {},
        //     deps: [Sentry.TraceService],
        //     multi: true,
        // },
        AuthService,
        DashboardService,
        InvoiceService,
        OrdersService,
        ProfileService,
        ProductosService,
        WebSocketService,
        NgxImageCompressService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
