import { Component, OnInit, NgModule } from "@angular/core";
import { ProductosService } from "../../services/productos/productos.service";
import { ProfileService } from "../../services/profile/profile.service";
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { ImageCroppedEvent } from "ngx-image-cropper";
import {NgxImageCompressService} from 'ngx-image-compress';
import { distinctUntilChanged } from 'rxjs/operators';


declare var $: any;

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"]
})
export class AddProductComponent implements OnInit {
  //PROPIEDADES DINAMICAS DE FORMULARIO DE PRECIOS
  get tamanosForm(){
    return this.precioProducto.get('tamanos') as FormArray;
  }
  get tamanos_dl(){
    return this.precioProducto.get('tamanos_dl') as FormArray;
  }
  get saboresForm(){
    return this.precioProducto.get('sabores') as FormArray;
  }
  get sabores_dl(){
    return this.precioProducto.get('sabores_dl') as FormArray;
  }
  //GENERALES
  empresa: any;
  categorias: any;
  adicionales: any = [];
  siropes: any = [];
  toppings: any = [];
  bebidas: any = [];
  sabores: any = [];
  acomps: any = [];
  tamanos: any = [];
  tasa:any = '';

  //PRECIO MINIMO Y VISIBILIDAD
  precioMenor:any;
  visible: number = 1;
  noVisible: number = 0;

  //IMAGEN
  imageChangedEvent: any = "";
  croppedImage: any = "";
  imagePortada: any;
  nameOfFile: string;
  fileType: string = "";
  typeImage: string;
  lazyloader = false;
  canvasRotation = 0;
  transform: any = {};
  rotation = 0;

  /**
  * FORMULARIOS
  */
  //INFORMACION
  infoProducto = new FormGroup({
    nombre: new FormControl("", Validators.required),
    descripcion: new FormControl("", Validators.required),
    cat: new FormControl("", Validators.required),
    acompsCond: new FormControl(false),
    adicionalCond: new FormControl(false),
    adicionales: new FormControl(""),
    saboresCond: new FormControl(false),
    mismoPrecioCond: new FormControl(false),
    tamanoCond: new FormControl(false),
    toGoCond: new FormControl(false),
    toGo: new FormControl(""),
    toGo_dl: new FormControl(""),
    sabores: new FormControl(""),
    acomps: new FormControl(""),
    siropes: new FormControl(""),
    toppings: new FormControl(""),
    bebidas: new FormControl(""),
    cantidadAcomp0: new FormControl(""),
    cantidadAcomp1: new FormControl(""),
    cantidadAcomp2: new FormControl(""),
    tamano: new FormControl(""),
    cantidad: new FormControl("", [Validators.required, Validators.pattern('^[0-9.]+')]),
    ilimitado: new FormControl(false),
    publish: new FormControl("", Validators.required)
  });

  //PRECIO DEL PRODUCTO
  precioProducto = new FormGroup({
    precioUnico: new FormControl("", [Validators.required, Validators.pattern('^[0-9.]+')]),
    precioUnico_dl: new FormControl("", [Validators.required, Validators.pattern('^[0-9.]+')]),
    tamanos: this.fb.array([]),
    tamanos_dl: this.fb.array([]),
    sabores: this.fb.array([]),
    sabores_dl: this.fb.array([])
  });

    // imagen ya optimizada
    logoImgResultAfterCompress:string;

    constructor(
        private router: Router,
        public productosService: ProductosService,
        public profileService: ProfileService,
        private fb: FormBuilder,
        private imageCompress: NgxImageCompressService,
    ) {}

  ngOnInit() {
    this.empresa = this.profileService.getCurrentUser();
    this.inputImage();
    this.tab();
    this.getAdicionales();
    this.getAcomp();
    this.getCategorias();
    this.getTamano();
    this.getSabores();
    this.disabledLimit();
    this.setFormValidators();
  }

  /*==============================================================
  <-- CONSULTAS PRINCIPALES -->
  ============================================================== */

  /**
  * CONSULTA DE ADICIONALES
  */

  getAdicionales() {
    if(this.empresa.modDollar == 0){
      this.precioProducto.controls["precioUnico_dl"].setValidators(null);
    }
    this.productosService.getAdicionales(this.empresa.id).subscribe((adicionales: any) => {
      this.adicionales = adicionales;
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
    this.productosService.getSiropes(this.empresa.id).subscribe((siropes: any) => {
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
    this.productosService.getToppings(this.empresa.id).subscribe((toppings: any) => {
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
    this.productosService.getBebidas(this.empresa.id).subscribe((bebidas: any) => {
      this.bebidas = bebidas;
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

  /**
  * CONSULTA DE ACOMPAÑAMIENTOS
  */

  getAcomp() {
    this.productosService.getAcomps().subscribe((acomps: any) => {
      for (let item of acomps) {
        this.productosService
        .getAcompanamientos(item.nombre, this.empresa.id).subscribe((acomp: any) => {
          if (acomp != "") {
            this.acomps.push({ id: item.id, nombre: item.nombre });
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

  /**
  * CONSULTA DE CATEGORIAS
  */

  getCategorias() {
    this.productosService.getOneConfig(1).subscribe((config:any) => {
      this.tasa = config.tasa
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
    this.productosService.getCategoriasTodas(this.empresa.ruta).subscribe(categorias => {
      this.categorias = categorias;
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

  /**
  * CONSULTA DE TAMAÑOS
  */

  getTamano() {
    this.productosService.getTamanos(this.empresa.id).subscribe((tamanos: any) => {
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

  /**
  * CONSULTA DE SABORES
  */

  getSabores() {
    this.productosService.getSabores(this.empresa.id).subscribe((sabores: any) => {
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

  /*==============================================================
  <-- SETEAR VALORES DE FORMULARIO -->
  ============================================================== */

  setFormValidators() {
    const acomps = this.infoProducto.get("acomps");
    const adicionales = this.infoProducto.get("adicionales");
    const sabores = this.infoProducto.get("sabores");
    const saboresCond = this.infoProducto.get("saboresCond");
    const toGo = this.infoProducto.get("toGo");
    const toGo_dl = this.infoProducto.get("toGo_dl");
    const tamano = this.infoProducto.get("tamano");
    const tamanoCond = this.infoProducto.get("tamanoCond");
    const precioUnico = this.precioProducto.get("precioUnico");
    const precioUnico_dl = this.precioProducto.get("precioUnico_dl");

    //SI LA EMPRESA TRABAJA CON DOLARES
    if(this.empresa.modDollar == 1){
      precioUnico_dl.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
      precioUnico_dl.enable();
    }else{
      precioUnico_dl.disable();
      precioUnico_dl.setValidators(null);
    }

    //PARA LLEVAR
    this.infoProducto.get("toGoCond").valueChanges.subscribe(v => {
      if (v) {
        toGo.disable();
        toGo_dl.disable();
      } else {
        toGo.enable();
        toGo_dl.enable();
      }
    });

    //ACOMPAÑAMIENTOS
    this.infoProducto.get("acompsCond").valueChanges.subscribe(ResAcomp => {
      if (!ResAcomp) {
        acomps.disable();
        acomps.setValidators(null);
      } else {
        acomps.enable();
        acomps.setValidators([Validators.required]);
      }
      acomps.updateValueAndValidity();
    });

    //ADICIONALES
    this.infoProducto.get("adicionalCond").valueChanges.subscribe(ResAdicionales => {
      if (!ResAdicionales) {
        adicionales.disable();
        adicionales.setValidators(null);
      } else {
        adicionales.enable();
        adicionales.setValidators([Validators.required]);
      }
      adicionales.updateValueAndValidity();
    });

    //TAMAÑOS
    this.infoProducto.get("tamanoCond").valueChanges.pipe(distinctUntilChanged()).subscribe(ResTam => {
      if (!ResTam) {
        tamano.disable();
        tamano.setValidators(null);
        saboresCond.enable();
        precioUnico.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
        precioUnico.enable();
        if(this.empresa.modDollar == 1){
          precioUnico_dl.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
          precioUnico_dl.enable();
        }
      } else {
        tamano.enable();
        tamano.setValidators([Validators.required]);
        saboresCond.disable();
        precioUnico.disable();
        precioUnico.setValidators(null);
        if(this.empresa.modDollar == 1){
          precioUnico_dl.disable();
          precioUnico_dl.setValidators(null);
        }
      }

      tamano.updateValueAndValidity();
    });

    //SABORES
    this.infoProducto.get("saboresCond").valueChanges.pipe(distinctUntilChanged()).subscribe(ResSabores => {
      if (!ResSabores) {
        sabores.disable();
        sabores.setValidators(null);
        tamanoCond.enable();
        precioUnico.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
        precioUnico.enable();
        if(this.empresa.modDollar == 1){
          precioUnico_dl.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
          precioUnico_dl.enable();
        }
      } else {
        tamanoCond.disable();
        sabores.enable();
        sabores.setValidators([Validators.required]);
        precioUnico.disable();
        precioUnico.setValidators(null);
        if(this.empresa.modDollar == 1){
          precioUnico_dl.disable();
          precioUnico_dl.setValidators(null);
        }
      }

      sabores.updateValueAndValidity();
    });

    //SABORES MISMO PRECIO
    this.infoProducto.get("mismoPrecioCond").valueChanges.subscribe(mismoPrecio => {
      if (!mismoPrecio) {
        precioUnico.disable();
        precioUnico.setValidators(null);
        if(this.empresa.modDollar == 1){
          precioUnico_dl.disable();
          precioUnico_dl.setValidators(null);
          this.sabores_dl.value.forEach((item, index) => {
            this.sabores_dl.at(index).get('precio').enable();
            this.sabores_dl.at(index).get('precio').setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
            this.sabores_dl.at(index).get('precio').updateValueAndValidity();
          });
        }
        this.saboresForm.value.forEach((item, index) => {
          this.saboresForm.at(index).get('precio').enable();
          this.saboresForm.at(index).get('precio').setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
          this.saboresForm.at(index).get('precio').updateValueAndValidity();
        });
      } else{
        precioUnico.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
        precioUnico.enable();
        if(this.empresa.modDollar == 1){
          precioUnico_dl.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
          precioUnico_dl.enable();
          this.sabores_dl.value.forEach((item, index) => {
            this.sabores_dl.at(index).get('precio').disable();
            this.sabores_dl.at(index).get('precio').clearValidators();
            this.sabores_dl.at(index).get('precio').updateValueAndValidity();
          });
        }
        this.saboresForm.value.forEach((item, index) => {
          this.saboresForm.at(index).get('precio').disable();
          this.saboresForm.at(index).get('precio').clearValidators();
          this.saboresForm.at(index).get('precio').updateValueAndValidity();
        });
      }
    });
  }

  disabledLimit() {
    this.infoProducto.get("ilimitado").valueChanges.subscribe(v => {
      if (v) {
        this.infoProducto.get("cantidad").disable();
      } else {
        this.infoProducto.get("cantidad").enable();
      }
    });
  }

  verificarValor(){
    const siropes = this.infoProducto.get("siropes");
    const toppings = this.infoProducto.get("toppings");
    const bebidas = this.infoProducto.get("bebidas");
    const cantidadAcomp0 = this.infoProducto.get("cantidadAcomp0");
    const cantidadAcomp1 = this.infoProducto.get("cantidadAcomp1");
    const cantidadAcomp2 = this.infoProducto.get("cantidadAcomp2");
    if(this.infoProducto.value.acomps.includes(1)){
      cantidadAcomp0.enable();
      cantidadAcomp0.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
      siropes.enable();
      siropes.setValidators([Validators.required]);
    } else {
      cantidadAcomp0.disable();
      cantidadAcomp0.setValidators(null);
      siropes.disable();
      siropes.setValidators(null);
    }
    if(this.infoProducto.value.acomps.includes(2)){
      cantidadAcomp1.enable();
      cantidadAcomp1.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
      toppings.enable();
      toppings.setValidators([Validators.required]);
    } else {
      cantidadAcomp1.disable();
      cantidadAcomp1.setValidators(null);
      toppings.disable();
      toppings.setValidators(null);
    }
    if(this.infoProducto.value.acomps.includes(3)){
      cantidadAcomp2.enable();
      cantidadAcomp2.setValidators([Validators.required, Validators.pattern('^[0-9.]+')]);
      bebidas.enable();
      bebidas.setValidators([Validators.required]);
    } else {
      cantidadAcomp2.disable();
      cantidadAcomp2.setValidators(null);
      bebidas.disable();
      bebidas.setValidators(null);
    }
    cantidadAcomp0.updateValueAndValidity();
    cantidadAcomp1.updateValueAndValidity();
    cantidadAcomp2.updateValueAndValidity();
  }

  /*==============================================================
  <-- CROP DE IMAGENES -->
  ============================================================== */

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.nameOfFile = this.empresa.id + event.target.files[0].name.replace(/ /g,"-");
    this.fileType = event.target.files[0].type;
    this.typeImage = this.fileType.split("/")[1];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageCompress.compressFile(this.croppedImage, 50, 50).then(
        result => {
            this.logoImgResultAfterCompress = result;

            this.imagePortada = {
                value: (<string>this.logoImgResultAfterCompress).split(",")[1]
            };
        }
    );
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  tab() {
    (function($) {
      var $container = $(".masonry-container");
      $container.imagesLoaded(function() {
        $container.masonry({
          columnWidth: ".card",
          itemSelector: ".card"
        });
      });

      //Reinitialize masonry inside each panel after the relative tab link is clicked -
      $("a[data-toggle=tab]").each(function() {
        var $this = $(this);

        $this.on("shown.bs.tab", function() {
          $container.imagesLoaded(function() {
            $container.masonry({
              columnWidth: ".card",
              itemSelector: ".card"
            });
          });
        }); //end shown
      }); //end each
    });
  }

  inputImage() {
    $("#inputfilePortada input").each(function() {
      // Refs
      var $file = $(this),
      $label = $file.next("label"),
      $labelText = $label.find("span"),
      labelDefault = $labelText.text();

      // When a new file is selected
      $file.on("change", function(event) {
        var fileName = $file
        .val()
        .split("\\")
        .pop(),
        tmppath = URL.createObjectURL(event.target.files[0]);
        //Check successfully selection
        if (fileName) {
          $("#portadaCard").attr("src", `${tmppath}`);
          $label
          .addClass("file-ok")
          .css("background-image", "url(" + tmppath + ")");
          $labelText.text(fileName);
        } else {
          $label.removeClass("file-ok");
          $labelText.text(labelDefault);
        }
      });

      // End loop of file input elements
    });
  }

  /*==============================================================
  <-- MODIFICAR ARRAY DE TAMAÑOS Y SABORES -->
  ============================================================== */

  modificarTamanos(){
    if(this.tamanosForm.value.length > this.infoProducto.value.tamano.length){
      this.tamanosForm.value.forEach((item,index) => {
        if(!this.infoProducto.value.tamano.some(item1 => item.id == item1.id)){
          this.tamanosForm.removeAt(index);
          if(this.empresa.modDollar == 1){
            this.tamanos_dl.removeAt(index);
          }
        }
      })
    }else{
      this.infoProducto.value.tamano.forEach((item,index) => {
        if(!this.tamanosForm.value.some(item1 => item.id == item1.id)){
          let tamanosFormGoup = this.fb.group({
            id: item.id,
            nombre: item.name,
            precio: new FormControl("", [Validators.required, Validators.pattern('^[0-9.]+')])
          })
          let tamanosFormGoup1 = this.fb.group({
            id: item.id,
            nombre: item.name,
            precio: new FormControl("", [Validators.required, Validators.pattern('^[0-9.]+')])
          })
          this.tamanosForm.push(tamanosFormGoup);
          if(this.empresa.modDollar == 1){
            this.tamanos_dl.push(tamanosFormGoup1);
          }
        }
      });
    }
    this.precioMinimo();
  }

  modificarSabores(){
    if(this.saboresForm.value.length > this.infoProducto.value.sabores.length){
      this.saboresForm.value.forEach((item,index) => {
        if(!this.infoProducto.value.sabores.some(item1 => item.id == item1.id)){
          this.saboresForm.removeAt(index);
          if(this.empresa.modDollar == 1){
            this.sabores_dl.removeAt(index);
          }
        }
      })
    }else{
      this.infoProducto.value.sabores.forEach((item,index) => {
        if(!this.saboresForm.value.some(item1 => item.id == item1.id)){
          let saboresFormGoup = this.fb.group({
            id: item.id,
            nombre: item.name,
            precio: new FormControl("", [Validators.required, Validators.pattern('^[0-9.]+')])
          })
          let saboresFormGoup1 = this.fb.group({
            id: item.id,
            nombre: item.name,
            precio: new FormControl("", [Validators.required, Validators.pattern('^[0-9.]+')])
          })
          this.saboresForm.push(saboresFormGoup);
          if(this.empresa.modDollar == 1){
            this.sabores_dl.push(saboresFormGoup1);
          }
        }
      });
    }
    this.precioMinimo();
  }

  /*==============================================================
  <-- FUNCIONES DE CAMBIO DE DOLARES A BSS Y CALCULAR PRECIO MINIMO -->
  ============================================================== */

  cambio(event, posicion){
    let dolar = event.target.value;
    let tasa = 0
    let precioFinal = 0;
    if(this.empresa.tasa_pidespeed == 0 && this.empresa.tasa != 0){
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
    if(posicion != "no"){
      if(this.infoProducto.value.tamanoCond){
        this.tamanosForm.at(posicion).patchValue({precio:precioFinal})
        this.precioMinimo();
      }else if(this.infoProducto.value.saboresCond){
        this.saboresForm.at(posicion).patchValue({precio:precioFinal})
        this.precioMinimo();
      }
    }else{
      this.precioProducto.patchValue({
        precioUnico: precioFinal
      });
    }
  }

  cambioToGo(event){
    let dolar = event.target.value;
    let tasa = 0
    let precioFinal = 0;
    if(this.empresa.tasa_pidespeed == 0 && this.empresa.tasa != 0){
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
    this.infoProducto.patchValue({
      toGo: precioFinal
    });
  }

  precioMinimo(){
    let precio = 0;
    if(this.infoProducto.value.tamanoCond){
      this.tamanosForm.value.forEach(item => {
        if(precio == 0){
          precio = item.precio
        }else{
          if(precio > item.precio){
            precio = item.precio
          }
        }
      });
    }else if(this.infoProducto.value.saboresCond){
      this.saboresForm.value.forEach(item => {
        if(precio == 0){
          precio = item.precio
        }else{
          if(precio > item.precio){
            precio = item.precio
          }
        }
      });
    }
    this.precioMenor = precio;
  }

  /*==============================================================
  <-- GUARGAR PRODUCTO -->
  ============================================================== */

  DProductos() {
    //VARIABLES
    this.lazyloader = true;
    let agregar: any = {};
    let toGo = 1;
    let toGo_dl = 0;
    let mismoPrecio = 0;
    let adicionales:any = '';
    let sabores:any = [];
    let acomp = 0;
    let siropes:any = 0;
    let toppings:any = 0;
    let bebidas:any = 0;
    let tamanos:any = [];
    let precio = 0;
    let precio1 = Number(this.precioProducto.value.precioUnico);
    let precio1_dl = 0;
    let cantidad;
    if(this.precioProducto.value.precioUnico_dl){
      precio1_dl = Number(this.precioProducto.value.precioUnico_dl);
    }

    //VERIFICAR CANTIDAD
    if (this.infoProducto.value.ilimitado) {
      cantidad = -1;
    } else {
      cantidad = this.infoProducto.value.cantidad;
    }

    /**
    * VERIFICAR CHECKBOX
    */
    //VERIFICAR SI SE PUEDE PARA LLEVAR
    if(!this.infoProducto.value.toGoCond){
      if(this.infoProducto.value.toGo && this.infoProducto.value.toGo != 0 && this.infoProducto.value.toGo_dl && this.infoProducto.value.toGo_dl != 0){
        toGo_dl = this.infoProducto.value.toGo_dl;
        toGo = this.infoProducto.value.toGo;
      }else{
        toGo_dl = 0
        toGo = 1;
      }
    }else{
      toGo = 0
      toGo_dl = 0
    }

    //SI TIENE ACOMPAÑAMIENTOS
    if (this.infoProducto.value.acompsCond) {
      acomp = 1;
      if (this.infoProducto.value.acomps.includes(1)) {
        let sirope:any = "";
        let todosSiropes:any = this.infoProducto.value.siropes;
        for(let i =0;i<todosSiropes.length;i++){
          if(i == (this.infoProducto.value.siropes.length - 1)){
            sirope += todosSiropes[i];
          }else{
            sirope += todosSiropes[i] + ',';
          }
        }
        siropes = {
          ids: sirope,
          cantidad: this.infoProducto.value.cantidadAcomp0
        };
        siropes = JSON.stringify(siropes);
      } else {
        siropes = 0;
      }
      if (this.infoProducto.value.acomps.includes(2)) {
        let topping:any = "";
        let todosToppings:any = this.infoProducto.value.toppings;
        for(let i =0;i<todosToppings.length;i++){
          if(i == (this.infoProducto.value.toppings.length - 1)){
            topping += todosToppings[i];
          }else{
            topping += todosToppings[i] + ',';
          }
        }
        toppings = {
          ids: topping,
          cantidad: this.infoProducto.value.cantidadAcomp1
        };
        toppings = JSON.stringify(toppings);
      } else {
        toppings = 0;
      }
      if (this.infoProducto.value.acomps.includes(3)) {
        let bebida:any = "";
        let todosBebidas:any = this.infoProducto.value.bebidas;
        for(let i =0;i<todosBebidas.length;i++){
          if(i == (this.infoProducto.value.bebidas.length - 1)){
            bebida += todosBebidas[i];
          }else{
            bebida += todosBebidas[i] + ',';
          }
        }
        bebidas = {
          ids: bebida,
          cantidad: this.infoProducto.value.cantidadAcomp2
        };
        bebidas = JSON.stringify(bebidas);
      } else {
        bebidas = 0;
      }
    }

    //SI TIENE ADICIONALES
    if (this.infoProducto.value.adicionalCond) {
      let todosAdicionales:any = this.infoProducto.value.adicionales;
      for(let i =0;i<todosAdicionales.length;i++){
        if(i == (this.infoProducto.value.adicionales.length - 1)){
          adicionales += todosAdicionales[i];
        }else{
          adicionales += todosAdicionales[i] + ',';
        }
      }
    } else {
      adicionales = 0;
    }

    //SI TIENE TAMAÑOS
    if(this.infoProducto.value.tamanoCond){
      let todosTamanos:any = this.infoProducto.value.tamano;
      let precioMenor = 0;
      let precioMenor$ = 0;
      for(let i =0;i<todosTamanos.length;i++){
        let valor = this.tamanosForm.value[i].precio;
        let id = this.tamanosForm.value[i].id;
        if(this.empresa.modDollar == 0 && this.empresa.porcent_mas != 0){
          if(Number(valor) != Number(this.tamanosForm.value[i].precio)){
            valor = Number(valor);
            valor = Math.round(valor + ((valor*this.empresa.porcent_mas)/100));
          }
        }
        if(precioMenor == 0){
          precioMenor = Number(valor);
        }else{
          if(precioMenor > Number(valor)){
            precioMenor = Number(valor);
          }
        }

        if(this.empresa.modDollar == 1){
          let valor$ = this.tamanos_dl.value[i].precio;
          if(precioMenor$ == 0){
            precioMenor$ = Number(valor$);
          }else{
            if(precioMenor$ > Number(valor$)){
              precioMenor$ = Number(valor$);
            }
          }
          tamanos.push({id: Number(id), precio:Number(valor$)})
        }else{
          tamanos.push({id: Number(id), precio:Number(valor)})
        }
      }
      precio1_dl = precioMenor$;
      precio1 = precioMenor;
      precio = 1;
    }else {
      tamanos = 0;
    }

    //SI TIENE SABORES
    if(this.infoProducto.value.saboresCond){
      let todosSabores:any = this.infoProducto.value.sabores;
      let precioMenor = 0;
      let precioMenor$ = 0;
      let ids:any = '';
      for(let i =0;i<todosSabores.length;i++){
        if(this.infoProducto.value.mismoPrecioCond){
          if(i == (todosSabores.length - 1)){
            ids += todosSabores[i].id;
          }else{
            ids += todosSabores[i].id + ',';
          }
        }else{
          let valor = this.saboresForm.value[i].precio;
          let id = this.saboresForm.value[i].id;
          if(this.empresa.modDollar == 0 && this.empresa.porcent_mas != 0){
            if(Number(valor) != Number(this.saboresForm.value[i].precio)){
              valor = Number(valor);
              valor = Math.round(valor + ((valor*this.empresa.porcent_mas)/100));
            }
          }
          if(precioMenor == 0){
            precioMenor = Number(valor);
          }else{
            if(precioMenor > Number(valor)){
              precioMenor = Number(valor);
            }
          }
          if(this.empresa.modDollar == 1){
            let valor$ = this.sabores_dl.value[i].precio;
            if(precioMenor$ == 0){
              precioMenor$ = Number(valor$);
            }else{
              if(precioMenor$ > Number(valor$)){
                precioMenor$ = Number(valor$);
              }
            }
            sabores.push({id: Number(id), precio:Number(valor$)})
          }else{
            sabores.push({id: Number(id), precio:Number(valor)})
          }
        }
      }
      precio1_dl = precioMenor$;
      precio1 = precioMenor;
      if(this.infoProducto.value.mismoPrecioCond){
        precio = 0;
        ids = ids.split(",")
        let valor = this.precioProducto.value.precioUnico;
        if(this.empresa.modDollar == 0 && this.empresa.porcent_mas != 0){
          valor = Number(valor);
          valor = Math.round(valor + ((valor*this.empresa.porcent_mas)/100));
        }
        precio1 = valor;

        if(this.empresa.modDollar == 1){
          let valor$ = this.precioProducto.value.precioUnico_dl;
          precio1_dl = valor$;
          ids.forEach(item=>{
            sabores.push({id: Number(item), precio:Number(valor$)})
          })
        }else{
          ids.forEach(item=>{
            sabores.push({id: Number(item), precio:Number(valor)})
          })
        }
        mismoPrecio = 1;
      }else{
        precio = 1;
      }
    }else {
      sabores = 0;
    }

    //SI TIENE PORCENTAJE ADICIONAL PERO NO LA MODALIDAD DOLAR
    if(this.empresa.modDollar == 0 && this.empresa.porcent_mas != 0 && !this.infoProducto.value.saboresCond){
      precio1 = Number(precio1);
      precio1 = Math.round(precio1 + ((precio1*this.empresa.porcent_mas)/100));
    }

    //ARRAY QUE SE ENVIA A LA BD
    agregar = {
      nombre: this.infoProducto.value.nombre,
      precio: precio,
      precio1_dl: precio1_dl,
      precio1: precio1,
      moneda: "Bss",
      descripcion: this.infoProducto.value.descripcion,
      categoria_product_id: this.infoProducto.value.cat,
      acomp: acomp,
      add: adicionales,
      bebida: bebidas,
      topping: toppings,
      tamanos: JSON.stringify(tamanos),
      sirope: siropes,
      sabores: JSON.stringify(sabores),
      mismo_precio: mismoPrecio,
      en_local: this.empresa.en_local,
      to_go$: toGo_dl,
      to_go: toGo,
      empresa_id: this.empresa.id,
      cantidad: cantidad,
      publish: this.infoProducto.value.publish,
      files_id: ''
    };

    //SI NO TIENE IMAGEN DEBE AGREGARLA
    if(this.fileType == ""){
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Debe agregar una imagen para su producto",
        confirmButtonText: "Aceptar"
      });
    }else{
      //SI TIENE IMAGEN SE GUARDA EL PRODUCTO
      let valImgPortada = this.imagePortada.value;
      this.imagePortada = {
          filename:  this.empresa.ruta + "-" + this.nameOfFile,
          filetype: this.typeImage,
          value: valImgPortada
      };
      this.productosService.addImg('productos', this.imagePortada).subscribe((image: any) => {
        agregar.files_id = image.id;
        if (image.message == "ok") {
          this.productosService.setProducto(agregar).subscribe((add: any) => {
            if (add.message === "ok") {
              $("#add").modal("hide");
              this.lazyloader = false;
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Se ha creado correctamente un nuevo producto",
                showConfirmButton: false,
                timer: 1000
              });
              setTimeout(() => {
                this.router.navigateByUrl("products");
              }, 1500);
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
    }
  }
}
