import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mat-textarea-field',
    templateUrl: './mat-textarea-field.component.html',
})
export class MatTextareaFieldComponent implements OnInit {
    @Input() public label: string;
    @Input() public fieldName: string;
    @Input() public form: FormGroup;
    @Input() public maxLength: number =  null;

    constructor() { }

    ngOnInit() { }

}
