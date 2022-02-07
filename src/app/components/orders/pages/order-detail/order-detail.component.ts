import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnChanges {
    @Input() order: any = null;

    client: object

    constructor() { }

    ngOnChanges() {
        this.client = this.order && this.order.user
    }

    orderAction = () => {
        console.log('Mover a otro estado');
    }
}
