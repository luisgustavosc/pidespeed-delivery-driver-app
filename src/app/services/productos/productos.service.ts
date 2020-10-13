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
export class ProductosService {
  AUTH_SERVER: string = "https://ssl.pidespeed.com";

  constructor(private http: HttpClient) {}

  getProductos(ruta) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/productos/${ruta}/2`,
      options
    );
  }

  getCatProduct(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/productos/onecategoriaEsp${id}`,
      options
    );
  }

  getAcomps() {
    return this.http.get(`${this.AUTH_SERVER}/api/acomps`, options);
  }

  getAcomp(id) {
    return this.http.get(`${this.AUTH_SERVER}/api/acomps/${id}`, options);
  }

  setAcomp(tabla, data) {
    return this.http.post(`${this.AUTH_SERVER}/api/${tabla}/`, data, options);
  }

  updateAcomp(id, tabla, data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/${tabla}/${id}`,
      data,
      options
    );
  }

  deleteAcomp(id, tabla) {
    return this.http.delete(`${this.AUTH_SERVER}/api/${tabla}/${id}`, options);
  }
  getTipoBebidas() {
    return this.http.get(`${this.AUTH_SERVER}/api/tipoBebidas`, options);
  }

  getAcompanamientos(tabla, id) {
    return this.http.get(`${this.AUTH_SERVER}/api/${tabla}/${id}/2`, options);
  }

  getAdicionales(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/adicionales/${id}/2`,
      options
    );
  }

  getToppings(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/toppings/${id}/2`,
      options
    );
  }
  getSiropes(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/siropes/${id}/2`,
      options
    );
  }
  getBebidas(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/bebidas/${id}/2`,
      options
    );
  }

  getSabores(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/sabores/${id}/2`,
      options
    );
  }

  getConfig() {
    return this.http.get(
      `${this.AUTH_SERVER}/api/config`,
      options
    );
  }

  getOneConfig(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/config/get/one/${id}`,
      options
    );
  }

  getAcompanamiento(tabla, id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/${tabla}/get/one/${id}`,
      options
    );
  }

  getAdicional(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/adicionales/get/one/${id}`,
      options
    );
  }

  setAdicional(data) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/adicionales/`,
      data,
      options
    );
  }

  updateAdicional(id, data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/adicionales/${id}`,
      data,
      options
    );
  }

  deleteAdicional(id) {
    return this.http.delete(
      `${this.AUTH_SERVER}/api/adicionales/${id}`,
      options
    );
  }

  getSabor(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/Sabores/get/one/${id}`,
      options
    );
  }

  setSabor(data) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/Sabores/`,
      data,
      options
    );
  }

  updateSabor(id, data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/Sabores/${id}`,
      data,
      options
    );
  }

  updateSaborByIds(ids, data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/Sabores/byIds/${ids}`,
      data,
      options
    );
  }

  deleteSabor(id) {
    return this.http.delete(
      `${this.AUTH_SERVER}/api/Sabores/${id}`,
      options
    );
  }

  createAcomp(tabla, data) {
    return this.http.post(`${this.AUTH_SERVER}/api/${tabla}/`, data, options);
  }

  createAdicional(adicional) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/adicionales/`,
      adicional,
      options
    );
  }

  createSabor(sabor) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/sabores/`,
      sabor,
      options
    );
  }
  
  addImg(type, image) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/files/${type}`,
      image,
      options
    );
  }

  getTamanos(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/tamanos/get/byEmpresa/${id}`,
      options
    );
  }

  getTamano(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/tamanos/get/one/${id}`,
      options
    );
  }

  setTamano(data) {
    return this.http.post(`${this.AUTH_SERVER}/api/tamanos`, data, options);
  }

  updateTamano(id, data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/tamanos/${id}`,
      data,
      options
    );
  }

  deleteTamano(id) {
    return this.http.delete(`${this.AUTH_SERVER}/api/tamanos/${id}`, options);
  }

  getCategorias(ruta) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/productos/get/categoriasesp/${ruta}/2`,
      options
    );
  }

  getCategoriasTodas(ruta) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/productos/get/categorias/${ruta}`,
      options
    );
  }

  getProducto(id) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/productos/get/one/${id}`,
      options
    );
  }

  setProducto(data) {
    return this.http.post(`${this.AUTH_SERVER}/api/productos`, data, options);
  }

  updateProducto(id, data) {
    return this.http.put(
      `${this.AUTH_SERVER}/api/productos/${id}`,
      data,
      options
    );
  }

  deleteProducto(id) {
    return this.http.delete(`${this.AUTH_SERVER}/api/productos/${id}`, options);
  }

  setImageProducto(image, id) {
    return this.http.post(
      `${this.AUTH_SERVER}/api/productos/image64/${id}`,
      image,
      options
    );
  }

  /**
   * PREVIEW PRODUCTOS
   */

  getAdicionalesByIds(ids) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/adicionales/ByIds/${ids}/1`,
      options
    );
  }

  getSiropesByIds(ids) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/siropes/ByIds/${ids}/1`,
      options
    );
  }

  getToppingsByIds(ids) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/toppings/ByIds/${ids}/1`,
      options
    );
  }

  getBebidasByIds(ids) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/bebidas/ByIds/${ids}/1`,
      options
    );
  }

  getSaboresByIds(ids) {
    return this.http.get(
      `${this.AUTH_SERVER}/api/sabores/ByIds/${ids}/1`,
      options
    );
  }

  getTipoBebidasById(id) {
    return this.http.get(`${this.AUTH_SERVER}/api/tipoBebidas/${id}`, options);
  }
}
