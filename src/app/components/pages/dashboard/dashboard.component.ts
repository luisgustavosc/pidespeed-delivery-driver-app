import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard/dashboard.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { OrdersService } from "src/app/services/orders/orders.service";
import { ProductosService } from "src/app/services/productos/productos.service";
import * as moment from 'moment';

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
    private pageTitle: string = 'Inicio';

    constructor(
        public productosService: ProductosService,
        public dashboardService: DashboardService,
        public profileService: ProfileService,
        public ordersService: OrdersService
    ) { }

    ngOnInit() { }

}
