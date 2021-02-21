import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from '../API';
import { AuthService } from '../../components/auth/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyUsersService {
    private user;
    public static readonly TYPE_DELIVERY = 'delivery';
    public static readonly TYPE_COMPANY = 'empresa';

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
        return this.http.post(`${ AUTH_SERVER }/search-user-field`, data, options);
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
