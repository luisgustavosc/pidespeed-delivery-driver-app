import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectOptions } from 'src/app/model/matSelectOptions';
import { MatSelectOptionsGroup } from 'src/app/model/matSelectOptionsGroup';

@Component({
    selector: 'app-mat-select-field',
    templateUrl: './mat-select-field.component.html',
})
export class MatSelectFieldComponent implements OnInit {
    @Input() public label: string;
    @Input() public fieldName: string;
    @Input() public form: FormGroup;
    @Input() public options: Array<MatSelectOptions>;
    @Input() public optionsGroup: Array<MatSelectOptionsGroup>;
    @Input() public optionSelected: any = null;
    @Input() public isMultiple: boolean = false;
    @Input() public isOptionsPerGroup: boolean = false;
    @Input() public maxLimitToChoose: number | null = null;

    constructor() { }

    ngOnInit() {
        if (this.optionSelected) {
            this.form.get(this.fieldName).setValue(this.optionSelected);
        }

        // Examples
        /*
        this.options = [
            {
                'title' : 'juan',
                'value': '2'
            },
            {
                'title' : 'juan',
                'value': 'pedro'
            },
            {
                'title' : 'juan',
                'value': 'pedro'
            }
        ]

        this.optionsGroup = [
            {
                title: 'Grupo 1',
                options: this.options
            },
            {
                title: 'Grupo 2',
                options: this.options
            },
            {
                title: 'Grupo 3',
                options: this.options
            }
        ]*/
    }

}
