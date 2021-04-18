import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from 'src/app/services/API'
import { AuthService } from '../../../auth/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyUsersService {
    public static readonly COMPANY_TYPE_DELIVER = 'delivery';
    public static readonly ROLE_ADMIN = 'admin';
    public static readonly ROLE_WORKER = 'worker';
    private user;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.user = this.authService.getCurrentUser();
    }

    getAll(role: string) {
        return this.http.get(`${ AUTH_SERVER }/usuario-empresa/${ this.user.empresaDelivery }/${ CompanyUsersService.COMPANY_TYPE_DELIVER }/${ role }`, options);
    }

    getById(userId: string) {
        return this.http.get(`${ AUTH_SERVER }/usuario-empresa/list/one/${ userId }/${ CompanyUsersService.COMPANY_TYPE_DELIVER }`, options);
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

    deleteById(userId) {
        return this.http.delete(`${ AUTH_SERVER }/usuario-empresa/${ userId }`, options);
    }
}
