import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-floating-button',
    templateUrl: './floating-button.component.html',
    styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent implements OnInit {
    @Input() private bgColor: string = 'bg-red2';
    @Input() private icon: string = 'add';
    @Input() private hasModal: boolean = false;
    @Input()  private formType: string | null;

    constructor() { }

    ngOnInit() { }

}
