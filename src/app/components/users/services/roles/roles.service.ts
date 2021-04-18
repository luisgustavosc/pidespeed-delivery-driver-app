import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from 'src/app/services/API'

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`${AUTH_SERVER}/role/list/all`, options);
    }

    getById(id: string) {
        return this.http.get(`${AUTH_SERVER}/role/list/one/${ id }`, options);
    }
}
