import { Component, OnInit, NgModule, Input, ChangeDetectorRef } from "@angular/core";
import { AuthService } from "src/app/services/auth/auth.service";
import { Router } from "@angular/router";
import { ProfileService } from "src/app/services/profile/profile.service";
import { OrdersService } from "src/app/services/orders/orders.service";
import { WebSocketService } from 'src/app/services/webSocket/web-socket.service';
import Swal from "sweetalert2";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    @Input() cantidadPendientes: number;
    empresa:any;
    public URL_SERVER: string = "https://ssl.pidespeed.com/";
    empresaAbierta: any;

    constructor(private authService: AuthService,
        private router: Router,
        public profileService: ProfileService,
        public ordersService: OrdersService,
        private cdRef: ChangeDetectorRef,
        private webService: WebSocketService
    ) {}

    ngOnInit() {
        this.empresa = this.profileService.getCurrentUser();
        this.getPendientes();
        this.webService.listen('pedido:nuevoEmpresa').subscribe((data:any) => {
            this.getPendientes();
        });
        this.webService.listen('actualizar:pedidosEmpresa').subscribe((data:any) => {
            this.getPendientes();
        });
    }
    refreshCom() {
        // *Escontrar forma de refrescar componente hijo sin recargar
        window.location.reload();
    }

    getPendientes() {
        this.ordersService.getPendientes(this.empresa.id).subscribe((pendientes: any) => {
            if (window.location.pathname != '/orders') {
                this.cantidadPendientes = pendientes.length;
            }
            this.cdRef.detectChanges();
        });
    }

    onLogOut() {
        Swal.fire({
            title: "¿Seguro que quieres la cerrar sesion?",
            text: "La sesión actual se cerrará.",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.value) {
                this.authService.logout();
                this.router.navigateByUrl("/login");
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                return false;
            }
        });
    }

    Apertura(){
        this.empresa = this.profileService.getCurrentUser();
        if (this.empresa.abierto === 0) {
            this.empresaAbierta = {
                abierto: 1,
            };
        } else {
            this.empresaAbierta = {
                abierto: 0,
            };
        }

        this.profileService.updateProfile(this.empresaAbierta, this.empresa.id).subscribe((empresa: any) => {
            //si empresa.message == "ok" mostrar que todo correcto
            if (empresa.message == "ok") {
                if (this.empresa.abierto === 0) {
                    Swal.fire({
                        title: "Ahora tu empresa está abierta al público",
                        text:
                        "Ahora tus clientes pueden realizar compras!",
                        icon: "success",
                        confirmButtonText: "Aceptar"
                    });
                } else {
                    Swal.fire({
                        title: "Ahora tu empresa está cerrada",
                        text:
                        "Haz cerrado correctamente tu empresa!",
                        icon: "success",
                        confirmButtonText: "Aceptar"
                    });
                }
            } else {
                Swal.fire({
                    title: "Ha ocurrido un error",
                    text: "Por favor intente nuevamente",
                    confirmButtonText: "Aceptar"
                });
            }
            this.empresa.abierto = this.empresaAbierta.abierto;
            this.profileService.setCurrentEmpresa(this.empresa);
        },
        err => {
            Swal.fire({
                title: "Ha ocurrido un error",
                text: "Por favor intente nuevamente",
                confirmButtonText: "Aceptar"
            });
        });
    }
}
