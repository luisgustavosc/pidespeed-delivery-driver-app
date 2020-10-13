import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { OrdersService } from "../../services/orders/orders.service";
import { ProfileService } from "../../services/profile/profile.service";
import { WebSocketService } from '../../services/webSocket/web-socket.service';
import Swal from "sweetalert2";
import * as moment from 'moment';
declare var $:any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  lazyloader = false;
  ordersCantidadPendiente: number;
  empresa: any;
  toGo:any = [];
  toGoTerminados:any = [];
  precioToGo:any = [];
  precioToGoTerminados:any = [];
  delivery:any = [];
  deliveryTerminados:any = [];
  precioDelivery:any = [];
  precioDeliveryTerminados:any = [];
  pendientes: any;
  terminados: any;
  usuario: any = [];
  usuarioTerminados: any = [];
  transactions: any = [];
  ordenes: any = [];
  ordenesTerminadas: any = [];
  actuales:any = "no";
  coordenadas = [];
  coordenadasTerminados = [];
  descripcionDelivery: any;
  descripcionDeliveryTerminados: any;
  
  constructor(
    private cdRef: ChangeDetectorRef,
    public ordersService: OrdersService,
    public profileService: ProfileService,
    private webService: WebSocketService
    ) {}
    
  ngOnInit() {
    this.getEmpresa();
    this.actualizarTiempo();
    moment.locale('es', {
      months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
      monthsShort: 'Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.'.split('_'),
      weekdays: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado'.split('_'),
      weekdaysShort: 'Dom._Lun._Mar._Mier._Jue._Vier._Sab.'.split('_'),
      weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sa'.split('_'),
      relativeTime : {
        future : 'en %s',
        past : 'hace %s',
        s : 'unos segundos',
        ss : '%d segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'un mes',
        MM : '%d meses',
        y : 'un año',
        yy : '%d años'
      }});
    
    this.webService.listen('pedido:nuevoEmpresa').subscribe((data:any) => {
      if(data.empresaId == this.empresa.id){
        this.getEmpresa(1)
      }
    })
    
    this.webService.listen('actualizar:pedidosEmpresa').subscribe((data:any) => {
      if(data.empresaId == this.empresa.id){
        this.closeModals();
      }
    })
  }
  
  closeModals(){
    this.ordenes.map((item, index) => {
      $("#order"+item.id).modal("hide");
    })
    
    this.ordenesTerminadas.map((item, index) => {
      $("#terminados"+item.id).modal("hide");
    })
    this.getEmpresa();
  }
  
  buscar(){
    let valor = $('#buscador').val();
    
    // variable para todos los registros
    var registros = $("div.card");
    // expresion regular que busca el nombre con case insensitive
    var expression = new RegExp(valor, "i");
    
    for(var i = 0; i < registros.length;i++) {
      registros[i].style.display = 'none';
      let variable = registros[i].childNodes[0].childNodes[1].childNodes[0];
      if(variable.textContent.replace(/Orden:/g, "").search(expression) != -1) {
        registros[i].style.display = 'block';
      }
    }
  }
  
  actualizarTiempo(){
    setInterval(() => {
      if(this.terminados){
        this.terminados.forEach(item => {
          let fecha = item.fecha.split("T")[0]
          let hora = item.fecha.split("T")[1].substr(0,8)
          item.fecha1 = moment(fecha+"T"+hora).fromNow();
        })
        this.terminados = this.terminados;
      }
      
      if(this.pendientes){
        this.pendientes.forEach(item => {
          let fecha = item.fecha.split("T")[0]
          let hora = item.fecha.split("T")[1].substr(0,8)
          item.fecha1 = moment(fecha+"T"+hora).fromNow();
        })
        this.pendientes = this.pendientes;
      }
    }, 5000);
  }
  
  getEmpresa(valor?) {
    this.empresa = this.profileService.getCurrentUser();
    this.ordersService.getPendientes(this.empresa.id).subscribe((pendientes: any) => {
      pendientes.forEach(item => {
        let fecha = item.fecha.split("T")[0]
        let hora = item.fecha.split("T")[1].substr(0,8)
        item.fecha1 = moment(fecha+"T"+hora).fromNow();
      })
      this.ordersCantidadPendiente = pendientes.length;
      if(valor){
        let number = (pendientes.length - this.actuales)
        for(let i = 0; i < number; i++){
          let index = pendientes.length - (i + 1);
          this.usuario[index] = {
            nombre: ''
          }
          this.ordenes[index] = [];
          this.ordenes[index].id = "";
          this.ordersService.getDetallePedido(pendientes[i].pedido_id,this.empresa.id).subscribe((detalle_pedido: any) => {
            this.detalleorders(detalle_pedido, index, pendientes[i].id, pendientes[i].precio, pendientes[i].codigo, pendientes[i].to_go, pendientes[i].delivery);
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
          this.ordersService.getUsuario(pendientes[i].usuario_id).subscribe((usuario: any) => {
            this.usuario[index] ={
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
        }
      }
      
      this.pendientes = pendientes;
      if(!valor){
        pendientes.forEach((item, index) => {
          this.usuario[index] = {
            nombre: ''
          }
          this.ordenes[index] = [];
          this.ordenes[index].id = "";
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
            this.usuario[index] ={
              id: usuario.id,
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
        this.getTerminados();
      }
      this.actuales = pendientes.length;
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
  
  getTerminados(){
    this.ordersService.getTerminados(this.empresa.id).subscribe((terminados: any) => {
      terminados.forEach(item => {
        let fecha = item.fecha.split("T")[0]
        let hora = item.fecha.split("T")[1].substr(0,8)
        item.fecha1 = moment(fecha+"T"+hora).fromNow();
      })
      this.terminados = terminados;
      terminados.forEach((item, index) => {
        this.usuarioTerminados[index] = {
          nombre: ''
        }
        this.ordenesTerminadas[index] = [];
        this.ordenesTerminadas[index].id = "";
        this.ordersService.getDetallePedido(item.pedido_id,this.empresa.id).subscribe((detalle_pedido: any) => {
          this.detalleTerminados(detalle_pedido, index, item.id, item.precio, item.codigo, item.to_go, item.delivery);
          this.cdRef.detectChanges();
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
          this.usuarioTerminados[index] = {
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
    this.toGo[indice] = toGo;
    this.delivery[indice] = delivery != 0 ? 1 : 0;
    if(delivery != 0){
      let value = JSON.parse(delivery)
      this.coordenadas[indice] = value.coordenadas
      this.descripcionDelivery = value.descripcion
    }else{
      this.coordenadas[indice] = 0;
    }
    this.precioToGo[indice] = 0
    this.precioDelivery[indice] = 0;
    this.ordenes[indice].id = id;
    this.ordenes[indice].precio = precio;
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
      
      if (JSON.parse(item.acomp).instrucciones != "vacio" && JSON.parse(item.acomp).instrucciones != "") {
        let nombre = "instrucciones: " + JSON.parse(item.acomp).instrucciones;
        this.transactions.push({
          nombre: nombre,
          cost: ""
        });
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
        if(this.precioToGo[indice] == 0){
          this.precioToGo[indice] = Number(item.to_go);
        }else{
          this.precioToGo[indice] = this.precioToGo[indice] + Number(item.to_go);
        }
        if(delivery != 0){
          if(this.precioDelivery[indice] == 0){
            this.precioDelivery[indice] = Number(item.delivery);
          }
        }
        if(item.to_go > 0){
          if (JSON.parse(item.add).adicional == "") {
            this.transactions.push({nombre: "Precio del Producto", cost: item.precio_producto});
          }
          this.transactions.push({nombre: "Costo para llevar", cost: Number(item.to_go)})
          this.transactions.push({nombre: "Total", cost: (Number(item.total) + Number(item.to_go))})
        }else{
          this.transactions.push({nombre: "Total", cost: item.total})
        }
      }else{
        this.transactions.push({nombre: "Total", cost: item.total})
      }
      this.ordenes[indice].push(this.transactions);
    });
  }
  
  detalleTerminados(items, indice, id, precio, codigo, toGo,delivery) {
    this.toGoTerminados[indice] = toGo;
    this.deliveryTerminados[indice] = delivery != 0 ? 1 : 0;
    if(delivery != 0){
      let value = JSON.parse(delivery)
      this.coordenadasTerminados[indice] = value.coordenadas
      this.descripcionDeliveryTerminados = value.descripcion
    }else{
      this.coordenadasTerminados[indice] = 0;
    }
    this.precioToGoTerminados[indice] = 0;
    this.precioDeliveryTerminados[indice] = 0;
    this.ordenesTerminadas[indice] = [];
    this.ordenesTerminadas[indice].id = id;
    this.ordenesTerminadas[indice].precio = precio;
    this.ordenesTerminadas[indice].codigo = codigo;
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
      
      if (JSON.parse(item.acomp).bebida && JSON.parse(item.acomp).bebida != "vacio" && JSON.parse(item.acomp).bebida != "") {
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
      
      if (JSON.parse(item.acomp).instrucciones != "vacio" && JSON.parse(item.acomp).instrucciones != "") {
        
        let nombre = "Instrucciones: " + JSON.parse(item.acomp).instrucciones;
        this.transactions.push({
          nombre: nombre,
          cost: ""
        });
        
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
        if(this.precioToGoTerminados[indice] == 0){
          this.precioToGoTerminados[indice] = Number(item.to_go);
        }else{
          this.precioToGoTerminados[indice] = this.precioToGoTerminados[indice] + Number(item.to_go);
        }
        if(delivery != 0){
          if(this.precioDeliveryTerminados[indice] == 0){
            this.precioDeliveryTerminados[indice] = Number(item.delivery);
          }
        }
        
        if(item.to_go > 1){
          if (JSON.parse(item.add).adicional == "") {
            this.transactions.push({nombre: "Precio del Producto", cost: item.precio_producto});
          }
          this.transactions.push({nombre: "Costo para llevar", cost: Number(item.to_go)})
          this.transactions.push({nombre: "Total", cost: (Number(item.total) + Number(item.to_go))})
        }else{
          this.transactions.push({nombre: "Total", cost: item.total})
        }
      }else{
        this.transactions.push({nombre: "Total", cost: item.total})
      }
      this.ordenesTerminadas[indice].push(this.transactions);
    });
  }
  
  terminado(id, codigo, nombre, email, userId){
    this.lazyloader = true;
    let terminado = {
      terminado: 1,
      fecha: moment().subtract(4, "hour").format().substr(0,19).replace('T', ' ')
    }
    let coordenadas;
    if(this.empresa.coordenadas != ""){
      let primero = this.empresa.coordenadas.slice(1,40);
      coordenadas = primero.slice(0, -1)
    }else{
      coordenadas = "no"
    }
    let mail = {
      nombre:nombre,
      email:email,
      codigo:codigo,
      nombreEmpresa: this.empresa.nombre,
      coordenadas: coordenadas
    }
    this.ordersService.addVenta(this.empresa.ruta).subscribe((venta: any) => {
    },
    err => {
      this.lazyloader = false;
      Swal.fire({
        title: "Ha ocurrido un error intente nuevamente",
        confirmButtonText: "Aceptar"
      });
      return;
    }
    );
    
    this.ordersService.setEmpresaPedido(id,terminado).subscribe((terminado: any) => {
      this.ordersService.mailPedidoTerminado(mail).subscribe((mail: any) => {});
      this.ordersService.getPedido(id).subscribe((pedido: any) => {
        let venta = {
          pedido_id: pedido.pedido_id,
          empresa_id: pedido.empresa_id,
          total: pedido.precio,
          delivery: pedido.precio_delivery,
          moneda: 'Bss',
          pagado: 0
        }
        this.ordersService.setVenta(venta).subscribe((venta: any) => {
        },
        err => {
          this.lazyloader = false;
          Swal.fire({
            title: "Ha ocurrido un error intente nuevamente",
            confirmButtonText: "Aceptar"
          });
          return;
        }
        );
        this.ordersService.getPedidoByPedidoId(pedido.pedido_id).subscribe((pedidos: any) => {
          let terminado1 = {
            terminado: 1
          }
          let comprobar = true;
          for(let pedido2 of pedidos){
            if(pedido2.terminado == 0){
              comprobar = false
            }
          }
          if(comprobar){
            this.ordersService.setPedido(pedido.pedido_id,terminado1).subscribe((terminado2: any) => {
              if(terminado.message == "ok"){
                let data = {
                  userId: userId,
                  empresa: this.empresa.nombre,
                  codigo: codigo,
                  aprobado: 0
                }
                this.webService.emit('pedido:actualizado', data);
                this.webService.emit('actualizar:pedidosEmpresa', {empresaId: this.empresa.id});
                this.lazyloader = false;
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Pedido Terminado",
                  showConfirmButton: false,
                  timer: 1500
                });
                $("#order"+id).modal("hide");
                this.ordenes = [];
                this.ordenesTerminadas = [];
                this.getEmpresa();
                this.getTerminados();
                this.getTerminados();
              }
              this.cdRef.detectChanges();
            },
            err => {
              this.lazyloader = false;
              Swal.fire({
                title: "Ha ocurrido un error",
                confirmButtonText: "Aceptar"
              });
            }
            );
          }else{
            if(terminado.message == "ok"){
              let data = {
                userId: userId,
                empresa: this.empresa.nombre,
                codigo: codigo,
                aprobado: 0
              }
              this.webService.emit('pedido:actualizado', data);
              this.webService.emit('actualizar:pedidosEmpresa', {empresaId: this.empresa.id});
              this.lazyloader = false;
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Pedido Terminado",
                showConfirmButton: false,
                timer: 1500
              });
              $("#order"+id).modal("hide");
              this.ordenes = [];
              this.ordenesTerminadas = [];
              this.getEmpresa();
              this.getTerminados();
              this.getTerminados();
            }
            this.cdRef.detectChanges();
          }
        },
        err => {
          this.lazyloader = false;
          Swal.fire({
            title: "Ha ocurrido un error",
            confirmButtonText: "Aceptar"
          });
        }
        );
      },
      err => {
        this.lazyloader = false;
        Swal.fire({
          title: "Ha ocurrido un error",
          confirmButtonText: "Aceptar"
        });
      }
      );
    },
    err => {
      this.lazyloader = false;
      Swal.fire({
        title: "Ha ocurrido un error",
        confirmButtonText: "Aceptar"
      });
    }
    );
  }
  
  entregado(id){
    this.lazyloader = true;
    let entregado = {
      entregado: 1
    }
    this.ordersService.setEmpresaPedido(id,entregado).subscribe((entregado: any) => {
      this.ordersService.getPedido(id).subscribe((pedido: any) => {
        this.ordersService.getPedidoByPedidoId(pedido.pedido_id).subscribe((pedidos: any) => {
          let entregado1 = {
            entregado: 1
          }
          let comprobar = true;
          for(let pedido2 of pedidos){
            if(pedido2.entregado == 0){
              comprobar = false
            }
          }
          if(comprobar){
            this.ordersService.setPedido(pedido.pedido_id,entregado1).subscribe((entregado3: any) => {
              if(entregado.message == "ok"){
                this.webService.emit('actualizar:pedidosEmpresa', {empresaId: this.empresa.id});
                this.lazyloader = false;
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Pedido Entregado",
                  showConfirmButton: false,
                  timer: 1500
                });
                $("#terminados"+id).modal("hide");
                this.ordenes = [];
                this.ordenesTerminadas = [];
                this.getEmpresa();
                this.getTerminados();
              }
              this.cdRef.detectChanges();
            },
            err => {
              this.lazyloader = false;
              Swal.fire({
                title: "Ha ocurrido un error",
                confirmButtonText: "Aceptar"
              });
            }
            );
          }else{
            if(entregado.message == "ok"){
              this.webService.emit('actualizar:pedidosEmpresa', {empresaId: this.empresa.id});
              this.lazyloader = false;
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Pedido Entregado",
                showConfirmButton: false,
                timer: 1500
              });
              $("#terminados"+id).modal("hide");
              this.ordenes = [];
              this.ordenesTerminadas = [];
              this.getEmpresa();
              this.getTerminados();
            }
            this.cdRef.detectChanges();
          }
        },
        err => {
          this.lazyloader = false;
          Swal.fire({
            title: "Ha ocurrido un error",
            confirmButtonText: "Aceptar"
          });
        }
        );
      },
      err => {
        this.lazyloader = false;
        Swal.fire({
          title: "Ha ocurrido un error",
          confirmButtonText: "Aceptar"
        });
      }
      );
    },
    
    err => {
      this.lazyloader = false;
      Swal.fire({
        title: "Ha ocurrido un error",
        confirmButtonText: "Aceptar"
      });
    }
    );
  }
  
  mapa(id,coordenadas,lugar) {
    var map, infoWindow, marker;
    infoWindow = new google.maps.InfoWindow();
    if(coordenadas){
      let primero = coordenadas.slice(1,40);
      let seg = primero.slice(0, -1)
      let coord = seg.split(",")
      let coord2 = {lat: Number(coord[0]), lng: Number(coord[1])}
      if(lugar == 'pendientes'){
        map = new google.maps.Map(document.getElementById(`map${id}`), {
          center: coord2,
          zoom: 14
        });
      }else{
        map = new google.maps.Map(document.getElementById(`mapT${id}`), {
          center: coord2,
          zoom: 14
        });
      }
      placeMarkerAndPanTo(coord2, map)
    }
    
    map.addListener('center_changed', function() {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
      }, 1500);
    });
    
    //funcion que coloca los marcadores
    function placeMarkerAndPanTo(latLng, map) {
      if(infoWindow){
        infoWindow.close();
      }
      marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: latLng,
        map: map,
      });
      map.panTo(latLng);
      marker.addListener('click', toggleBounce);
    }
    
    //animación para los marcadores
    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }
  }
}

    