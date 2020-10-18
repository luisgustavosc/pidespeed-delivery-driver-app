import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-repartidores',
    templateUrl: './repartidores.component.html',
    styleUrls: ['./repartidores.component.scss'],
})
export class RepartidoresComponent implements OnInit {
    pageTitle = 'Repartidores';
    bottomNavData: Array<Object> = [
        {
            title: 'Repartidores',
            icon: 'groups',
            link: '/repartidores'
        },
        {
            title: 'Ubicación',
            icon: 'near_me',
            link: '/repartidores/ubicacion'
        }
    ];

    constructor() { }

    ngOnInit() { }

}
