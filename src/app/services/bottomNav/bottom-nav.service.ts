import { Injectable } from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';

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

    private ordersBottomNavData: Array<BottomNavModel> = [
        {
            title: 'Pendientes',
            icon: 'pending_actions',
            link: '/orders/to-do'
        },
        {
            title: 'En Proceso',
            icon: 'delivery_dining',
            link: '/orders/progress'
        },
        {
            title: 'Terminadas',
            icon: 'assignment_turned_in',
            link: '/orders/done'
        }
    ];

    constructor() { }

    public getConfigBottomNavData(): Array<BottomNavModel> {
        return this.configBottomNavData;
    }

    public getDeliverBottomNavData(): Array<BottomNavModel> {
        return this.deliverBottomNavData;
    }

    public getOrdersBottomNavData(): Array<BottomNavModel> {
        return this.ordersBottomNavData;
    }
}
