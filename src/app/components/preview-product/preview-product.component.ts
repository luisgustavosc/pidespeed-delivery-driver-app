import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute, Params } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductosService } from "../../services/productos/productos.service";
import { ProfileService } from "../../services/profile/profile.service";
import Swal from "sweetalert2";
declare var $: any;
declare var lightGallery: any

export interface producto {
  sabores: number;
  nombre: string;
  precio: any;
  sirope: any;
  topping: any;
  sabor: any;
  bebida: any;
  add: any;
  tamanos: any;
  empresa_id: any;
  precio1: any;
  precio2: any;
  precio3: any;
  precioTamano: any;
}

export interface preciototal {
  [x: string]: any;
  [precioAd: number]: any;
}

@Component({
  selector: 'app-preview-product',
  templateUrl: './preview-product.component.html',
  styleUrls: ['./preview-product.component.css']
})
export class PreviewProductComponent implements OnInit {
  paramRutas: { id: any };
  tasa:any;
  promo:any;
  empresa: any = "";
  producto: any = "";
  siropes: any;
  toppings: any;
  bebidas: any = [];
  adicionales: any;
  tamanos: any;
  consulta: number;
  adicionalesTabla: any;
  precioAdicionales: any;
  CategoriaAdicional: Array<any> = [];
  precioTotal: preciototal = [];
  transactions = [{}];
  siropesLength: any;
  toppingsLength: any;
  bebidasLength: any;
  cantidad: number = 1;
  ItemCarrito: Object;
  precioAdicional: any;
  HorarioDisponible: any;
  detallesProducto = new FormGroup({
    tamano: new FormControl("", [Validators.required]),
    sabor: new FormControl(""),
    sirope: new FormControl("", [Validators.required]),
    topping: new FormControl("", [Validators.required]),
    bebida: new FormControl("", [Validators.required]),
    adicional: new FormControl(""),
    instrucciones: new FormControl("")
  });
  sabores: any;
  
  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private rutaActiva: ActivatedRoute,
    private profileService: ProfileService,
    private productoService: ProductosService
    ) {}
    
  ngOnInit() {
    lightGallery(document.getElementById('lightgallery'))
    this.paramRutas = {
      id: this.rutaActiva.snapshot.params.id
    };
    this.rutaActiva.params.subscribe((params: Params) => {
      this.paramRutas.id = params.id;
    });
    this.getEmpresa();
    this.getProducto(this.paramRutas.id);
    this.putAdicionalesPrecio();
    setTimeout(() => {
      this.cdRef.detectChanges();
    }, 100);
  }
  
  MontoTotal() {
    var montoApagar = this.getTotalCost() * this.cantidad;
    return montoApagar;
  }
  
  AddCarrito(): void {
    /**
    * mensaje de se aÑadiria al carrito
    */
  }
  
  actualizaVista() {
    this.putAdicionalesPrecio();
  }
  
  getEmpresa() {
    this.empresa = this.profileService.getCurrentUser()
    this.HorarioDisponible = this.empresa.abierto != 1 ? true : false;
    if (window.location.href.split("#")[1]) {
      window.location.replace("/preview/product/"+this.paramRutas.id)
    }
  }
  
  getProducto(id) {
    this.productoService.getProducto(id).subscribe((producto: producto) => {
      this.producto = producto;
      $(".carousel-item").css("background-image", 'url(https://ssl.pidespeed.com/' + this.producto.img + ')');
      $(".carousel-item").attr("data-src", 'https://ssl.pidespeed.com/' + this.producto.img);
      $(".carousel-item").attr("data-sub-html", '<h3>'+ this.producto.nombre +'</h3><p>'+ this.producto.descripcion +'</p>');
      if (producto.precio == 0) {
        this.transactions[0] = {
          item: producto.nombre,
          cost: Number(producto.precio1)
        };
      }
      if (producto.tamanos != 0) {
        if(producto.sabores == 0){
          this.getTamanos(producto.tamanos);
          this.detallesProducto.controls["tamano"].setValidators([Validators.required]);
        }
      }else{
        this.detallesProducto.patchValue({
          tamano: {precio: producto.precio1}
        });
        this.actualizaVista();
      }
      if (producto.sirope != 0) {
        this.siropesLength = Number(JSON.parse(producto.sirope).cantidad);
        this.getSiropes(producto.sirope);
        this.detallesProducto.controls["sirope"].setValidators([Validators.required]);
      }else{
        this.detallesProducto.controls["sirope"].setValidators(null);
      }
      if (producto.topping != 0) {
        this.toppingsLength = Number(JSON.parse(producto.topping).cantidad);
        this.getToppings(producto.topping);
        this.detallesProducto.controls["topping"].setValidators([Validators.required]);
      }else{
        this.detallesProducto.controls["topping"].setValidators(null);
      }
      if (producto.sabores != 0) {
        this.getSabores(producto.sabores);
        this.detallesProducto.controls["sabor"].setValidators([Validators.required]);
      } else {
        this.detallesProducto.controls["sabor"].setValidators(null);
      }
      if (producto.bebida != 0) {
        this.bebidasLength = Number(JSON.parse(producto.bebida).cantidad);
        this.getBebidas(producto.bebida);
        this.detallesProducto.controls["bebida"].setValidators([Validators.required]);
      }else{
        this.detallesProducto.controls["bebida"].setValidators(null);
      }
      if (producto.add != 0) {
        this.getAdicionales(producto.add);
      }
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
  
  getTamanos(array) {
    let ids = '';
    JSON.parse(array).forEach((item, index)=>{
      if(index == (array.length - 1)){
        ids += item.id;
      }else{
        ids += item.id + ',';
      }
    })
    this.productoService.getTamanos(ids).subscribe((tamanos:any) => {
      let precioSab = [];
      tamanos.forEach((item, index) => {
        JSON.parse(array).forEach((item1, index1)=>{
          if(this.empresa.modDollar == 1){
            if(item.id == item1.id){
              tamanos[index].precio = this.cambioABss(item1.precio)
            }
          }else{
            if(item.id == item1.id){
              tamanos[index].precio = item1.precio
            }
          }
        })
      });
      this.tamanos = tamanos;
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
  
  getSiropes(array) {
    let ids = JSON.parse(array).ids
    this.productoService.getSiropesByIds(ids).subscribe(siropes => {
      this.siropes = siropes;
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
  getToppings(array) {
    let ids = JSON.parse(array).ids
    this.productoService.getToppingsByIds(ids).subscribe(toppings => {
      this.toppings = toppings;
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
  getBebidas(array) {
    let ids = JSON.parse(array).ids
    this.productoService.getBebidasByIds(ids).subscribe((bebidas:any) => {
      let arrayBebidasTodas = [];
      let arrayBebidas;
      bebidas.forEach((item,index) => {
        arrayBebidasTodas.push(item.tipo_id);
      });
      arrayBebidas = arrayBebidasTodas.filter(function(item, index, array) {
        return array.indexOf(item) === index;
      });
      
      arrayBebidas.forEach((item,index) => {
        this.productoService.getTipoBebidasById(item).subscribe((tipoBebidas:any) => {
          let array = [];
          bebidas.forEach((item2,index2) => {
            if(item2.tipo_id == tipoBebidas.id){
              array.push(item2);
            }
          });
          this.bebidas.push({
            nombre: tipoBebidas.nombre,
            bebidas: array
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
  
  getSabores(array) {
    let ids = '';
    JSON.parse(array).forEach((item, index)=>{
      if(index == (array.length - 1)){
        ids += item.id;
      }else{
        ids += item.id + ',';
      }
    })
    this.productoService.getSaboresByIds(ids).subscribe((sabores:any) => {
      let precioSab = [];
      sabores.forEach((item, index) => {
        JSON.parse(array).forEach((item1, index1)=>{
          if(this.empresa.modDollar == 1){
            if(item.id == item1.id){
              sabores[index].precio = this.cambioABss(item1.precio)
            }
          }else{
            if(item.id == item1.id){
              sabores[index].precio = item1.precio
            }
          }
        })
      });
      this.sabores = sabores;
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
  
  cambioABss(valor){
    let dolar = valor;
    let tasa = 0
    let precioFinal = 0;
    tasa = this.empresa.tasa;
    let precioBs = Math.round(tasa*dolar);
    if(this.empresa.porcent_mas != 0){
      precioBs = precioBs + ((precioBs*this.empresa.porcent_mas)/100);
    }
    precioFinal = precioBs;
    if(this.empresa.redondear_precio == 1){
      let precioBsString = precioBs.toString();
      let ultNums:any = precioBsString.substr(-3);
      let primNums = "";
      if(ultNums == "500"){
        precioFinal = precioBs;
      }else{
        let longitud = precioBsString.length - 3;
        primNums = precioBsString.slice(0,longitud);
        ultNums = Number(ultNums);
        if(ultNums > 500){
          primNums = (Number(primNums) + 1).toString();
          precioFinal = Number(primNums + "000");
        }else{
          precioFinal = Number(primNums + "000")
        }
      }
    }    
    return precioFinal;
  }
  
  getAdicionales(ids) {
    this.productoService.getAdicionalesByIds(ids).subscribe(adicionales => {
      this.adicionales = adicionales;
      for (let adicional of this.adicionales) {
        if (adicional.consulta == 1) {
          this.productoService.getAcomps().subscribe((acomps: any) => {
            let tabla = "";
            for (let acomp of acomps) {
              if (acomp.id == adicional.acomp_id) {
                tabla = acomp.nombre;
              }
            }
            this.productoService.getAcompanamientos(tabla, adicional.empresa_id).subscribe(acompanamiento => {
              this.CategoriaAdicional.push({
                name: adicional.nombre,
                id: adicional.id,
                consulta: adicional.consulta,
                precio: adicional.precio,
                adicional: [acompanamiento]
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
        } else {
          this.CategoriaAdicional.push({
            name: adicional.nombre,
            id: adicional.id,
            consulta: adicional.consulta,
            precio: adicional.precio,
            adicional: [[{ nombre: adicional.nombre, id: adicional.id }]]
          });
        }
      }
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
  
  putPrecioTamano(precio, nombre, nombreTamano) {
    this.detallesProducto.patchValue({
      tamano: {precio: precio}
    });
    
    let nombreProduct = nombre + " - " + nombreTamano;
    this.transactions = [];
    this.transactions[0] = { item: nombreProduct, cost: Number(precio) };
    
    this.precioTotal.precioAd.forEach((item, index) => {
      this.transactions[index + 1] = {
        item: item.nombre,
        cost: Number(item.precio)
      };
    });
  }
  
  putPrecioSabor(precio, nombre, nombreSabor) {
    this.detallesProducto.patchValue({
      tamano: {precio: precio}
    });
    
    let nombreProduct = nombre + " de " + nombreSabor;
    this.transactions = [];
    this.transactions[0] = { item: nombreProduct, cost: Number(precio) };
    
    this.precioTotal.precioAd.forEach((item, index) => {
      this.transactions[index + 1] = {
        item: item.nombre,
        cost: Number(item.precio)
      };
    });
  }
  
  getPrecioAdicional() {
    var precio = 0;
    this.precioAdicional = 0;
    this.precioTotal.precioAd.forEach((item, index) => {
      precio += Number(item.precio);
    });
    this.precioAdicional = precio;
  }
  
  putAdicionalesPrecio() {
    this.precioTotal.precioAd = "";
    this.precioAdicionales = [];
    var detallesProductoObj = this.detallesProducto.value.adicional;
    Object.keys(detallesProductoObj).forEach(key => {
      let nombre;
      if (detallesProductoObj[key][0].nombre != detallesProductoObj[key][0].nombreAd) {
        nombre =
        detallesProductoObj[key][0].nombreAd +
        " - " +
        detallesProductoObj[key][0].nombre;
      } else {
        nombre = detallesProductoObj[key][0].nombreAd;
      }
      this.precioAdicionales.push({
        nombre: nombre,
        precio: Number(detallesProductoObj[key][0].precio)
      });
    });
    let valor1 = this.transactions[0];
    this.transactions = [];
    this.transactions[0] = valor1;
    this.precioTotal.precioAd = this.precioAdicionales;
    
    this.precioTotal.precioAd.forEach((item, index) => {
      this.transactions[index + 1] = {
        item: item.nombre,
        cost: Number(item.precio)
      };
    });
    
    this.getPrecioAdicional();
  }
  
  displayedColumns: string[] = ["item", "cost"];
  
  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions
    .map((t: any) => t.cost)
    .reduce((acc, value) => acc + value, 0);
  }
}
