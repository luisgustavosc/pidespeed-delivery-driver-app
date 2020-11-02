import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'app-mat-input-field',
    templateUrl: './mat-input-field.component.html',
    styleUrls: ['./mat-input-field.component.scss'],
})
export class MatInputFieldComponent implements OnInit {
    @Input() private label: string;
    @Input() private fieldName: string;
    @Input() private form: FormGroup;
    @Input() private inputType: string = 'text';
    @Input() private InputModeType?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' = null;
    @Input() private maxLength?: number = null;
    @Input() private minLength?: number = null;

    // Only use for Password Type
    private isPasswordVisible: boolean = false;
    private isPasswordMode: boolean = false;

    constructor() { }

    ngOnInit() {
        if (this.inputType === 'password') {
            this.isPasswordMode = true;
        }
    }

    private updatePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;

        if (this.isPasswordVisible) {
            this.inputType = 'text';
        } else {
            this.inputType = 'password';
        }
    }

}
