import { Component, OnInit } from '@angular/core';
import { BottomNavModel } from 'src/app/model/bottomNav';
import { BottomNavService } from 'src/app/services/bottomNav/bottom-nav.service';
declare var google;

@Component({
    selector: 'app-delivers-location',
    templateUrl: './delivers-location.component.html',
    styleUrls: ['./delivers-location.scss']
})
export class DeliversLocationComponent implements OnInit {
    public pageTitle = 'Ubicaciones';
    public bottomNavData: Array<BottomNavModel> = this.bottomNavService.getDeliverBottomNavData();;
    public isDeliverListActive = false;

    constructor(private bottomNavService: BottomNavService) { }

    ngOnInit() {
        this.initGoogleMaps();
    }

    toggleList(): void {
        this.isDeliverListActive = !this.isDeliverListActive;

        const nav = document.getElementById('toggle_list');
        const navChild = document.querySelector('#toggle_list > div');
        document.querySelector('#toggle_list_btn').classList.remove('fade-animation-out-right')

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
        const infoWindow = new google.maps.InfoWindow();
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 11.404351396194043, lng: -69.66383233025513 },
            zoom: 13
        });
    }
}
