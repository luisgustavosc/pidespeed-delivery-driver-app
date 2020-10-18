import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-config.repartidores',
    templateUrl: './config.repartidores.component.html',
    styleUrls: ['./config.repartidores.component.scss'],
})
export class ConfigRepartidoresComponent implements OnInit {
    pageTitle: string  =  'Configuración de Repartidores';

    constructor() { }

    ngOnInit() { }

}
