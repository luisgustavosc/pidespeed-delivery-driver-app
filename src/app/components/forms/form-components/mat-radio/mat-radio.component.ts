import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectOptions } from 'src/app/model/matSelectOptions';

@Component({
    selector: 'app-mat-radio',
    templateUrl: './mat-radio.component.html',
})
export class MatRadioComponent implements OnInit {
    @Input() public label: string;
    @Input() public fieldName: string;
    @Input() public form: FormGroup;
    @Input() public options: Array<MatSelectOptions>;
    @Input() public optionSelected: any = null;

    constructor() { }

    ngOnInit() {
        this.options = [
            {
                title : 'juan',
                value: '1'
            },
            {
                title : 'juan',
                value: '2'
            },
            {
                title : 'juan',
                value: '3'
            }
        ]
    }
}
