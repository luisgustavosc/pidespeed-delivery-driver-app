import { Injectable } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";

@Injectable({
    providedIn: 'root'
})
export class BottomNavService {
    private configBottomNavData: Array<BottomNavModel> = [
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
            title: 'Usuarios',
            icon: 'supervisor_account',
            link: '/configuracion/admins'
        }
    ];

    private repartidoresBottomNavData: Array<BottomNavModel> = [
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

    public getConfigBottomNavData(): Array<BottomNavModel> {
        return this.configBottomNavData;
    }

    public getRepartidoresBottomNavData(): Array<BottomNavModel> {
        return this.repartidoresBottomNavData;
    }
}
