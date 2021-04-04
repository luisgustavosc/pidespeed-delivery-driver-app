import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mat-input-field',
    templateUrl: './mat-input-field.component.html',
})
export class MatInputFieldComponent implements OnInit {
    @Input() public label: string;
    @Input() public fieldName: string;
    @Input() public form: FormGroup;
    @Input() public inputType: string = 'text';
    @Input() public InputModeType?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' = null;
    @Input() public maxLength?: number = null;
    @Input() public minLength?: number = null;
    @Input() public notBlank: boolean = false;
    @Input() public hint?: string = null;
    public isRequired: boolean;
    // Only use for Password Type
    public isPasswordVisible: boolean = false;
    public isPasswordMode: boolean = false;

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
    updatePasswordVisibility() {
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
    trimField(fieldName: string, form: FormGroup) {
        if (this.notBlank) {
            form.get(fieldName).setValue(form.get(fieldName).value.trim());
        }
    }
}
