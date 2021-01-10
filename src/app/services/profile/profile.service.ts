import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  authorization: `bearer ${localStorage.getItem('ACCESS_TOKEN')}`
});
let options = { headers: headers };

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  AUTH_SERVER: string = 'https://ssl.pidespeed.com';

  constructor(private http: HttpClient) {}

  getCurrentUser() {
    let user_string = localStorage.getItem('USER_ADMIN');
    if (!isNullOrUndefined(user_string)) {
      let user = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  setCurrentEmpresa(data) {
    localStorage.setItem('USER_ADMIN', JSON.stringify(data));
  }

  getCategoria(id) {
    return this.http.get(`${this.AUTH_SERVER}/api/categorias/one/${id}`, options);
  }

  updateProfile(data, id) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/empresas/${id}`,
      data,
      options
    );
  }

  setImage(image, id) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/empresas/image64/${id}`,
      image,
      options
    );
  }

  setImageLogo(image, id) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/empresas/logo64/${id}`,
      image,
      options
    );
  }

  CambiarPassword(id,data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/usuarios/password/${id}`,
      data,
      options
    );
  }

  recuperarPassword(email,data) {
    return this.http.put(
      `${this.AUTH_SERVER}/sesiones/recuperarPasswordAdmin/${email}`,
      data,
      options
    );
  }

  buscarEmpresaEmail(email) {
    return this.http.get(
      `${this.AUTH_SERVER}/sesiones/buscarEmpresaEmail/${email}`,
      options
    );
  }

  EnviarEmailRecuperar(data) {
    return this.http.post(
      `${this.AUTH_SERVER}/sesiones/recuperarPass`,
      data,
      options
    );
  }

  EnviarEmailCambio(data) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/mail/cambio`,
      data,
      options
    );
  }

  public setCodigo(codigo) {
    localStorage.setItem('codigo', JSON.stringify(codigo));
  }

  public getCodigo() {
    return JSON.parse(localStorage.getItem('codigo'));
  }

  public removeCodigo() {
    localStorage.removeItem('codigo');
  }

  getSubcategoria(ruta) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/subcategorias/listByEmpresa/${ruta}`,
      options
    );
  }

  getEmpresa(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresas/one/byId/${id}`,
      options
    );
  }

  getZonas(ciudad) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/zonas/${ciudad}`,
      options
    );
  }

  getZona(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/zonas/get/one/${id}`,
      options
    );
  }
}
