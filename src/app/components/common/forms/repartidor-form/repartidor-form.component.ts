import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from "@angular/forms";

@Component({
    selector: 'app-repartidor-form',
    templateUrl: './repartidor-form.component.html',
    styleUrls: ['./repartidor-form.component.scss'],
})
export class RepartidorFormComponent implements OnInit {
    private formGroup = new FormGroup({
        name: new FormControl("", Validators.required),
        last_name: new FormControl("", Validators.required),
        username: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required),
        image: new FormControl("", Validators.required),
        isActive: new FormControl("", Validators.required),
    });

    constructor() { }

    ngOnInit() { }

}
