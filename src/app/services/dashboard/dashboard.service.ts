import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap } from "rxjs/operators";

let headers = new HttpHeaders({
  "Content-Type": "application/json",
  authorization: `bearer ${localStorage.getItem("ACCESS_TOKEN")}`
});
let options = { headers: headers };

@Injectable({
  providedIn: "root"
})
export class DashboardService {
  AUTH_SERVER: string = "https://ssl.pidespeed.com";

  constructor(private http: HttpClient) {}
  getVentas(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/ventas/${id}`,
      options
    );
  }

  getCompany(ruta) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresas/one/${ruta}`,
      options
    );
  }

  getUsuario(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/usuarios/${id}`,
      options
    );
  }
}
