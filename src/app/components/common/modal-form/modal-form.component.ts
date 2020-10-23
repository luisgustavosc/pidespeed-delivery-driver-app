import { Component, OnInit, Input } from '@angular/core';
import { FormService } from "src/app/services/form/form.service";

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
    @Input() private formType: string;
    private isRepartidorFormType: boolean;
    private isUserFormType: boolean;
    private isCompanyFormType: boolean;
    private modalTitle: string;
    private modalDescription: string;

    constructor(private formService: FormService) { }

    ngOnInit() {
        this.isRepartidorFormType = this.formService.isRepartidorFormType(this.formType);
        this.isUserFormType = this.formService.isUserFormType(this.formType);
        this.isCompanyFormType = this.formService.isCompanyFormType(this.formType);
    }
}
