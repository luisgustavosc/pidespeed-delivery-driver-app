import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-config-empresas',
    templateUrl: './config-empresas.component.html',
    styleUrls: ['./config-empresas.component.scss'],
})
export class ConfigEmpresasComponent implements OnInit {
    pageTitle: string = 'Configuración de Empresas';

    constructor() { }

    ngOnInit() { }

}
