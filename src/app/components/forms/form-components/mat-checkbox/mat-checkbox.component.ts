import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mat-checkbox',
    templateUrl: './mat-checkbox.component.html',
})
export class MatCheckboxComponent implements OnInit {
    @Input() public label: string;
    @Input() public fieldName: string;
    @Input() public form: FormGroup;

    constructor() { }

    ngOnInit() { }

}
