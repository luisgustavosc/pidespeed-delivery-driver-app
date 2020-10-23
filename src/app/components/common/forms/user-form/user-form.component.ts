import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    private formGroup = new FormGroup({
        name: new FormControl("", Validators.required),
        last_name: new FormControl("", Validators.required),
        role: new FormControl("", Validators.required),
        username: new FormControl(""),
        password: new FormControl("", Validators.required),
        image: new FormControl("")
    });

    constructor() { }

    ngOnInit() { }

}
