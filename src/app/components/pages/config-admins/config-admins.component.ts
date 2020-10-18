import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-config-admins',
    templateUrl: './config-admins.component.html',
    styleUrls: ['./config-admins.component.scss'],
})
export class ConfigAdminsComponent implements OnInit {
    pageTitle: string = 'Configuración de Administradores';

    constructor() { }

    ngOnInit() { }

}
