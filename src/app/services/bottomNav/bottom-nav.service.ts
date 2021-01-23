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
            link: '/settings/delivers'
        },
        {
            title: 'Empresas',
            icon: 'store',
            link: '/settings/company'
        },
        {
            title: 'Usuarios',
            icon: 'supervisor_account',
            link: '/settings/admins'
        }
    ];

    private deliverBottomNavData: Array<BottomNavModel> = [
        {
            title: 'Repartidores',
            icon: 'groups',
            link: '/delivers'
        },
        {
            title: 'Ubicación',
            icon: 'near_me',
            link: '/delivers/location'
        }
    ];

    constructor() { }

    public getConfigBottomNavData(): Array<BottomNavModel> {
        return this.configBottomNavData;
    }

    public getDeliverBottomNavData(): Array<BottomNavModel> {
        return this.deliverBottomNavData;
    }
}
