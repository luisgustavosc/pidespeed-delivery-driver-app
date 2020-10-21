import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-company-form',
    templateUrl: './company-form.component.html',
    styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
    private formGroup = new FormGroup({
        title: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        image: new FormControl("", Validators.required),
        imageLogo: new FormControl("", Validators.required)
    });
    @Output() private formValues: EventEmitter<Object> = new EventEmitter<Object>();

    constructor() { }

    ngOnInit() { }
}
