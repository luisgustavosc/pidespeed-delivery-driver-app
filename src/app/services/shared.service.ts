import { Injectable } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    public configBottomNavData: Array<BottomNavModel> = [
        {
            title: 'Repartidores',
            icon: 'groups',
            link: '/configuracion/repartidores'
        },
        {
            title: 'Empresas',
            icon: 'store',
            link: '/configuracion/empresas'
        },
        {
            title: 'Admins',
            icon: 'supervisor_account',
            link: '/configuracion/administradores'
        }
    ];

    public repartidoresBottomNavData: Array<BottomNavModel> = [
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

    getConfigBottomNavData() {
        return this.configBottomNavData;
    }

    getRepartidoresBottomNavData() {
        return this.repartidoresBottomNavData;
    }
}
