import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-floating-button',
    templateUrl: './floating-button.component.html',
})
export class FloatingButtonComponent implements OnInit {
    @Input() public bgColor: string = 'red2';
    @Input() public icon: string = 'add';
    @Input() public hasModal: boolean = false;
    @Input() public formType: string | null =  null;
    @Input() public link: string | null = null;

    constructor() { }

    ngOnInit() { }

}
