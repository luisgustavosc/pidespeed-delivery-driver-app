import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mat-select-field',
    templateUrl: './mat-select-field.component.html',
    styleUrls: ['./mat-select-field.component.scss'],
})
export class MatSelectFieldComponent implements OnInit {
    @Input() private label: string;
    @Input() private fieldName: string;
    @Input() private form: FormGroup;

    constructor() { }

    ngOnInit() { }

}
