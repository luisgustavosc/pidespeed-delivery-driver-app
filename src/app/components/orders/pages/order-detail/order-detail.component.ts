import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
    @Input() order;

    constructor() { }

    ngOnInit() { }

    orderAction = () => {
        console.log('Mover a otro estado');
    }
}
