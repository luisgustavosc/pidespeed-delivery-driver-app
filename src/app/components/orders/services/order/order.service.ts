import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from 'src/app/services/API';
import { AuthService } from 'src/app/components/auth/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    user: any;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {
        this.user = this.authService.getCurrentUser();
    }

    public getAll() {
        return this.http.get(`${ AUTH_SERVER }/delivery-order/${ this.user.empresaDelivery }`, options);
    }

    public getById(orderId: string) {
        return this.http.get(`${ AUTH_SERVER }/delivery-order/list/one/${ orderId }`, options);
    }
}
