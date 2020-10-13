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
import { Router } from "@angular/router";

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
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HeaderComponent } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { LoginComponent } from "./components/login/login.component";
import { Error503Component } from "./components/error503/error503.component";

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
        HeaderComponent,
        SidebarComponent,
        LoginComponent,
        MesPipe,
        HorariosPipe
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
