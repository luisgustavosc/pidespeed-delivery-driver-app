import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-floating-button',
    templateUrl: './floating-button.component.html',
})
export class FloatingButtonComponent implements OnInit {
    @Input() private bgColor: string = 'red2';
    @Input() private icon: string = 'add';
    @Input() private hasModal: boolean = false;
    @Input()  private formType: string | null =  null;
    @Input()  private link: string | null = null;

    constructor() { }

    ngOnInit() { }

}
