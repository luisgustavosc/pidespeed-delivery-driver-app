import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";
declare var google;

@Component({
    selector: 'app-repartidores-ubicacion',
    templateUrl: './repartidores-ubicacion.component.html',
    styleUrls: ['./repartidores-ubicacion.scss']
})
export class RepartidoresUbicacionComponent implements OnInit {
    private pageTitle: string = 'Ubicaciones';
    private bottomNavData: Array<BottomNavModel> = this.bottomNavService.getRepartidoresBottomNavData();;
    private isRepartidorListActive: boolean = false;

    constructor(private bottomNavService: BottomNavService) { }

    ngOnInit() {
        this.initGoogleMaps();
    }

    toggleList(): void {
        this.isRepartidorListActive = !this.isRepartidorListActive;

        const nav = document.getElementById('repartidores_list');
        const navChild = document.querySelector('#repartidores_list > div');
        document.querySelector('#ver_repartidores_btn').classList.remove('fade-animation-out-right')

        if (this.isRepartidorListActive) {
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

    initGoogleMaps(): void {
        var map, infoWindow;
        infoWindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 11.404351396194043, lng: -69.66383233025513 },
            zoom: 13
        });
    }
}
