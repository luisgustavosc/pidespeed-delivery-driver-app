import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input() cardType: number;
    @Input() isPidespeedOrder: string;
    @Input() cardTitle?: string = null;
    @Input() cardSubtitle?: string = null;
    @Input() titleTextSize: number = 12;
    @Input() hasActions: boolean = false;

    constructor() { }

    ngOnInit() { }

}
