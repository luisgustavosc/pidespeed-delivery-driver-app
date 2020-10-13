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
export class OrdersService {
  AUTH_SERVER: string = "https://ssl.pidespeed.com";

  constructor(private http: HttpClient) {}

  getUsuario(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/usuarios/${id}`,
      options
    );
  }

  getOrdenes(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresapedido/byEmpresa/${id}`,
      options
    );
  }

  getPendientes(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresapedido/pendientes/${id}`,
      options
    );
  }

  getTerminados(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresapedido/terminados/${id}`,
      options
    );
  }

  getEntregados(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresapedido/entregados/${id}`,
      options
    );
  }

  getPedido(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresapedido/${id}`,
      options
    );
  }

  mailEstadoPedido(datos) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/mail/estadoPedido`,
      datos,
      options
    );
  }

  mailPedidoTerminado(datos) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/mail/pedidoTerminado`,
      datos,
      options
    );
  }

  getPedidoByPedidoId(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresapedido/byPedido/${id}`,
      options
    );
  }

  setPedido(id, data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/pedidos/${id}`,
      data,
      options
    );
  }

  setEmpresaPedido(id, data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/empresapedido/${id}`,
      data,
      options
    );
  }

  getDetallePedido(pid, eid) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/detallepedido/${pid}/${eid}`,
      options
    );
  }

  getProducto(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/productos/get/one/${id}`,
      options
    );
  }

  updateProducto(id, data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/productos/${id}`,
      data,
      options
    );
  }

  addVenta(ruta) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/empresas/addVenta/${ruta}`,
      options
    );
  }

  setVenta(data){
    return this.http.post(
      `${this.AUTH_SERVER}/api/ventas/`,data,options
    );
  }
}
