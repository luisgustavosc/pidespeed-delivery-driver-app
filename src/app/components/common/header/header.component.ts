import { Component, OnInit, NgModule } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/services/profile/profile.service";
import Swal from "sweetalert2";

/* @NgModule({
  declarations: [ HeaderComponent ],
  exports: [ HeaderComponent ]
}) */

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  empresa:any;

  public URL_SERVER: string = "https://ssl.pidespeed.com/";
  constructor(private authService: AuthService, private router: Router,
    public profileService: ProfileService) {}

  ngOnInit() {
    this.empresa = this.profileService.getCurrentUser();
  }

  onLogOut() {
    Swal.fire({
      title: "¿Seguro que quieres cerrar la sesión?",
      text: "La sesión actual se cerrará.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        this.authService.logout();
        this.router.navigateByUrl("/login");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}
