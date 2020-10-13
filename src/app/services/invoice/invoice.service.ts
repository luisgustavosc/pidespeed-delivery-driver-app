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
export class InvoiceService {
  AUTH_SERVER: string = "https://ssl.pidespeed.com";

  constructor(private http: HttpClient) {}

  getPagos(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/pagos/${id}/1`,
      options
    );
  }

  getOrdenes(ids) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresapedido/get/byPago/${ids}`,
      options
    );
  }

  getByEmpresaByPedido(eid,pid) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresapedido/byEmpresaByPedido/${eid}/${pid}`,
      options
    );
  }

  getVentas(ids) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/ventas/getByPago/${ids}`,
      options
    );
  }

  getConfig(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/config/get/one/${id}`,
      options
    );
  }

  getCiudad(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/ciudades/get/one/${id}`,
      options
    );
  }
  getEstado(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/estados/get/one/${id}`,
      options
    );
  }

}
