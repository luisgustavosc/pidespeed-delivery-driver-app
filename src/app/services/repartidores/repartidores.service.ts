import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from '../API';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RepartidoresService {
  user;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  listRepartidores() {
    return this.http.get(`${AUTH_SERVER}/usuario-empresa/${this.user.empresaDelivery}/delivery`, options);
  }

  listRepartidor(usuarioId) {
    return this.http.get(`${AUTH_SERVER}/usuario-empresa/list/one/${usuarioId}/delivery`, options);
  }

  addRepartidor(data) {
    return this.http.post(`${AUTH_SERVER}/usuario-empresa/`, data, options);
  }

  updateRepartidor(data) {
    return this.http.put(`${AUTH_SERVER}/usuario-empresa/`, data, options);
  }

  deleteRepartidor(usuarioId) {
    return this.http.delete(`${AUTH_SERVER}/usuario-empresa/${usuarioId}`, options);
  }
}
