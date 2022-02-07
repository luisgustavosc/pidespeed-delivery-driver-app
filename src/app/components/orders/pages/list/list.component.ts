import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/components/common/bottom-nav/service/bottom-nav.service';
import { OrderService } from '../../services/order/order.service';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { DateService } from 'src/app/services/utils/dateService/dates.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
})
export class OrderListComponent implements OnInit {
    public pageTitle = 'Ordenes';
    public bottomNavData: Array<BottomNavModel> = this.bottomNavService.getOrdersBottomNavData();
    public orderStatus: string | null = this.activeRoute.snapshot.params.status || 'to-do';

    public orders = null;
    public activeOrder = null
    public isOrderDetailActive: boolean;
    public defaultImage = 'https://storage.googleapis.com/pidespeed-storage/web/default_user.svg';

    constructor(
        private activeRoute: ActivatedRoute,
        private bottomNavService: BottomNavService,
        private orderService: OrderService,
        private utils: UtilsService,
        private dateService: DateService
    ) { }

    ngOnInit() {
        this.getOrders();
    }

    private toggleOrderDetail(): void {
        this.isOrderDetailActive = !this.isOrderDetailActive;

        const nav = document.getElementById('toggle_list');
        const navChild = document.querySelector('#toggle_list > div');

        if (this.isOrderDetailActive) {
            nav.classList.remove('d-none');
            navChild.classList.add('fade-animation-in-up');
            navChild.classList.remove('fade-animation-out-down');
        } else {
            setTimeout(() => {
                nav.classList.add('d-none');
            }, 200);
            navChild.classList.add('fade-animation-out-down');
            navChild.classList.remove('fade-animation-in-up');
        }
    }

    private getOrders() {
        this.orderService.getAll().subscribe(orders => {
            this.orders = orders;
            console.log(orders);

        }, err => {
            this.utils.getSwalError();
        })
    }

    setActiveOrder(order: object) {
        this.toggleOrderDetail();
        this.activeOrder = order
    }

    getTimeFromCreated(createdAt: string) {
        return this.dateService.getTimeAgo(createdAt);
    }
}
