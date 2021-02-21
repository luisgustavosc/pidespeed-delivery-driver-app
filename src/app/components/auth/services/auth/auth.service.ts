import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AUTH_SERVER, options } from '../../../../services/API';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private token: string;
    private user: Object;
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
        let user_string = localStorage.getItem('USER_ADMIN');
        if (user_string !== null || user_string !== undefined) {
            let user = JSON.parse(user_string);
            return user;
        }

        return null;
    }

    public setUser(user: Object): void {
        const userString = JSON.stringify(user);
        localStorage.setItem('USER_ADMIN', userString);
    }

    public setBusiness(user: Object): void {
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
}
