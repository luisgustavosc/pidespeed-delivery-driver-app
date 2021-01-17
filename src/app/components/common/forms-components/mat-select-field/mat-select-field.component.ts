import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectOptions } from 'src/app/model/matSelectOptions';
import { MatSelectOptionsGroup } from 'src/app/model/matSelectOptionsGroup';

@Component({
    selector: 'app-mat-select-field',
    templateUrl: './mat-select-field.component.html',
})
export class MatSelectFieldComponent implements OnInit {
    @Input() private label: string;
    @Input() private fieldName: string;
    @Input() private form: FormGroup;
    @Input() private options: Array<MatSelectOptions>;
    @Input() private optionsGroup: Array<MatSelectOptionsGroup>;
    @Input() private optionSelected: string = null;
    @Input() private isMultiple: boolean = false;
    @Input() private isOptionsPerGroup: boolean = false;
    @Input() private maxLimitToChoose: number | null = null;

    constructor() { }

    ngOnInit() {
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
