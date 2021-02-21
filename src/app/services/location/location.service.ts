import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from '../API';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor(private http: HttpClient) { }

    public getAllCities() {
        return this.http.get(`${ AUTH_SERVER }/ciudad/public`, options);
    }

    public getAllStates() {
        return this.http.get(`${ AUTH_SERVER }/estado/public`, options);
    }
}
