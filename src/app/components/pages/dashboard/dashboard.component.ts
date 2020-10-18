import { Component, OnInit } from "@angular/core";
import { DashboardService } from "src/app/services/dashboard/dashboard.service";
import { ProfileService } from "src/app/services/profile/profile.service";
import { OrdersService } from "src/app/services/orders/orders.service";
import * as moment from 'moment';
import { ProductosService } from "src/app/services/productos/productos.service";
import Swal from "sweetalert2";
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
    protected pageTitle: string = 'Inicio';

    constructor(
        public productosService: ProductosService,
        public dashboardService: DashboardService,
        public profileService: ProfileService,
        public ordersService: OrdersService
    ) { }

    ngOnInit() { }

}
