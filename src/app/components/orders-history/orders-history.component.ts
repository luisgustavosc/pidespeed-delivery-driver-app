import { Component, OnInit } from '@angular/core';
import { OrdersService } from "../../services/orders/orders.service";
import { ProfileService } from "../../services/profile/profile.service";
import * as moment from 'moment';
import Swal from "sweetalert2";

declare var $:any
@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {
  empresa: any;
  toGo:any = [];
  delivery:any = [];
  meses:any=[];
  fActual:any;
  historial:any=[];
  usuario: any = [];
  transactions: any = [];
  ordenes: any = [];
  sinVentas = true;
  
  constructor(
    public ordersService: OrdersService,
    public profileService: ProfileService
    ) {}
    
  ngOnInit() {
    let fActual = moment()
    .format("L")
    .split("/");
    this.fActual = fActual;
    this.getEmpresa();
  }
  
  buscar(){
    let valor = $('#buscador').val();
    var registros1 = $("h3.py-4");
    if(valor == ""){
      for(var i = 0; i < registros1.length;i++) {
        registros1[i].style.display = 'block';
      }
    }else{
      for(var i = 0; i < registros1.length;i++) {
        registros1[i].style.display = 'none';
      }
    }
    // variable para todos los registros
    var registros = $("div.card-body");
    // expresion regular que busca el nombre con case insensitive
    var expression = new RegExp(valor, "i");
    
    for(var i = 0; i < registros.length;i++) {
      registros[i].style.display = 'none';
      let variable = registros[i].childNodes[1];
      if(variable.textContent.replace(/Orden:/g, "").search(expression) != -1) {
        registros[i].style.display = 'block';
      }
    }
  }
  
  getEmpresa() {
    this.empresa = this.profileService.getCurrentUser();
    this.ordersService.getEntregados(this.empresa.id).subscribe((entregados: any) => {
      this.historial = entregados;
      entregados.forEach((item, index) => {
        this.usuario[index] = {
          nombre: ''
        }
        let fecha = item.fecha.split("T");
        var mes = fecha[0].split("-");
        this.historial[index].mes = mes;
        this.ordersService.getDetallePedido(item.pedido_id,this.empresa.id).subscribe((detalle_pedido: any) => {
          this.detalleorders(detalle_pedido, index, item.id, item.precio, item.codigo, item.to_go, item.delivery);
        },
        err => {
          //SI HUBO UN ERROR EN LA CONSULTA RECARGA LA PAGINA
          Swal.fire({
            title: "Ocurrió un error",
            text: "Se recargará la página",
            icon: "error",
            confirmButtonText: "Aceptar",
          }).then(result => {
            if (result.value) {
              window.location.reload();
            }
          })
        });
        this.ordersService.getUsuario(item.usuario_id).subscribe((usuario: any) => {
          this.usuario[index] = {
            nombre: usuario.nombre + " " + usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono1,
            cedula: usuario.cedula
          };
        },
        err => {
          //SI HUBO UN ERROR EN LA CONSULTA RECARGA LA PAGINA
          Swal.fire({
            title: "Ocurrió un error",
            text: "Se recargará la página",
            icon: "error",
            confirmButtonText: "Aceptar",
          }).then(result => {
            if (result.value) {
              window.location.reload();
            }
          })
        });
      });
      this.calcularMeses();
    },
    err => {
      //SI HUBO UN ERROR EN LA CONSULTA RECARGA LA PAGINA
      Swal.fire({
        title: "Ocurrió un error",
        text: "Se recargará la página",
        icon: "error",
        confirmButtonText: "Aceptar",
      }).then(result => {
        if (result.value) {
          window.location.reload();
        }
      })
    });
  }
  
  detalleorders(items, indice, id, precio, codigo, toGo, delivery) {
    this.ordenes[indice] = [];
    this.ordenes[indice].precio = precio;
    this.toGo[indice] = 0;
    this.delivery[indice] = 0;
    this.ordenes[indice].id = id;
    this.ordenes[indice].codigo = codigo;
    this.transactions = [];
    items.forEach((item, index) => {
      this.transactions = [];
      this.transactions.push({nombre: item.nombre_producto, cantidad: item.cantidad});
      if (JSON.parse(item.acomp).sirope != "vacio" && JSON.parse(item.acomp).sirope != "") {
        if (JSON.parse(item.acomp).sirope.length) {
          let nombre = "Siropes: ";
          for (var i = 0; i < JSON.parse(item.acomp).sirope.length; i++) {
            if (i > 0) {
              nombre += ",";
            }
            nombre += JSON.parse(item.acomp).sirope[i].nombre;
          }
          this.transactions.push({nombre: nombre, cost: ""});
        } else {
          let nombre = "Sirope: " + JSON.parse(item.acomp).sirope.nombre;
          this.transactions.push({nombre: nombre, cost: ""});
        }
      }
      
      if (JSON.parse(item.acomp).topping != "vacio" && JSON.parse(item.acomp).topping != "") {
        if (JSON.parse(item.acomp).topping.length) {
          let nombre = "Toppings: ";
          for (var i = 0; i < JSON.parse(item.acomp).topping.length; i++) {
            if (i > 0) {
              nombre += ",";
            }
            nombre += JSON.parse(item.acomp).topping[i].nombre;
          }
          this.transactions.push({nombre: nombre, cost: ""})
        } else {
          let nombre = "Toppings: " + JSON.parse(item.acomp).topping.nombre;
          this.transactions.push({nombre: nombre, cost: ""})
        }
      }
      if(JSON.parse(item.acomp).bebida){
        if (JSON.parse(item.acomp).bebida != "vacio" && JSON.parse(item.acomp).bebida != "") {
          if (JSON.parse(item.acomp).bebida.length) {
            let nombre = "Bebidas: ";
            for (var i = 0; i < JSON.parse(item.acomp).bebida.length; i++) {
              if (i > 0) {
                nombre += ",";
              }
              nombre += JSON.parse(item.acomp).bebida[i].nombre;
            }
            this.transactions.push({nombre: nombre, cost: ""})
          } else {
            let nombre = "Bebida: " + JSON.parse(item.acomp).bebida.nombre;
            this.transactions.push({nombre: nombre, cost: ""})
          }
        }
      }
      
      if (JSON.parse(item.add).adicional != "vacio" && JSON.parse(item.add).adicional != "") {
        if (JSON.parse(item.add).adicional.length) {
          let nombre = "Adicionales: ";
          let precio = 0;
          for (var i = 0; i < JSON.parse(item.add).adicional.length; i++) {
            if (i > 0) {
              nombre += ",";
            }
            nombre += JSON.parse(item.add).adicional[i][0].nombre;
            precio += Number(JSON.parse(item.add).adicional[i][0].precio);
          }
          this.transactions.push({nombre: nombre, cost: precio});
          this.transactions.push({nombre: "Precio del Producto", cost: item.precio_producto});
        } else {
          let nombre = "Adicional: " + JSON.parse(item.add).adicional.nombre;
          
          this.transactions.push({nombre: nombre, cost: JSON.parse(item.add).adicional.precio})
          this.transactions.push({nombre: "Precio del Producto", cost: item.precio_producto});
        }
      }
      if(toGo == 1){
        if(this.toGo[indice] == 0){
          this.toGo[indice] = Number(item.to_go);
        }else{
          this.toGo[indice] = this.toGo[indice] + Number(item.to_go);
        }
        if(delivery == 1){
          if(this.delivery[indice] == 0){
            this.delivery[indice] = Number(item.delivery);
          }else{
            this.delivery[indice] = this.delivery[indice] + Number(item.delivery);
          }
        }
        if(item.to_go > 1){
          if (JSON.parse(item.add).adicional == "") {
            this.transactions.push({nombre: "Precio del Producto", cost: item.precio_producto});
          }
          this.transactions.push({nombre: "Costo para llevar", cost: Number(item.to_go)})
          if(item.delivery > 0){
            this.transactions.push({nombre: "Costo a Domicilio", cost: Number(item.delivery)})
            this.transactions.push({nombre: "Total", cost: (Number(item.total) + Number(item.to_go) + Number(item.delivery))})
          }else{
            this.transactions.push({nombre: "Total", cost: (Number(item.total) + Number(item.to_go))})
          }
        }else{
          this.transactions.push({nombre: "Total", cost: item.total})
        }
      }else{
        this.transactions.push({nombre: "Total", cost: item.total})
      }
      this.ordenes[indice].push(this.transactions);
    });
  }
  
  calcularMeses(){
    let f1Mes = moment()
    .subtract(1, "month")
    .format("L")
    .split("/");
    let f2Mes = moment()
    .subtract(2, "month")
    .format("L")
    .split("/");
    let f3Mes = moment()
    .subtract(3, "month")
    .format("L")
    .split("/");
    let f4Mes = moment()
    .subtract(4, "month")
    .format("L")
    .split("/");
    let f5Mes = moment()
    .subtract(5, "month")
    .format("L")
    .split("/");
    let f6Mes = moment()
    .subtract(6, "month")
    .format("L")
    .split("/");
    let f7Mes = moment()
    .subtract(7, "month")
    .format("L")
    .split("/");
    let f8Mes = moment()
    .subtract(8, "month")
    .format("L")
    .split("/");
    let f9Mes = moment()
    .subtract(9, "month")
    .format("L")
    .split("/");
    let f10Mes = moment()
    .subtract(10, "month")
    .format("L")
    .split("/");
    let f11Mes = moment()
    .subtract(11, "month")
    .format("L")
    .split("/");
    let f12Mes = moment()
    .subtract(12, "month")
    .format("L")
    .split("/");
    
    this.historial.forEach((item, index) => {
      if(item.mes[1] == this.fActual[0]){
        this.sinVentas = false;
      }
      if(item.mes[1] == f1Mes[0] && item.mes[0] == f1Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[0]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f1Mes)){
            this.meses.push(f1Mes);
          }
        }
      }
      if(item.mes[1] == f2Mes[0] && item.mes[0] == f2Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f2Mes[0]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f2Mes)){
            this.meses.push(f2Mes);
          }
        }
      }
      if(item.mes[1] == f3Mes[0] && item.mes[0] == f3Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[3]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f3Mes)){
            this.meses.push(f3Mes);
          }
        }
      }
      if(item.mes[1] == f4Mes[0] && item.mes[0] == f4Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[4]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f4Mes)){
            this.meses.push(f4Mes);
          }
        }
      }
      if(item.mes[1] == f5Mes[0] && item.mes[0] == f5Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[5]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f5Mes)){
            this.meses.push(f5Mes);
          }
        }
      }
      if(item.mes[1] == f6Mes[0] && item.mes[0] == f6Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[6]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f6Mes)){
            this.meses.push(f6Mes);
          }
        }
      }
      if(item.mes[1] == f7Mes[0] && item.mes[0] == f7Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[7]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f7Mes)){
            this.meses.push(f7Mes);
          }
        }
      }
      if(item.mes[1] == f8Mes[0] && item.mes[0] == f8Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[8]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f8Mes)){
            this.meses.push(f8Mes);
          }
        }
      }
      if(item.mes[1] == f9Mes[0] && item.mes[0] == f9Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[9]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f9Mes)){
            this.meses.push(f9Mes);
          }
        }
      }
      if(item.mes[1] == f10Mes[0] && item.mes[0] == f10Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[10]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f10Mes)){
            this.meses.push(f10Mes);
          }
        }
      }
      if(item.mes[1] == f11Mes[0] && item.mes[0] == f11Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[11]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f11Mes)){
            this.meses.push(f11Mes);
          }
        }
      }
      if(item.mes[1] == f12Mes[0] && item.mes[0] == f12Mes[2]){
        let existe = 0;
        for(let mes of this.meses){
          if(mes[0] == f1Mes[12]){
            existe = 1;
          }
        }
        if(existe == 0){
          if(!this.meses.some(mes => mes == f12Mes)){
            this.meses.push(f12Mes);
          }
        }
      }
    });
  }
}
