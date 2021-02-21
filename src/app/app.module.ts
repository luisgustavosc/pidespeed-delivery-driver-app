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
import { DashboardComponent } from 'src/app/components/dashboard/pages/dashboard/dashboard.component';
import { LoginComponent } from 'src/app/components/auth/pages/login/login.component';
import { Error503Component } from 'src/app/components/error/error503/error503.component';
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
import { DeliverFormComponent } from 'src/app/components/forms/pages/deliver-form/deliver-form.component';
import { CompanyFormComponent } from 'src/app/components/forms/pages/company-form/company-form.component';
import { AdminFormComponent } from 'src/app/components/forms/pages/admin-form/admin-form.component';
import { MatInputFieldComponent } from 'src/app/components/forms/form-components/mat-input-field/mat-input-field.component';
import { MatSelectFieldComponent } from 'src/app/components/forms/form-components/mat-select-field/mat-select-field.component';
import { MatTextareaFieldComponent } from 'src/app/components/forms/form-components/mat-textarea-field/mat-textarea-field.component';
import { SubmitButtonComponent } from 'src/app/components/forms/form-components/submit-button/submit-button.component';
import { InputFileComponent } from 'src/app/components/forms/form-components/input-file/input-file.component';
import { ImageCropperComponent } from 'src/app/components/forms/form-components/image-cropper/image-cropper.component';
import { MatCheckboxComponent } from 'src/app/components/forms/form-components/mat-checkbox/mat-checkbox.component';
import { MatRadioComponent } from 'src/app/components/forms/form-components/mat-radio/mat-radio.component';
import { MatSlideToggleComponent } from 'src/app/components/forms/form-components/mat-slide-toggle/mat-slide-toggle.component';
import { FloatingButtonComponent } from 'src/app/components/common/button/floating-button/floating-button.component';

/**
* @Services
*/
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { DashboardService } from 'src/app/components/dashboard/services/dashboard/dashboard.service';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { WebSocketService } from 'src/app/services/webSocket/web-socket.service';
import * as Sentry from '@sentry/angular';
import { PageLoaderComponent } from './components/common/page-loader/page-loader.component';

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
        MatSlideToggleComponent,
        PageLoaderComponent,
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
        ProfileService,
        WebSocketService,
        NgxImageCompressService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
