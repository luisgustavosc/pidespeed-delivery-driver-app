import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
})
export class HelpComponent implements OnInit {
    public pageTitle: string = 'Ayuda';

    constructor() { }

    ngOnInit() { }

}
