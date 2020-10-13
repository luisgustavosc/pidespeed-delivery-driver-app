import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { LocalNotifications, Network } = Plugins;

@Component({
    selector: 'app-error503',
    templateUrl: './error503.component.html',
    styleUrls: ['./error503.component.scss'],
})
export class Error503Component implements OnInit {

    lazyloader = false;

    constructor() { }

    ngOnInit() { }

    async comprobarConexion() {
        this.lazyloader = true;
        let status = await Network.getStatus();
        if (status.connected) {
            window.history.back();
        } else {
            this.lazyloader = false;
        }
        console.log('status network', status);
    }

}
