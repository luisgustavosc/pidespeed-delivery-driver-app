/**
* @Angular
*/
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

/**
* @Packages
*/
import { JwtModule } from '@auth0/angular-jwt';
import { MaterialModule } from './material.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxImageCompressService } from 'ngx-image-compress';

/**
* @Pipes
*/
import { MesPipe } from './pipes/mes.pipe';
import { HorariosPipe } from './pipes/horarios.pipe';

/**
* @Components
*/
// Pages
import { AppComponent } from 'src/app/app.component';
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

// Common
import { NavComponent } from 'src/app/components/common/nav/nav.component';
import { MobileMenuComponent } from 'src/app/components/common/mobile-menu/mobile-menu.component';
import { CardComponent } from 'src/app/components/common/card/card.component';
import { AdminRowComponent } from 'src/app/components/common/admin-row/admin-row.component';
import { BottomNavComponent } from 'src/app/components/common/bottom-nav/bottom-nav.component';
import { ModalFormComponent } from 'src/app/components/common/modal-form/modal-form.component'
import { DeliverFormComponent } from 'src/app/components/common/forms/deliver-form/deliver-form.component';
import { CompanyFormComponent } from 'src/app/components/common/forms/company-form/company-form.component';
import { AdminFormComponent } from 'src/app/components/common/forms/admin-form/admin-form.component';
import { MatInputFieldComponent } from 'src/app/components/common/forms-components/mat-input-field/mat-input-field.component';
import { MatSelectFieldComponent } from 'src/app/components/common/forms-components/mat-select-field/mat-select-field.component';
import { MatTextareaFieldComponent } from 'src/app/components/common/forms-components/mat-textarea-field/mat-textarea-field.component';
import { FloatingButtonComponent } from 'src/app/components/common/button/floating-button/floating-button.component';
import { SubmitButtonComponent } from 'src/app/components/common/button/submit-button/submit-button.component';
import { InputFileComponent } from 'src/app/components/common/forms-components/input-file/input-file.component';
import { ImageCropperComponent } from 'src/app/components/common/forms-components/image-cropper/image-cropper.component';
import { MatCheckboxComponent } from 'src/app/components/common/forms-components/mat-checkbox/mat-checkbox.component';
import { MatRadioComponent } from 'src/app/components/common/forms-components/mat-radio/mat-radio.component';
import { MatSlideToggleComponent } from 'src/app/components/common/forms-components/mat-slide-toggle/mat-slide-toggle.component';

/**
* @Services
*/
import { AuthService } from 'src/app/services/auth/auth.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { OrdersService } from 'src/app/services/orders/orders.service'
import { ProfileService } from 'src/app/services/profile/profile.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { WebSocketService } from 'src/app/services/webSocket/web-socket.service';
import * as Sentry from '@sentry/angular';

export function jwtTokenGetter() {
    return localStorage.getItem('ACCESS_TOKEN');
}
export function jwtTokenAdminGetter() {
    return localStorage.getItem('TOKEN_ADMIN');
}
@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent,
        Error503Component,
        NavComponent,
        MobileMenuComponent,
        DeliversComponent,
        CardComponent,
        BottomNavComponent,
        DeliversLocationComponent,
        ConfigDeliversComponent,
        ConfigCompanyComponent,
        ConfigAdminsComponent,
        AdminRowComponent,
        MesPipe,
        HorariosPipe,
        ModalFormComponent,
        CompanyFormComponent,
        DeliverFormComponent,
        AdminFormComponent,
        MatInputFieldComponent,
        MatSelectFieldComponent,
        MatTextareaFieldComponent,
        FloatingButtonComponent,
        SubmitButtonComponent,
        ConfigUpdateDeliverComponent,
        ConfigUpdateCompaniesComponent,
        ConfigUpdateAdminComponent,
        HelpComponent,
        InputFileComponent,
        ImageCropperComponent,
        MatCheckboxComponent,
        MatRadioComponent,
        MatSlideToggleComponent
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
    exports: [ MaterialModule ],
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
        NgxImageCompressService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
