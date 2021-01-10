import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from '../app/services/auth/auth.service';
import { WebSocketService } from '../app/services/webSocket/web-socket.service';
import { Plugins } from '@capacitor/core';
const { LocalNotifications, Network, App, BackgroundTask } = Plugins;
import Swal from 'sweetalert2';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    title = 'admin-pideSpeed';
    empresa: any;
    constructor(private router: Router, private webService: WebSocketService, private authService: AuthService) { }

    async ngOnInit() {

        //ACCIONES DE LA NOTIFICACION
        // LocalNotifications.registerActionTypes({
        //     types: [
        //         {
        //             id: 'Foreground',
        //             actions: [
        //                 {
        //                     id: 'activeForeground',
        //                     title: 'Ver más',
        //                     foreground: true
        //                 }
        //             ]
        //         }
        //     ]
        // })

        //VERIFICAR CONEXION A INTERNET
        let status = await Network.getStatus();
        if (!status.connected) {
            this.router.navigateByUrl('/error503')
        }
        this.subscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => window.scrollTo(0, 0));

        //PERMISOS Y EJECUCION DE LA NOTIFICACION
        this.solicitarPermisos();
        this.empresa = this.authService.getCurrentUser();
        if (this.empresa) {
            this.webService.listen('pedido:actualizado').subscribe((data: any) => {
                if (data.userId == this.empresa.id) {
                    this.pushNoti(data);
                }
            })
        }

        //TAREA DE BACKGROUND

        App.addListener('appStateChange', (state) => {

            if (!state.isActive) {

                let taskId = BackgroundTask.beforeExit(async () => {

                    if (this.empresa) {
                        this.webService.listen('pedido:actualizado').subscribe((data: any) => {
                            if (data.userId == this.empresa.id) {
                                this.pushNoti(data);
                            }
                        })
                    }

                    BackgroundTask.finish({
                        taskId
                    });
                });
            }
        })
    }
    async solicitarPermisos() {
        const response = await LocalNotifications.requestPermission();
        if (!response.granted) {
            Swal.fire({
                title: 'Debe aprobar las notificaciones',
                text: 'Son necesarias para notificarle las notificaciones de su pedido',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
            })
        }
    }

    async pushNoti(data) {
        await LocalNotifications.schedule({
            notifications: [
                {
                    title: 'Nueva ordern',
                    body: `Tienes una nueva orden codigo: ${data.codigo}`,
                    id: 1,
                    iconColor: '#FF414D',
                    actionTypeId: 'Foreground'
                }
            ]
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
