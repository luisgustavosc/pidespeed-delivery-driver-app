import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { FormService } from "src/app/services/form/form.service";

@Component({
    selector: 'app-repartidor-form',
    templateUrl: './repartidor-form.component.html',
    styleUrls: ['./repartidor-form.component.scss'],
})
export class RepartidorFormComponent implements OnInit {
    private formGroup: FormGroup;

    constructor(private fb: FormBuilder, private formService: FormService) { }

    ngOnInit() {
        this.formGroup = this.fb.group({
            name: ["", [
                Validators.required,
                Validators.pattern(this.formService.getSpanishLettersPattern())
            ]],
            last_name: ["", [
                Validators.required,
                Validators.pattern(this.formService.getSpanishLettersPattern())
            ]],
            email: ["", [
                Validators.required,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(this.formService.getEmailPattern())
                ]),
            ]],
            phone: ["", [
                Validators.required,
                Validators.maxLength(11),
                Validators.minLength(11),
                Validators.pattern(this.formService.getNumericPattern())
            ]],
            username: ["", [
                Validators.required,
                Validators.pattern(this.formService.getUsernamePattern()),
                Validators.minLength(4),
                Validators.maxLength(20)
            ]],
            password: ["", [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20)
            ]],
            image: ["", [Validators.required]],
            isActive: [""],
        });
    }
}
