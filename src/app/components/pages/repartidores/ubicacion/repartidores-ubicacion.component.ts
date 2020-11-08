import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-repartidores-ubicacion',
    templateUrl: './repartidores-ubicacion.component.html',
})
export class RepartidoresUbicacionComponent implements OnInit {
    pageTitle = 'Ubicaciones';
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
