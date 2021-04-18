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
import { ImagePipe } from './pipes/image.pipe';

/**
 * @Components
 */
// Pages
import { AppComponent } from 'src/app/app.component';

import { DashboardComponent } from 'src/app/components/dashboard/pages/dashboard/dashboard.component';
// Auth
import { LoginComponent } from 'src/app/components/auth/pages/login/login.component';

// Errors
import { Error503Component } from 'src/app/components/error/error503/error503.component';

// Delivers
import { DeliversComponent } from 'src/app/components/users/delivers/list/delivers.component';
import { DeliversLocationComponent } from 'src/app/components/users/delivers/location/delivers-location.component';
import { ConfigUpdateDeliverComponent } from 'src/app/components/users/delivers/update/config-update-deliver.component';
import { ConfigDeliversComponent } from 'src/app/components/users/delivers/list-config/config-delivers.component';
import { DeliverFormComponent } from 'src/app/components/forms/pages/deliver-form/deliver-form.component';

// Affiliated company
import { ConfigCompanyComponent } from 'src/app/components/affiliated-company/component/list/config-company.component';
import { ConfigUpdateCompaniesComponent } from 'src/app/components/affiliated-company/component/update/config-update-company.component';
import { CompanyFormComponent } from 'src/app/components/forms/pages/affiliated-company-form/company-form.component';

// Admins
import { ConfigAdminsComponent } from 'src/app/components/users/admins/list-config/config-admins.component';
import { ConfigUpdateAdminComponent } from 'src/app/components/users/admins/update/config-update-admin.component';
import { AdminFormComponent } from 'src/app/components/forms/pages/admin-form/admin-form.component';

// Help
import { HelpComponent } from 'src/app/components/help/page/help.component';

// Profile
import { ConfigUpdateCompanyComponent } from 'src/app/components/profile/component/company/config-update-company.component';
import { UpdateAccountComponent } from 'src/app/components/profile/component/account/update-account.component';
import { CompanyProfileFormComponent } from './components/forms/pages/company-profile-form/company-profile-form.component';

// Orders
import { OrderListComponent } from './components/orders/pages/list/list.component';
import { OrderDetailComponent } from './components/orders/pages/order-detail/order-detail.component';

// Form Components
import { MatInputFieldComponent } from 'src/app/components/forms/form-components/mat-input-field/mat-input-field.component';
import { MatSelectFieldComponent } from 'src/app/components/forms/form-components/mat-select-field/mat-select-field.component';
import { MatTextareaFieldComponent } from 'src/app/components/forms/form-components/mat-textarea-field/mat-textarea-field.component';
import { SubmitButtonComponent } from 'src/app/components/forms/form-components/submit-button/submit-button.component';
import { InputFileComponent } from 'src/app/components/forms/form-components/input-file/input-file.component';
import { ImageCropperComponent } from 'src/app/components/forms/form-components/image-cropper/image-cropper.component';
import { MatCheckboxComponent } from 'src/app/components/forms/form-components/mat-checkbox/mat-checkbox.component';
import { MatRadioComponent } from 'src/app/components/forms/form-components/mat-radio/mat-radio.component';
import { MatSlideToggleComponent } from 'src/app/components/forms/form-components/mat-slide-toggle/mat-slide-toggle.component';

// Common
import { NavComponent } from 'src/app/components/common/nav/nav.component';
import { MobileMenuComponent } from 'src/app/components/common/mobile-menu/mobile-menu.component';
import { CardComponent } from 'src/app/components/common/card/card.component';
import { AdminRowComponent } from 'src/app/components/common/admin-row/admin-row.component';
import { BottomNavComponent } from 'src/app/components/common/bottom-nav/component/bottom-nav.component';
import { ModalFormComponent } from 'src/app/components/common/modal-form/modal-form.component'
import { FloatingButtonComponent } from 'src/app/components/common/button/floating-button/floating-button.component';
import { PageLoaderComponent } from './components/common/page-loader/page-loader.component';
import { ActionButtonComponent } from './components/common/button/action-button/action-button.component';

/**
 * @Services
 */
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';
import { DashboardService } from 'src/app/components/dashboard/services/dashboard/dashboard.service';
import { CompanyProfileService } from 'src/app/components/profile/service/companyProfile.service';
import { WebSocketService } from 'src/app/services/webSocket/web-socket.service';
import { ResolveFormComponentService } from 'src/app/components/forms/services/resolve-component/resolveFormComponent.service';
import * as Sentry from '@sentry/angular';

/**
 * @Directive
 */
import { AppFormDirective } from './components/forms/directive/directive';
import { RolesService } from './components/users/services/roles/roles.service';

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
        ImagePipe,
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
        UpdateAccountComponent,
        ConfigUpdateCompanyComponent,
        CompanyProfileFormComponent,
        OrderListComponent,
        ActionButtonComponent,
        OrderDetailComponent,
        AppFormDirective,
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
        CompanyProfileService,
        WebSocketService,
        NgxImageCompressService,
        ResolveFormComponentService,
        RolesService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
