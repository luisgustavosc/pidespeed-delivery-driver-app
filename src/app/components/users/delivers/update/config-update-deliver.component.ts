import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResolveFormComponentService } from 'src/app/components/forms/services/resolve-component/resolveFormComponent.service';
import { AppFormDirective } from 'src/app/components/forms/directive/directive';

@Component({
    selector: 'app-config-update-deliver',
    templateUrl: '../../../forms/config-template/config-update.component.html',
})
export class ConfigUpdateDeliverComponent implements OnInit {
    @ViewChild(AppFormDirective, { static: true })
    appFormDirective: AppFormDirective;

    public formType: string = ResolveFormComponentService.DELIVER_FORM_TYPE;
    public configId: string | null = this.activeRoute.snapshot.params.id || null;
    public isFormLoading = false;
    public pageTitle: string = this.configId ? 'Editar Username' : 'Agregar Repartidor';
    public goBackUrl = '/settings/delivers';

    constructor(
        private activeRoute: ActivatedRoute,
        private resolveForm: ResolveFormComponentService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        const viewContainerRef = this.appFormDirective.viewContainerRef;
        this.resolveForm.loadComponent(
            viewContainerRef,
            this.formType,
            {
                isFormLoading: this.isFormLoading,
                configId: this.configId,
            }
        );
    }
}
