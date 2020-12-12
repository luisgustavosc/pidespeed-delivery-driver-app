import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
})
export class CompanyFormComponent implements OnInit {
    private formGroup: FormGroup;
    @Input() private isLoading: boolean = false;
    // To export values ​​to a parent component
    @Output() private formGroupEmitter: EventEmitter<FormGroup> = new EventEmitter();

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.formGroup = this.fb.group({
            name: ['', [
                Validators.required,
            ]],
            description: ['', [
                Validators.required,
                Validators.maxLength(60),
            ]],
            image: ['', [Validators.required]],
            isActive: [false],
        });
    }

    onSubmit(form: FormGroup): void {
        this.formGroupEmitter.emit(form);
    }
}
