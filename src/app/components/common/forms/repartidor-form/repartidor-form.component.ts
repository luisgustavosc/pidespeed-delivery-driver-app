import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { FormService } from 'src/app/services/form/form.service';

@Component({
    selector: 'app-repartidor-form',
    templateUrl: './repartidor-form.component.html',
})
export class RepartidorFormComponent implements OnInit {
    @Output() private formGroupEmitter: EventEmitter<any> = new EventEmitter<any>();
    @Input() private isLoading: boolean = false;
    private formGroup: FormGroup;
    private imgResultAfterCompress: string;

    constructor(private fb: FormBuilder, private formService: FormService) { }

    ngOnInit() {
        this.formGroup = this.fb.group({
            name: ['', [
                Validators.required,
                Validators.pattern(this.formService.getSpanishLettersPattern())
            ]],
            last_name: ['', [
                Validators.required,
                Validators.pattern(this.formService.getSpanishLettersPattern())
            ]],
            email: ['', [
                Validators.required,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(this.formService.getEmailPattern())
                ]),
            ]],
            cedula: ['', [
                Validators.required,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(this.formService.getNumericPattern()),
                    Validators.minLength(7),
                    Validators.maxLength(8),
                ]),
            ]],
            phone: ['', [
                Validators.required,
                Validators.maxLength(11),
                Validators.minLength(11),
                Validators.pattern(this.formService.getNumericPattern())
            ]],
            username: ['', [
                Validators.required,
                Validators.pattern(this.formService.getUsernamePattern()),
                Validators.minLength(4),
                Validators.maxLength(20)
            ]],
            password: ['', [
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20)
            ]],
            address: ['', [
                Validators.maxLength(100),
                Validators.pattern(this.formService.getSpanishLettersPattern())
            ]],
            image: ['', [Validators.required]],
            vehicle: ['', [Validators.required]],
            isActive: [''],
        });
    }

    getImageCroppedAndCompressed(image: string): void {
        this.imgResultAfterCompress = image;
    }

    onSubmit(form: FormGroup, image: string): void {
        form.value.image = image;
        this.formGroupEmitter.emit(form);
    }
}
