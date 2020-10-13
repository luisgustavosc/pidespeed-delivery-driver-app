import { Component, OnInit } from '@angular/core';
import { ProfileService } from "../../services/profile/profile.service";
@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {
    empresa: any;

    constructor(public profileService: ProfileService) { }
    ngOnInit() {
        this.empresa = this.profileService.getCurrentUser();
    }
}
