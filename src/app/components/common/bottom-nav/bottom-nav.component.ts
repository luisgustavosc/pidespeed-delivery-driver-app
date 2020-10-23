import { Component, OnInit, Input } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";

@Component({
    selector: 'app-bottom-nav',
    templateUrl: './bottom-nav.component.html',
    styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnInit {

    @Input() private data: Array<BottomNavModel>;

    constructor() { }

    ngOnInit() { }

}
