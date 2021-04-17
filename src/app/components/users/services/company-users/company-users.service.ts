import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from 'src/app/services/API'
import { AuthService } from '../../../auth/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyUsersService {
    public static readonly TYPE_DELIVERY = 'delivery';
    public static readonly TYPE_COMPANY = 'empresa';
    private user;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.user = this.authService.getCurrentUser();
    }

    getAll(type = CompanyUsersService.TYPE_COMPANY) {
        return this.http.get(`${ AUTH_SERVER }/usuario-empresa/${ this.user.empresaDelivery }/${ type }`, options);
    }

    getById(usuarioId, type = CompanyUsersService.TYPE_COMPANY) {
        return this.http.get(`${ AUTH_SERVER }/usuario-empresa/list/one/${ usuarioId }/${ type }`, options);
    }

    getByField(data) {
        return this.http.post(`${ AUTH_SERVER }/usuario-empresa/search-user-field`, data, options);
    }

    create(data) {
        return this.http.post(`${ AUTH_SERVER }/usuario-empresa/`, data, options);
    }

    update(data) {
        return this.http.put(`${ AUTH_SERVER }/usuario-empresa/`, data, options);
    }

    deleteById(usuarioId) {
        return this.http.delete(`${ AUTH_SERVER }/usuario-empresa/${usuarioId}`, options);
    }
}
