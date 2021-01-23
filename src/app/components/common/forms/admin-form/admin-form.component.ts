import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-admin-form',
    templateUrl: './admin-form.component.html',
})
export class AdminFormComponent implements OnInit {
    @Output() private formGroupEmitter: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
    @Input() private isFormLoading: boolean = false;

    private formGroup = new FormGroup({
        name: new FormControl('', Validators.required),
        last_name: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        username: new FormControl(''),
        password: new FormControl('', Validators.required),
        image: new FormControl('')
    });

    constructor() { }

    ngOnInit() { }

    onSubmit(form: FormGroup): void {
        this.formGroupEmitter.emit(form);
    }
}
