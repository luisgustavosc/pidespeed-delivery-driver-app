import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from './components/auth/services/auth/auth.service';
import { WebSocketService } from '../app/services/webSocket/web-socket.service';
import { Plugins } from '@capacitor/core';
const { LocalNotifications, Network, App, BackgroundTask, Geolocation } = Plugins;
import Swal from 'sweetalert2';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    title = 'admin-pideSpeed';
    currentUser: any;
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
        const status = await Network.getStatus();
        if (!status.connected) {
            this.router.navigateByUrl('/error503')
        }
        this.subscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => window.scrollTo(0, 0));

        //PERMISOS Y EJECUCION DE LA NOTIFICACION
        this.currentUser = this.authService.getCurrentUser();
        this.solicitarPermisos();
        this.webService.listen('pedido:actualizado').subscribe((data: any) => {
            this.pushNoti(data);
        })

        this.saveCoords();

        //TAREA DE BACKGROUND

        App.addListener('appStateChange', (state) => {
            if (!state.isActive) {
                let taskId = BackgroundTask.beforeExit(async () => {
                    if (this.currentUser) {
                        this.webService.listen('pedido:actualizado').subscribe((data: any) => {
                            if (data.userId == this.currentUser.id) {
                                this.pushNoti(data);
                            }
                        })
                    }
                    this.webService.listen('renew-coords').subscribe( async () => {
                        this.saveCoords();
                    })

                    BackgroundTask.finish({
                        taskId
                    });
                });
            }
        })
    }

    async saveCoords() {
        const coordinates = await Geolocation.getCurrentPosition();
        const coords = `(${coordinates.coords.latitude}, ${coordinates.coords.longitude})`;
        this.webService.emit('save-coords', { id: this.currentUser.id, coords, });
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
