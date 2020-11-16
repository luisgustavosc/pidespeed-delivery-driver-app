import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
    styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
    private formGroup: FormGroup;

    // To export values ​​to a parent component
    @Output() private formValues: EventEmitter<Object> = new EventEmitter<Object>();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.formGroup = this.fb.group({
            name: ["", [
                Validators.required,
            ]],
            description: ["", [
                Validators.required,
                Validators.maxLength(60),
            ]],
            image: ["", [Validators.required]],
            isActive: [false],
        });
    }
}
