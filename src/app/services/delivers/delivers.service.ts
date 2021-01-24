import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_SERVER, options } from '../API';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DeliversService {
  private user;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  getAll() {
    return this.http.get(`${AUTH_SERVER}/usuario-empresa/${this.user.empresaDelivery}/delivery`, options);
  }

  getDeliverById(usuarioId) {
    return this.http.get(`${AUTH_SERVER}/usuario-empresa/list/one/${usuarioId}/delivery`, options);
  }

  getDeliverByField(data) {
    return this.http.post(`${AUTH_SERVER}/search-user-field`, data, options);
  }

  createDeliver(data) {
    return this.http.post(`${AUTH_SERVER}/usuario-empresa/`, data, options);
  }

  updateDeliver(data) {
    return this.http.put(`${AUTH_SERVER}/usuario-empresa/`, data, options);
  }

  deleteById(usuarioId) {
    return this.http.delete(`${AUTH_SERVER}/usuario-empresa/${usuarioId}`, options);
  }
}
