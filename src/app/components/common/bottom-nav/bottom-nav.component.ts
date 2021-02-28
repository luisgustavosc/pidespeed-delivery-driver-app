import { Component, OnInit, Input } from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';

@Component({
    selector: 'app-bottom-nav',
    templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent implements OnInit {

    @Input() public data: Array<BottomNavModel>;

    constructor() { }

    ngOnInit() { }

}
