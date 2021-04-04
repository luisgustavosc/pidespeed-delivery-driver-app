import { Component, OnInit } from "@angular/core";
import * as moment from 'moment';

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
    public pageTitle: string = 'Inicio';

    constructor(
    ) { }

    ngOnInit() { }

}
