import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/services/bottomNav/bottom-nav.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
    public pageTitle: string = 'Ordenes';
    public bottomNavData: Array<BottomNavModel> = this.bottomNavService.getOrdersBottomNavData();
    public orderStatus: string | null = this.activeRoute.snapshot.params.status || 'to-do';

    public orders = true;
    public isOrderDetailActive: boolean;

    constructor(
        private activeRoute: ActivatedRoute,
        private bottomNavService: BottomNavService,
    ) { }

    ngOnInit() { }

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

    getActiveOrder(id: string) {
        this.toggleOrderDetail();
        console.log(id);
    }
}
