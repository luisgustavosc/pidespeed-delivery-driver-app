import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";
import { RepartidoresService } from 'src/app/services/repartidores/repartidores.service';
import { ActionService } from 'src/app/services/action/action.service';
@Component({
    selector: 'app-repartidores',
    templateUrl: './repartidores.component.html',
})
export class RepartidoresComponent implements OnInit {
    private pageTitle: string = 'Repartidores';
    private bottomNavData: Array<BottomNavModel> = this.bottomNavService.getRepartidoresBottomNavData();
    repartidores;
    constructor(private bottomNavService: BottomNavService, private repartidoresService: RepartidoresService , private actionService: ActionService) { }

    ngOnInit() {
        this.listRepartidores();
    }

    listRepartidores() {
        this.repartidoresService.listRepartidores().subscribe(repartidores => {
            this.repartidores = repartidores;
            console.log(repartidores)
        }, err => {
            //this.isLoading = false;
            this.actionService.getErrorSwal();
        })
    }

}
