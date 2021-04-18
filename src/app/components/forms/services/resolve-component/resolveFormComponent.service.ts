import { Injectable, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Injectable({
    providedIn: 'root'
})
export class ResolveFormComponentService {
    public static readonly AFFILIATED_COMPANY_TYPE: string = 'affiliated_company_form';
    public static readonly DELIVER_FORM_TYPE: string = 'deliver_form';
    public static readonly ADMIN_FORM_TYPE: string = 'admin_form';
    public static readonly IMAGE_CROPPER_TYPE: string = 'image_cropper';
    public static readonly COMPANY_PROFILE_TYPE: string = 'company_profile'

    constructor(
        private cfr: ComponentFactoryResolver,
        private utils: UtilsService,
    ) {}

    async loadComponent(vcr: ViewContainerRef, formType: string, props = {}) {
        const formComponent = await this.getFormComponent(formType);

        vcr.clear();

        const cmpRef = vcr.createComponent(
            this.cfr.resolveComponentFactory(formComponent as any)
        );

        for(const key in props) {
            if (props.hasOwnProperty(key)){
                cmpRef.instance[key] = props[key];
            }
        }

        return cmpRef;
    }

    private async getFormComponent(value: string) {
        const formTypes = await this.getForms();
        const { component, component_name: name } = this.utils.findItemInArrayById(formTypes, value);
        return component[name];
    }

    private async getForms() {
        return [
            {
                _id: ResolveFormComponentService.DELIVER_FORM_TYPE,
                component_name: 'DeliverFormComponent',
                component: await import('../../pages/deliver-form/deliver-form.component'),
            },
            {
                _id: ResolveFormComponentService.AFFILIATED_COMPANY_TYPE,
                component_name:'CompanyFormComponent',
                component: await import('../../pages/affiliated-company-form/company-form.component'),
            },
            {
                _id: ResolveFormComponentService.ADMIN_FORM_TYPE,
                component_name: 'AdminFormComponent',
                component: await import('../../pages/admin-form/admin-form.component'),
            },
            {
                _id: ResolveFormComponentService.COMPANY_PROFILE_TYPE,
                component_name: 'CompanyProfileFormComponent',
                component: await import('../../pages/company-profile-form/company-profile-form.component'),
            },
            {
                _id: ResolveFormComponentService.IMAGE_CROPPER_TYPE,
                component_name: 'ImageCropperComponent',
                component: await import('../../../forms/form-components/image-cropper/image-cropper.component'),
            },
        ];
    }
}
