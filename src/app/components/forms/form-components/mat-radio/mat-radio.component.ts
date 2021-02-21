import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSelectOptions } from 'src/app/model/matSelectOptions';

@Component({
    selector: 'app-mat-radio',
    templateUrl: './mat-radio.component.html',
})
export class MatRadioComponent implements OnInit {
    @Input() private label: string;
    @Input() private fieldName: string;
    @Input() private form: FormGroup;
    @Input() private options: Array<MatSelectOptions>;

    constructor() { }

    ngOnInit() {
        this.options = [
            {
                'title' : 'juan',
                'value': '1'
            },
            {
                'title' : 'juan',
                'value': '2'
            },
            {
                'title' : 'juan',
                'value': '3'
            }
        ]
    }
}
