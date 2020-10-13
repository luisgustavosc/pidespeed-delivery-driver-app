import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ProductosService } from "../../services/productos/productos.service";
import { ProfileService } from "../../services/profile/profile.service";
import Swal from "sweetalert2";
import {
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
declare var $:any;
@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  empresa: any;
  productos: any;
  categorias: any;
  lazyloader = false;
  lazyloaderProducto: boolean = true;
  
  precioProducto = new FormGroup({
    precioUnico: new FormControl("", [Validators.required]),
    precio0: new FormControl(""),
    precio1: new FormControl(""),
    precio2: new FormControl(""),
    precioUnico_dl: new FormControl("", [Validators.required]),
    precio0_dl: new FormControl(""),
    precio1_dl: new FormControl(""),
    precio2_dl: new FormControl("")
  });
  productoInd: any;
  tamanos: any;
  arrayTamanosSelected: any;
  datosPrecio: { precio: any; precio1_dl: any; precio2_dl: any; precio3_dl: any; precio1: any; precio2: any; precio3: any; };
  tasa: number;
  
  constructor(private cdRef: ChangeDetectorRef, public productosService: ProductosService,public profileService: ProfileService) {}
  
  ngOnInit() {
    this.getProductos();
    this.getCategorias();
    this.setFormValidators();
    //this.getTamano();
  }
  
  setFormValidators() {
    const precioUnico = this.precioProducto.get("precioUnico");
    const precio0 = this.precioProducto.get("precio0");
    const precio1 = this.precioProducto.get("precio1");
    const precio2 = this.precioProducto.get("precio2");
    const precioUnico_dl = this.precioProducto.get("precioUnico_dl");
    const precio0_dl = this.precioProducto.get("precio0_dl");
    const precio1_dl = this.precioProducto.get("precio1_dl");
    const precio2_dl = this.precioProducto.get("precio2_dl");
  }
  
  buscar(){
    let valor = $('#buscador').val();
    var registros1 = $("h3.pt-4");
    if(valor == ""){
      for(var i = 0; i < registros1.length;i++) {
        registros1[i].style.display = 'flex';
      }
    } else {
      for(var i = 0; i < registros1.length;i++) {
        registros1[i].style.display = 'none';
      }
    }
    // variable para todos los registros
    var registros = $("div.itemMenu");
    // expresion regular que busca el nombre con case insensitive
    var expression = new RegExp(valor, "i");
    
    for(var i = 0; i < registros.length;i++) {
      registros[i].style.display = 'none';
      
      if(registros[i].childNodes[0].childNodes[0].childNodes[1].textContent.search(expression) != -1) {
        registros[i].style.display = 'flex';
      }
    }
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categorias, event.previousIndex, event.currentIndex);
  }
  
  guardarOrdenCat(){
    this.lazyloader = true;
    let categorias:any = [];
    this.categorias.forEach(item=>{
      categorias.push({id:item.categoria_product_id})
    })
    categorias = JSON.stringify(categorias);
    let data = {
      orden: categorias
    }
    this.profileService.updateProfile(data,this.empresa.id).subscribe(empresa=>{
      this.empresa.orden = categorias;
      this.profileService.setCurrentEmpresa(this.empresa);
      
      this.lazyloader = false;
      $("#catModal").modal("hide");
      Swal.fire({
        title: "Se ha actualizado correctamente!",
        confirmButtonText: "Aceptar"
      });
      
    },err => {
      this.lazyloader = false;
      Swal.fire({
        title: "Ha ocurrido un error intente nuevamente",
        confirmButtonText: "Aceptar"
      });
    })
  }
  
  getProductos() {
    this.empresa = this.profileService.getCurrentUser();
    this.productosService.getProductos(this.empresa.ruta).subscribe((productos: any) => {
      this.productos = productos;
      this.lazyloaderProducto = false;
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
  
  getCategorias() {
    this.empresa = this.profileService.getCurrentUser();
    this.productosService.getCategorias(this.empresa.ruta).subscribe((categorias:any) => {
      let categorias1:any = [];
      if(this.empresa.orden != ""){
        JSON.parse(this.empresa.orden).forEach(item => {
          categorias.forEach(item1 => {
            if(JSON.parse(this.empresa.orden).some(item => item.id == item1.categoria_product_id)){
              if(item.id == item1.categoria_product_id){
                categorias1.push(item1)
              }
            }else{
              if(!categorias1.some(item => item.categoria_product_id == item1.categoria_product_id)){
                categorias1.push(item1)
              }
            }
          });
        });
      }
      this.categorias = categorias1 != "" ? categorias1 : categorias;
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
  
  updatePublish(id, publish) {
    let data;
    
    if (publish === 1) {
      data = {
        publish: 0
      };
    } else {
      data = {
        publish: 1
      };
    }
    
    this.productosService.updateProducto(id, data).subscribe((add: any) => {
      if (add.message === "ok") {
        this.getProductos();
        this.getCategorias();
        this.cdRef.detectChanges();
      }
    },
    err => {
      Swal.fire({
        title: "Ha ocurrido un error intente nuevamente",
        confirmButtonText: "Aceptar"
      });
    });
  }
  
  editarAgotado (id, cantidad) {
    let data;
    
    if (cantidad === 0) {
      data = {
        cantidad: -1
      };
    } else {
      data = {
        cantidad: 0
      };
    }
    
    this.productosService.updateProducto(id, data).subscribe((add: any) => {
      if (add.message === "ok") {
        this.getProductos();
        this.getCategorias();
        this.cdRef.detectChanges();
        if(cantidad === 0) {
          Swal.fire({
            title: "Su producto ahora tiene cantidad ilimitada",
            text: "Si desea colocar una cantidad especifica puede ir a edición de el producto",
            confirmButtonText: "Aceptar"
          });
        }
      }
    },
    err => {
      Swal.fire({
        title: "Ha ocurrido un error intente nuevamente",
        confirmButtonText: "Aceptar"
      });
    });
  }
  
  deleteProd(id) {
    Swal.fire({
      title: "¿Seguro que quieres hacerlo?",
      text: "Eliminarás este producto.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        this.productosService.deleteProducto(id).subscribe(() => {
          this.getProductos();
          this.getCategorias();
          this.cdRef.detectChanges();
        },
        err => {
          Swal.fire({
            title: "Ha ocurrido un error intente nuevamente",
            confirmButtonText: "Aceptar"
          });
        }
        );
      }
    });
  }
  
  /* editarPrecio(id) {
    this.productosService.getProducto(id).subscribe((producto: any) => {
      this.productoInd = producto;
      this.arrayTamanosSelected = this.productoInd.tamanos_ids.split(",");
      
      this.precioProducto.patchValue({
        precioUnico: this.productoInd.precio1,
        precio0: this.productoInd.precio1,
        precio1: this.productoInd.precio2,
        precio2: this.productoInd.precio3,
        precioUnico_dl: this.productoInd.precio1_dl,
        precio0_dl: this.productoInd.precio1_dl,
        precio1_dl: this.productoInd.precio2_dl,
        precio2_dl: this.productoInd.precio3_dl
      });
      
    },
    err => {
      Swal.fire({
        title: "Ha ocurrido un error",
        confirmButtonText: "Aceptar"
      });
    }
    );
  } */
  
  /* getTamano() {
    this.empresa = this.profileService.getCurrentUser();
    this.productosService.getTamanos(this.empresa.id).subscribe((tamanos: any) => {
      this.tamanos = tamanos;
    },
    err => {
      Swal.fire({
        title: "Ha ocurrido un error",
        confirmButtonText: "Aceptar"
      });
    }
    );
  } */
  
  /* actualizarPrecios() {
    this.datosPrecio = {
      precio: this.precioProducto.value.precioUnico,
      precio1_dl: this.precioProducto.value.precio0_dl,
      precio2_dl: this.precioProducto.value.precio1_dl,
      precio3_dl: this.precioProducto.value.precio2_dl,
      precio1: this.precioProducto.value.precio1,
      precio2: this.precioProducto.value.precio2,
      precio3: this.precioProducto.value.precio3,
      
    };
    this.productosService.updateProducto(this.productoInd.id, this.datosPrecio).subscribe((add: any) => {
      if (add.message === "ok") {
        $("#precioProducto").modal("hide");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha editado correctamente el precio",
          showConfirmButton: false,
          timer: 1000
        });
        setTimeout(() => {
        }, 1500);
      }
    },
    err => {
      Swal.fire({
        title: "Ha ocurrido un error",
        confirmButtonText: "Aceptar"
      });
    }
    );
  } */
  
  cambio(event, posicion){
    let dolar = event.target.value;
    let tasa = 0
    let precioFinal = 0;
    if(this.empresa.tasa_pidespeed == 0){
      tasa = this.empresa.tasa
    }else{
      tasa = this.tasa;
    }
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
    if(posicion == 0){
      this.precioProducto.patchValue({
        precio0: precioFinal,
      });
    }else if(posicion == 1){
      this.precioProducto.patchValue({
        precio1: precioFinal,
      });
    }else if(posicion == 2){
      this.precioProducto.patchValue({
        precio2: precioFinal,
      });
    }else{
      this.precioProducto.patchValue({
        precioUnico: precioFinal
      });
    }
  }
}
