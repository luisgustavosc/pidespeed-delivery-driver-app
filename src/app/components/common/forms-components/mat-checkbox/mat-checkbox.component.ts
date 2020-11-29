import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mat-checkbox',
    templateUrl: './mat-checkbox.component.html',
})
export class MatCheckboxComponent implements OnInit {
    @Input() private label: string;
    @Input() private fieldName: string;
    @Input() private form: FormGroup;

    constructor() { }

    ngOnInit() { }

}
