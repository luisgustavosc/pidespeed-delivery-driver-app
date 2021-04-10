import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mat-slide-toggle',
    templateUrl: './mat-slide-toggle.component.html',
})
export class MatSlideToggleComponent implements OnInit {
    @Input() public label: string;
    @Input() public fieldName: string;
    @Input() public form: FormGroup;

    constructor() { }

    ngOnInit() { }

}
