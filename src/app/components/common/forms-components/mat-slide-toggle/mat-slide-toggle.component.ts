import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mat-slide-toggle',
    templateUrl: './mat-slide-toggle.component.html',
})
export class MatSlideToggleComponent implements OnInit {
    @Input() private label: string;
    @Input() private fieldName: string;
    @Input() private form: FormGroup;

    constructor() { }

    ngOnInit() { }

}
