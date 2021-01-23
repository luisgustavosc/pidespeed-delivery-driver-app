import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from "src/app/model/bottomNav";
import { BottomNavService } from "src/app/services/bottomNav/bottom-nav.service";
declare var google;

@Component({
    selector: 'app-delivers-location',
    templateUrl: './delivers-location.component.html',
    styleUrls: ['./delivers-location.scss']
})
export class DeliversLocationComponent implements OnInit {
    private pageTitle: string = 'Ubicaciones';
    private bottomNavData: Array<BottomNavModel> = this.bottomNavService.getDeliverBottomNavData();;
    private isDeliverListActive: boolean = false;

    constructor(private bottomNavService: BottomNavService) { }

    ngOnInit() {
        this.initGoogleMaps();
    }

    toggleList(): void {
        this.isDeliverListActive = !this.isDeliverListActive;

        const nav = document.getElementById('delivers_list');
        const navChild = document.querySelector('#delivers_list > div');
        document.querySelector('#delivers_btn').classList.remove('fade-animation-out-right')

        if (this.isDeliverListActive) {
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
