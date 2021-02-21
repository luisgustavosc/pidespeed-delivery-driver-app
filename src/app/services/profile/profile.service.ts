import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from '../API';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private http: HttpClient) { }

    public getByField(data) {
        return this.http.get(`${AUTH_SERVER}/public/one/${data.field}/${data.value}`, options);
    }

    public update(data, empresaId) {
        return this.http.put(`${AUTH_SERVER}/empresa-delivery/${empresaId}`, data, options);
    }

    public updatePassword(id, data) {
        return this.http.put(`${AUTH_SERVER}/login/set-password-empresa`, data, options);
    }

    public recoveryPassword(data) {
        return this.http.put(`${AUTH_SERVER}/mail/recuperar-pass/public`, data, options);
    }

    public setCode(code) {
        localStorage.setItem('code', JSON.stringify(code));
    }

    public getCode() {
        return JSON.parse(localStorage.getItem('code'));
    }

    public removeCode() {
        localStorage.removeItem('code');
    }
}
