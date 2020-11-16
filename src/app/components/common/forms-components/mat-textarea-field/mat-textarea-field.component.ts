import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mat-textarea-field',
    templateUrl: './mat-textarea-field.component.html',
    styleUrls: ['./mat-textarea-field.component.scss'],
})
export class MatTextareaFieldComponent implements OnInit {
    @Input() private label: string;
    @Input() private fieldName: string;
    @Input() private form: FormGroup;
    @Input() private maxLength: number =  null;

    constructor() { }

    ngOnInit() { }

}
