import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AUTH_SERVER, options } from 'src/app/services/API'
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string;
    private user: object;
    private tokenAdmin: string;
    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

    public login(user) {
        return this.http.post(`${AUTH_SERVER}/login/login-empresa-delivery`, user, options);
    }

    public logout(): void {
        this.token = '';
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('USER_ADMIN');
    }

    public getCurrentUser() {
        const userString = localStorage.getItem('USER_ADMIN');
        if (userString !== null || userString !== undefined) {
            const user = JSON.parse(userString);
            return user;
        }

        return null;
    }

    public setUser(user: object): void {
        const userString = JSON.stringify(user);
        localStorage.setItem('USER_ADMIN', userString);
    }

    public setBusiness(user: object): void {
        const businessString = JSON.stringify(user);
        localStorage.setItem('BUSINES_ADMIN', businessString);
    }

    public setAccessToken(token: string): void {
        this.token = token;
        localStorage.setItem('ACCESS_TOKEN', token);
    }

    public getAccessToken(): string {
        if (!this.token) {
            this.token = localStorage.getItem('ACCESS_TOKEN');
        }
        return this.token;
    }

    public isTokenValid() {
        return this.http.get(`${AUTH_SERVER}/example/test`, options);
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
