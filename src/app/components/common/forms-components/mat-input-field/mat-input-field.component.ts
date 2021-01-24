import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mat-input-field',
    templateUrl: './mat-input-field.component.html',
})
export class MatInputFieldComponent implements OnInit {
    @Input() private label: string;
    @Input() private fieldName: string;
    @Input() private form: FormGroup;
    @Input() private inputType: string = 'text';
    @Input() private InputModeType?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' = null;
    @Input() private maxLength?: number = null;
    @Input() private minLength?: number = null;
    @Input() private notBlank: boolean = false;
    @Input() private hint?: string = null;
    private isRequired: boolean;
    // Only use for Password Type
    private isPasswordVisible: boolean = false;
    private isPasswordMode: boolean = false;

    constructor() { }

    ngOnInit() {
        if (this.inputType === 'password') {
            this.isPasswordMode = true;
        }
        this.isRequired = this.form.controls[this.fieldName].errors?.required || false;
    }

    /**
     * Only use for Password Type.
     * Toggle password visibility by clicking on the eye icon
     *
     */
    private updatePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;

        if (this.isPasswordVisible) {
            this.inputType = 'text';
        } else {
            this.inputType = 'password';
        }
    }

    /**
     * Trim field to do not allow to type blank space
     *
     * @param {string} fieldName
     * @param {FormControl} form
     */
    private trimField(fieldName: string, form: FormControl) {
        if (this.notBlank) {
            form.get(fieldName).setValue(form.get(fieldName).value.trim());
        }
    }
}
