import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-floating-button',
    templateUrl: './floating-button.component.html',
})
export class FloatingButtonComponent implements OnInit {
    @Input() public bgColor = 'red2';
    @Input() public icon = 'add';
    @Input() public hasModal = false;
    @Input() public formType: string | null =  null;
    @Input() public link: string | null = null;

    constructor() { }

    ngOnInit() { }

}
