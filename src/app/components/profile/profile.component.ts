import { Component, OnInit, ViewChild } from "@angular/core";
import { ProfileService } from "../../services/profile/profile.service";
import { ProductosService } from "../../services/productos/productos.service";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
  AbstractControl
} from "@angular/forms";
import { ImageCroppedEvent } from "ngx-image-cropper";
import Swal from "sweetalert2";
import sha256 from "crypto-js/sha256";
import * as moment from 'moment';
import { } from 'googlemaps';
import {NgxImageCompressService} from 'ngx-image-compress';
declare var $: any;

function passwordConfirming(c: AbstractControl): any {
  if (!c.parent || !c) return;
  const pwd = c.parent.get("password");
  const cpwd = c.parent.get("confirmPassword");

  if (!pwd || !cpwd) return;
  if (pwd.value !== cpwd.value) {
    return { invalid: true };
  }
}
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  //LAZY LOADER Y SERVER
  public URL_SERVER: string = "https://ssl.pidespeed.com/";
  lazyloader: boolean = false;
  espera = true;

  //MAPS
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  polygonAct;
  ubicacionPermitida;
  coordenadas:any;

  //IMAGENES
  imagenPrueba: any;
  imageChangedEvent: any = "";
  croppedImage: any = "";
  imagePortada:any = "";
  nameOfFile: string;
  fileType: string;
  typeImage: string;
  imageLogo:any = "";
  canvasRotation = 0;
  transform: any = {};
  rotation = 0;

  //INFORMACION BASICA
  tasa:any;
  subcategoria = '';
  modDollar = 0;
  precioRedondeado = 0;
  tasaPidespeed = 0;
  selected: number;
  publico: number = 1;
  noPublico: number = 0;
  empresa: any = [];
  email:any;
  categoria: any = '';
  perfilEmpresa: any;
  enLocal = 0;

  //HORARIOS
  time = { hour: Number, minute: Number };
  horario;
  horarioAct:any =  {};
  /*{"0":{"inicio":"","fin":""},"1":{"inicio":"","fin":""},"2":{"inicio":"","fin":""},"3":{"inicio":"","fin":""},"4":{"inicio":"","fin":""},"5":{"inicio":"","fin":""},"6":{"inicio":"","fin":""}*/

  //CAMBIO PASSWORD
  get cpwd() {
    return this.passwordsForm.get("confirmPassword");
  }
  setPasswordVar: boolean;

  /**
  * FORMULARIOS
  */

  //INFORMACION BASICA
  datosForm = new FormGroup({
    direccion: new FormControl("", Validators.required),
    keywords: new FormControl(""),
    publish: new FormControl("", Validators.required),
    mensajeCond:new FormControl(""),
    mensajeCarrito:new FormControl(""),
    enLocal:new FormControl(""),
    modDolar: new FormControl(""),
    precioRedondeado: new FormControl(""),
    precioDolarPorPideSpeed: new FormControl(""),
    instagram: new FormControl(""),
    telefono: new FormControl("", [
      Validators.maxLength(10),
      Validators.minLength(10),
      Validators.pattern("[0-9]*"),
      this.validatePhoneNumber
    ])
  });

  //IMAGEN Y DESCRIPCION
  imageForm = new FormGroup({
    titulo: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    image: new FormControl(""),
    imageLogo: new FormControl("")
  });

  //HORARIOS
  lunes = new FormGroup({
    apertura: new FormControl("", Validators.required),
    cierre: new FormControl("", Validators.required),
    noLaborable: new FormControl("")
  });
  martes = new FormGroup({
    apertura: new FormControl("", Validators.required),
    cierre: new FormControl("", Validators.required),
    noLaborable: new FormControl("")
  });
  miercoles = new FormGroup({
    apertura: new FormControl("", Validators.required),
    cierre: new FormControl("", Validators.required),
    noLaborable: new FormControl("")
  });
  jueves = new FormGroup({
    apertura: new FormControl("", Validators.required),
    cierre: new FormControl("", Validators.required),
    noLaborable: new FormControl("")
  });
  viernes = new FormGroup({
    apertura: new FormControl("", Validators.required),
    cierre: new FormControl("", Validators.required),
    noLaborable: new FormControl("")
  });
  sabado = new FormGroup({
    apertura: new FormControl("", Validators.required),
    cierre: new FormControl("", Validators.required),
    noLaborable: new FormControl("")
  });
  domingo = new FormGroup({
    apertura: new FormControl("", Validators.required),
    cierre: new FormControl("", Validators.required),
    noLaborable: new FormControl("")
  });

  //CAMBIO DE CONTRASEÑA
  accountForm = new FormGroup({
    user: new FormControl(""),
    password: new FormControl("", Validators.required)
  });
  passwordsForm: FormGroup;
  checkPasswordForm: FormGroup;

  // imagen ya optimizada
  logoImgResultAfterCompress:string;

  constructor(
    public productosService: ProductosService,
    public profileService: ProfileService,
    private fb: FormBuilder,
    private imageCompress: NgxImageCompressService,
    ) {}

  ngOnInit() {
    //PASSWORD
    this.checkPasswordForm = this.fb.group({
      code: ["", Validators.required]
    });
    this.passwordsForm = this.fb.group({
      password: [
        "",
        [Validators.required, Validators.maxLength(20), Validators.minLength(8)]
      ],
      confirmPassword: ["", [Validators.required, passwordConfirming]]
    });

    //CONSULTAS
    this.disabledHour();
    this.getEmpresa();
    this.setPasswordVar = false;
  }

  /*==============================================================
  <-- CONSULTA PRINCIPAL -->
  ============================================================== */

  getEmpresa() {
    //TASA PIDESPEED
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

    //BUSQUEDA DE LA EMPRESA
    let id = this.profileService.getCurrentUser().id;
    this.profileService.getEmpresa(id).subscribe((empresa) => {
      //seteando la empresa en el local
      this.profileService.setCurrentEmpresa(empresa);
      this.empresa = empresa;
      this.espera = false;

      //seteando array de horarios de la empresa
      this.horarioAct = JSON.parse(this.empresa.horarios);

      //colocando valores en los formularios
      this.defaultValue();

      //busqueda de categorias
      this.profileService.getCategoria(this.empresa.categoria_id).subscribe((categoria: any) => {
        this.categoria = categoria.nombre;
      },
      err => {
        Swal.fire({
          title: "Ha ocurrido un error buscando su categoria",
          confirmButtonText: "Aceptar"
        });
      });

      //busqueda de subcategorias
      /* this.profileService.getSubcategoria(this.empresa.ruta).subscribe((subcategoria:any) => {
        this.subcategoria = subcategoria[0].nombre
      },
      err => {
        Swal.fire({
          title: "Ha ocurrido un error buscando su subcategoria",
          confirmButtonText: "Aceptar"
        });
      }); */
    },err => {
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
    })
  }

  /*==============================================================
  <-- COLOCANDO INFORMACIÓN EN LOS FORMULARIOS -->
  ============================================================== */

  defaultValue() {
    /**
    * INFORMACÍON BÁSICA
    */
    let contacto;
    if(this.empresa.contacto != ""){
      contacto = JSON.parse(this.empresa.contacto);
    }else{
      contacto = {
        instagram: '',
        telefono: ''
      }
    }
    const mensajeCarrito = this.datosForm.get("mensajeCarrito");
    this.selected = this.empresa.publish;
    this.datosForm.patchValue({
      direccion: this.empresa.direccion,
      keywords: this.empresa.keywords,
      publish: this.empresa.publish,
      mensajeCond: this.empresa.mensaje_carrito != "" ? true : false,
      mensajeCarrito: this.empresa.mensaje_carrito,
      enLocal: this.empresa.en_local === 1 ? true : false,
      modDolar: this.empresa.modDollar === 1 ? true : false,
      precioRedondeado: this.empresa.redondear_precio === 1 ? true : false,
      precioDolarPorPideSpeed: this.empresa.tasa_pidespeed === 1 ? true : false,
      instagram: contacto.instagram,
      telefono: contacto.telefono
    });
    //actualizacion de condiciones
    this.datosForm.get("mensajeCond").valueChanges.subscribe(delCond => {
      if (!delCond) {
        mensajeCarrito.disable();
        mensajeCarrito.setValidators(null);
      } else {
        mensajeCarrito.enable();
        mensajeCarrito.setValidators([Validators.required]);
      }
      mensajeCarrito.updateValueAndValidity();
    });

    /**
    * IMAGEN Y LOGO
    */
    this.imageForm.patchValue({
      description: this.empresa.descripcion
    });

    /**
    * HORARIOS
    */
    if (this.horarioAct[1] == "no laborable") {
      this.lunes.patchValue({
        noLaborable: true
      });
    } else {
      this.lunes.patchValue({
        apertura: this.horarioAct[1].inicio,
        cierre: this.horarioAct[1].fin,
        noLaborable: false
      });
    }
    if (this.horarioAct[2] == "no laborable") {
      this.martes.patchValue({
        noLaborable: true
      });
    } else {
      this.martes.patchValue({
        apertura: this.horarioAct[2].inicio,
        cierre: this.horarioAct[2].fin,
        noLaborable: false
      });
    }
    if (this.horarioAct[3] == "no laborable") {
      this.miercoles.patchValue({
        noLaborable: true
      });
    } else {
      this.miercoles.patchValue({
        apertura: this.horarioAct[3].inicio,
        cierre: this.horarioAct[3].fin,
        noLaborable: false
      });
    }
    if (this.horarioAct[4] == "no laborable") {
      this.jueves.patchValue({
        noLaborable: true
      });
    } else {
      this.jueves.patchValue({
        apertura: this.horarioAct[4].inicio,
        cierre: this.horarioAct[4].fin,
        noLaborable: false
      });
    }
    if (this.horarioAct[5] == "no laborable") {
      this.viernes.patchValue({
        noLaborable: true
      });
    } else {
      this.viernes.patchValue({
        apertura: this.horarioAct[5].inicio,
        cierre: this.horarioAct[5].fin,
        noLaborable: false
      });
    }
    if (this.horarioAct[6] == "no laborable") {
      this.sabado.patchValue({
        noLaborable: true
      });
    } else {
      this.sabado.patchValue({
        apertura: this.horarioAct[6].inicio,
        cierre: this.horarioAct[6].fin,
        noLaborable: false
      });
    }
    if (this.horarioAct[0] == "no laborable") {
      this.domingo.patchValue({
        noLaborable: true
      });
    } else {
      this.domingo.patchValue({
        apertura: this.horarioAct[0].inicio,
        cierre: this.horarioAct[0].fin,
        noLaborable: false
      });
    }

    /**
    * CAMBIO DE CONTRASEÑA
    */
    this.accountForm.get("user").disable();
    this.accountForm.get("password").disable();
    this.accountForm.patchValue({
      user: this.empresa.username,
      password: "********"
    });
  }

  /*==============================================================
  <-- IMAGEN Y LOGO -->
  ============================================================== */

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imagePortada = "tiene valor";
    this.nameOfFile = event.target.files[0].name.replace(/ /g,"-");;
    this.fileType = event.target.files[0].type;
    this.typeImage = this.fileType.split("/")[1];
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;

    this.imageCompress.compressFile(this.croppedImage, 50, 50).then(result => {
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
    Swal.fire({
      title: "Ha ocurrido un error",
      text: "No se ha podido cargar su imagen",
      confirmButtonText: "Aceptar"
    });
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

    //  Cargar y comprimir imagen de Logo empresas
    compressLogoFile() {
        this.imageCompress.uploadFile().then(({image, orientation}) => {
            this.imageCompress.compressFile(image, orientation, 50, 50).then(
                result => {
                    this.logoImgResultAfterCompress = result;
                    var $file = $('#cap'),
                    $label = $file.next("label"),
                    $labelText = $label.find("span");
                    $label.addClass("file-ok").css("background-image", "url(" + this.logoImgResultAfterCompress + ")");
                    $labelText.text('Seleccionada');
                    this.imageLogo = {
                        filename: this.empresa.ruta + "-" + this.empresa.id + "-logo",
                        filetype: (<string>this.logoImgResultAfterCompress).split("/")[1],
                        value: (<string>this.logoImgResultAfterCompress).split(",")[1]
                    };
                }
            );
        });
    }

  // GUARDAR IMAGEN DE PORTADA EN LA BASE DE DATOS
  saveImgPortada() {
    let valImgPortada = this.imagePortada.value;
    this.imagePortada = {
      filename: this.empresa.ruta + "-" + this.empresa.id + "-portada",
      filetype: this.typeImage,
      value: valImgPortada
    };
    this.profileService.setImage(this.imagePortada, this.empresa.id).subscribe((res: any) => {
      if (res.message == "ok") {
        if(this.imageLogo != ""){
          this.saveImgPortadaLogo();
        }else if(this.imageLogo == ""){
          this.guardarDatos();
        }
      } else {
        this.lazyloader = false;
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "Por favor intente nuevamente",
          confirmButtonText: "Aceptar"
        });
      }
    },err => {
      this.lazyloader = false;
      Swal.fire({
        title: "Ha ocurrido un error",
        text: "Por favor intente nuevamente",
        confirmButtonText: "Aceptar"
      });
    });
  }

  // GUARDAR LOGO EN LA BASE DE DATOS
  saveImgPortadaLogo() {
    this.profileService
    .setImageLogo(this.imageLogo, this.empresa.id)
    .subscribe((res: any) => {
      if (res.message == "ok") {
        this.guardarDatos();
      } else {
        this.lazyloader = false;
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "Por favor intente nuevamente",
          confirmButtonText: "Aceptar"
        });
      }
    },err => {
      this.lazyloader = false;
      Swal.fire({
        title: "Ha ocurrido un error",
        text: "Por favor intente nuevamente",
        confirmButtonText: "Aceptar"
      });
    });
  }

  /*==============================================================
  <-- HORARIOS -->
  ============================================================== */

  disabledHour() {
    this.lunes.get("noLaborable").valueChanges.subscribe(v => {
      if (v) {
        this.lunes.get("apertura").disable();
        this.lunes.get("cierre").disable();
        this.lunes.get("apertura").setValidators(null);
        this.lunes.get("cierre").setValidators(null);
      } else {
        this.lunes.get("apertura").enable();
        this.lunes.get("cierre").enable();
        this.lunes.get("apertura").setValidators([Validators.required]);
        this.lunes.get("cierre").setValidators([Validators.required]);
      }
    });
    this.martes.get("noLaborable").valueChanges.subscribe(v => {
      if (v) {
        this.martes.get("apertura").disable();
        this.martes.get("cierre").disable();
        this.martes.get("apertura").setValidators(null);
        this.martes.get("cierre").setValidators(null);
      } else {
        this.martes.get("apertura").enable();
        this.martes.get("cierre").enable();
        this.martes.get("apertura").setValidators([Validators.required]);
        this.martes.get("cierre").setValidators([Validators.required]);
      }
    });
    this.miercoles.get("noLaborable").valueChanges.subscribe(v => {
      if (v) {
        this.miercoles.get("apertura").disable();
        this.miercoles.get("cierre").disable();
        this.miercoles.get("apertura").setValidators(null);
        this.miercoles.get("cierre").setValidators(null);
      } else {
        this.miercoles.get("apertura").enable();
        this.miercoles.get("cierre").enable();
        this.miercoles.get("apertura").setValidators([Validators.required]);
        this.miercoles.get("cierre").setValidators([Validators.required]);
      }
    });
    this.jueves.get("noLaborable").valueChanges.subscribe(v => {
      if (v) {
        this.jueves.get("apertura").disable();
        this.jueves.get("cierre").disable();
        this.jueves.get("apertura").setValidators(null);
        this.jueves.get("cierre").setValidators(null);
      } else {
        this.jueves.get("apertura").enable();
        this.jueves.get("cierre").enable();
        this.jueves.get("apertura").setValidators([Validators.required]);
        this.jueves.get("cierre").setValidators([Validators.required]);
      }
    });
    this.viernes.get("noLaborable").valueChanges.subscribe(v => {
      if (v) {
        this.viernes.get("apertura").disable();
        this.viernes.get("cierre").disable();
        this.viernes.get("apertura").setValidators(null);
        this.viernes.get("cierre").setValidators(null);
      } else {
        this.viernes.get("apertura").enable();
        this.viernes.get("cierre").enable();
        this.viernes.get("apertura").setValidators([Validators.required]);
        this.viernes.get("cierre").setValidators([Validators.required]);
      }
    });
    this.sabado.get("noLaborable").valueChanges.subscribe(v => {
      if (v) {
        this.sabado.get("apertura").disable();
        this.sabado.get("cierre").disable();
        this.sabado.get("apertura").setValidators(null);
        this.sabado.get("cierre").setValidators(null);
      } else {
        this.sabado.get("apertura").enable();
        this.sabado.get("cierre").enable();
        this.sabado.get("apertura").setValidators([Validators.required]);
        this.sabado.get("cierre").setValidators([Validators.required]);
      }
    });
    this.domingo.get("noLaborable").valueChanges.subscribe(v => {
      if (v) {
        this.domingo.get("apertura").disable();
        this.domingo.get("cierre").disable();
        this.domingo.get("apertura").setValidators(null);
        this.domingo.get("cierre").setValidators(null);
      } else {
        this.domingo.get("apertura").enable();
        this.domingo.get("cierre").enable();
        this.domingo.get("apertura").setValidators([Validators.required]);
        this.domingo.get("cierre").setValidators([Validators.required]);
      }
    });
  }

  /*==============================================================
  <-- CAMBIO DE CONTRASEÑA -->
  ============================================================== */

  validateCodeAccess() {
    //this.lazyloader = true;
    let fechaAct = moment().format();
    let fechaSig = this.profileService.getCodigo();
    let codigo = sha256(fechaSig).toString().substr(0,6);
    if(fechaSig >= fechaAct){
      if(this.checkPasswordForm.value.code == codigo){
        this.setPasswordVar = true;
        //this.lazyloader = false;
      }else{
        //this.lazyloader = false;
        Swal.fire({
          title: "El codigo es incorrecto",
          text: "Por favor intente nuevamente",
          confirmButtonText: "Aceptar"
        });
      }
    }else{
      //this.lazyloader = false;
      this.profileService.removeCodigo();
      Swal.fire({
        title: "El codigo ha caducado",
        text: "Envie un nuevo codigo para confirmar",
        confirmButtonText: "Aceptar"
      });
    }
  }

  enviarCod(){
    this.email = this.empresa.email;
    let fecha_siguiente = moment().add(10, 'minutes').format();
    this.profileService.removeCodigo();
    this.profileService.setCodigo(fecha_siguiente);
    let codigo = sha256(fecha_siguiente).toString().substr(0,6);
    let email = {
      email: this.empresa.email,
      codigo: codigo,
      nombre: this.empresa.nombre,
      subject: "Cambio de Contraseña",
      text: "Acabas de solicitar el cambio de tu contraseña, intoduce el siguiente código para actualizarla!"
    };
    this.profileService.EnviarEmailCambio(email).subscribe((email: any) => {
      if(email.message == "ok"){
        //aqui va el cambio
      }else{
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "Por favor intente mas tarde",
          confirmButtonText: "Aceptar"
        });
      }
    },
    err => {
      Swal.fire({
        title: "Ha ocurrido un error",
        text: "Por favor intente mas tarde",
        confirmButtonText: "Aceptar"
      });
    }
    );
  }

  cambiarPass(){
    //this.lazyloader = true;
    let password = {
      password: this.passwordsForm.value.password
    }
    this.profileService.recuperarPassword(this.email, password).subscribe(password => {
      //this.lazyloader = false;
      $("#changePasswordModal").modal("hide");
      Swal.fire({
        title: "Contraseña actualizada",
        confirmButtonText: "Aceptar"
      }).then(result => {
        //this.lazyloader = false;
      });
    },
    err => {
      //this.lazyloader = false;
      Swal.fire({
        title: "Ha ocurrido un error",
        text: "Por favor intente mas tarde",
        confirmButtonText: "Aceptar"
      });
    }
    );
  }

  /*==============================================================
  <-- GUARDAR DATOS -->
  ============================================================== */

  /**
  * PROCESA LOS DATOS DE LOS FORMULARIOS
  */
  save() {
    //PROCESANDO DATOS DE HORARIO
    var lunes;
    var martes;
    var miercoles;
    var jueves;
    var viernes;
    var sabado;
    var domingo;
    let contacto:any = '';
    if (this.lunes.value.noLaborable != true) {
      lunes = {
        inicio: this.lunes.value.apertura,
        fin: this.lunes.value.cierre
      };
    } else {
      lunes = "no laborable";
    }
    if (this.martes.value.noLaborable != true) {
      martes = {
        inicio: this.martes.value.apertura,
        fin: this.martes.value.cierre
      };
    } else {
      martes = "no laborable";
    }
    if (this.miercoles.value.noLaborable != true) {
      miercoles = {
        inicio: this.miercoles.value.apertura,
        fin: this.miercoles.value.cierre
      };
    } else {
      miercoles = "no laborable";
    }
    if (this.jueves.value.noLaborable != true) {
      jueves = {
        inicio: this.jueves.value.apertura,
        fin: this.jueves.value.cierre
      };
    } else {
      jueves = "no laborable";
    }
    if (this.viernes.value.noLaborable != true) {
      viernes = {
        inicio: this.viernes.value.apertura,
        fin: this.viernes.value.cierre
      };
    } else {
      viernes = "no laborable";
    }
    if (this.sabado.value.noLaborable != true) {
      sabado = {
        inicio: this.sabado.value.apertura,
        fin: this.sabado.value.cierre
      };
    } else {
      sabado = "no laborable";
    }
    if (this.domingo.value.noLaborable != true) {
      domingo = {
        inicio: this.domingo.value.apertura,
        fin: this.domingo.value.cierre
      };
    } else {
      domingo = "no laborable";
    }
    this.horario = {
      1: lunes,
      2: martes,
      3: miercoles,
      4: jueves,
      5: viernes,
      6: sabado,
      0: domingo
    };
    //PROCESANDO DATOS DE INFORMACIÓN BÁSICA
    if(this.datosForm.value.modDolar){
      this.modDollar = 1;
    }
    if(this.datosForm.value.precioRedondeado){
      this.precioRedondeado = 1;
    }
    if(this.datosForm.value.precioDolarPorPideSpeed){
      this.tasaPidespeed = 1;
    }
    if(this.datosForm.value.enLocal){
      this.enLocal = 1;
    }
    if(!this.datosForm.value.mensajeCond){
      this.datosForm.value.mensajeCarrito = "";
    }
    if(this.datosForm.value.instagram != "" || this.datosForm.value.telefono != ""){
      contacto = {
        instagram: this.datosForm.value.instagram,
        telefono: this.datosForm.value.telefono
      }
      contacto = JSON.stringify(contacto);
    }
    this.perfilEmpresa = {
      direccion: this.datosForm.value.direccion,
      coordenadas: this.coordenadas ? this.coordenadas : this.empresa.coordenadas,
      descripcion: this.imageForm.value.description,
      keywords: this.datosForm.value.keywords,
      horarios: JSON.stringify(this.horario),
      contacto: contacto,
      publish: this.datosForm.value.publish,
      modDollar: this.modDollar,
      redondear_precio: this.precioRedondeado,
      tasa_pidespeed: this.tasaPidespeed,
      en_local: this.enLocal,
      mensaje_carrito: this.datosForm.value.mensajeCarrito
    };
    Swal.fire({
      title: "¿Seguro que quieres guardar los cambios?",
      text: "Estas editando tu perfil.",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        this.lazyloader = true;
        if(this.coordenadas){
          //SI SE MODIFICAN LAS COORDENADAS
          if(this.ubicacionPermitida){
            //SI LA UBICACION ES PERMITIDA
            if(this.imagePortada != ""){
              //SI SE MODIFICA LA PORTADA
              this.saveImgPortada();
            }else if(this.imageLogo != ""){
              //SI SE MODIFICA EL LOGO
              this.saveImgPortadaLogo();
            }else if(this.imagePortada == "" && this.imageLogo == ""){
              //SI NO HAY MODIFICACIONES EN LAS IMAGENES SE GUARDAN DIRECTAMENTE LOS DATOS
              this.guardarDatos();
            }
          }else{
            //SI LA UBICACION NO ES PERMITIDA
            Swal.fire({
              title: "La direccion seleccionada no es permitida",
              text: "confirme su ubicacion actual o seleccione una ubicacion permitida",
              confirmButtonText: "Aceptar"
            });
          }
        }else{
          if(this.imagePortada != ""){
            //SI SE MODIFICA LA PORTADA
            this.saveImgPortada();
          }else if(this.imageLogo != ""){
            //SI SE MODIFICA EL LOGO
            this.saveImgPortadaLogo();
          }else if(this.imagePortada == "" && this.imageLogo == ""){
            //SI NO HAY MODIFICACIONES EN LAS IMAGENES SE GUARDAN DIRECTAMENTE LOS DATOS
            this.guardarDatos();
          }
        }
      }
    });
  }

  /**
  * GUARDA LOS DATOS EN LA BASE DE DATOS
  */
  guardarDatos(){
    //ACTUALIZANDO DATOS DEL PERFIL
    this.profileService.updateProfile(this.perfilEmpresa, this.empresa.id).subscribe((empresa: any) => {
      //SI LA INFORMACION DE EN LOCAL CAMBIÓ SE ACTUALIZA EN LOS PRODUCTOS
      if(this.empresa.en_local != this.enLocal){
        let datos;
        datos = {
          en_local: this.enLocal
        }
        this.productosService.getProductos(this.empresa.ruta).subscribe((productos: any) => {
          productos.forEach((item,index) => {
            this.productosService.updateProducto(item.id, datos).subscribe((add: any) => {
              if(index == (productos.length - 1)){
                this.actualizarLocal();
              }
            },err => {
              this.lazyloader = false;
              Swal.fire({
                title: "Ha ocurrido un error",
                text: "Por favor intente nuevamente",
                confirmButtonText: "Aceptar"
              });
            });
          });
        }, err => {
          this.lazyloader = false;
          Swal.fire({
            title: "Ha ocurrido un error",
            text: "Por favor intente nuevamente",
            confirmButtonText: "Aceptar"
          });
        });
      }else{
        this.actualizarLocal();
      }
    },
    err => {
      this.lazyloader = false;
      Swal.fire({
        title: "Ha ocurrido un error",
        text: "Por favor intente nuevamente",
        confirmButtonText: "Aceptar"
      });
    });
  }

  /**
  * ACTUALIZAR DATOS EN LOCAL STORAGE
  */
  actualizarLocal(){
    setTimeout(() => {
      this.lazyloader = false;
      Swal.fire({
        title: "Haz realizado los cambios con exito",
        icon: "success",
        confirmButtonText: "Aceptar"
      }).then(result => {
        if(result.value){
          if(this.imageLogo != ""){
            window.location.reload();
          }
        }
      })
    }, 1000);
    this.empresa.direccion = this.datosForm.value.direccion;
    this.empresa.descripcion = this.imageForm.value.description;
    this.empresa.keywords = this.datosForm.value.keywords;
    this.empresa.horarios = JSON.stringify(this.horario);
    this.empresa.contacto = this.perfilEmpresa.contacto,
    this.empresa.publish = this.datosForm.value.publish;
    this.empresa.modDollar = this.modDollar;
    this.empresa.redondear_precio = this.precioRedondeado;
    this.empresa.tasa_pidespeed = this.tasaPidespeed;
    this.empresa.mensaje_carrito = this.datosForm.value.mensajeCarrito;
    this.empresa.en_local = this.enLocal;
    if(this.imagePortada != ""){
      this.empresa.img = `empresas/${this.imagePortada.filename}`;
    }
    if(this.imageLogo != ""){
      this.empresa.logo = `logos/${this.imageLogo.filename}`;
    }
    this.profileService.setCurrentEmpresa(this.empresa);
  }

  /*==============================================================
  <-- GOOGLE MAPS -->
  ============================================================== */

  mapa(coordenadas1?) {
    var map, infoWindow, marker;
    infoWindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 11.406626909728654, lng: -69.66205351784669},
      zoom: 14
    });

    var markers:any = [];

    //poligono en el que se permite el delivery
    var polygon = [
      {lat: 11.404342395194043, lng: -69.69383233025513},
      {lat: 11.403042227107553, lng: -69.69327443078004},
      {lat: 11.401313152089205, lng: -69.69141834214173},
      {lat: 11.402925890997732, lng: -69.68490600585938},
      {lat: 11.404078492749784, lng: -69.68051791191101},
      {lat: 11.405063259311055, lng: -69.6769587759047},
      {lat: 11.395353290414057, lng: -69.67318222561173},
      {lat: 11.392147455434548, lng: -69.6812288526564},
      {lat: 11.386240526033209, lng: -69.67938349285416},
      {lat: 11.388859480867206, lng: -69.66668055095963},
      {lat: 11.38502251002304, lng: -69.6648811242098},
      {lat: 11.392600074804298, lng: -69.65138424844686},
      {lat: 11.402057993626332, lng: -69.644340225089},
      {lat: 11.402932882915614, lng: -69.6532022436742},
      {lat: 11.405650215337397, lng: -69.65075606905262},
      {lat: 11.408503514898062, lng: -69.65092568305487},
      {lat: 11.41216091200564, lng: -69.64916448017426},
      {lat: 11.416374215146728, lng: -69.6477473868652},
      {lat: 11.417505729260487, lng: -69.64546214478452},
      {lat: 11.422675537807619, lng: -69.6459449424072},
      {lat: 11.424431545136466, lng: -69.64382519591551},
      {lat: 11.422723633072202, lng: -69.64336385596495},
      {lat: 11.423707893830281, lng: -69.64129319060545},
      {lat: 11.417605485829688, lng: -69.63722705841064},
      {lat: 11.418108313750869, lng: -69.6327905173938},
      {lat: 11.431958608103768, lng: -69.63132704387696},
      {lat: 11.431655203988749, lng: -69.64422225952148},
      {lat: 11.422122430174152, lng: -69.67350918841491},
      {lat: 11.415215076497978, lng: -69.67121321749816},
      {lat: 11.412271986171156, lng: -69.68475016446484},
      {lat: 11.40819242198226, lng: -69.68389263400304},
      {lat: 11.406863021353281, lng: -69.68566289195287}
    ];

    //mostrando poligono en el mapa
    var polygonAct = new google.maps.Polygon({
      paths: polygon,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: 'transparent'
    });
    polygonAct.setMap(map);
    this.polygonAct = polygonAct;

    //mostrar info de que no se permite delivery
    map.addListener('click', function(e) {
      if(markers != ""){
        setMapOnAll(null);
      }
      if(infoWindow){
        infoWindow.close();
      }
      placeInfo(e.latLng)
    });

    //añadir markador al dar click dentro del poligono
    polygonAct.addListener('click', function(e) {
      if(markers != ""){
        setMapOnAll(null);
      }
      placeMarkerAndPanTo(e.latLng, map);
    });

    if(coordenadas1){
      let coordenadas;
      if(this.coordenadas){
        coordenadas = this.coordenadas
      }else{
        coordenadas = this.empresa.coordenadas
      }
      let primero = coordenadas.slice(1,40);
      let seg = primero.slice(0, -1)
      let coord = seg.split(",")
      let coord2 = {lat: Number(coord[0]), lng: Number(coord[1])}
      placeMarkerAndPanTo(coord2, map)
      ProfileComponent.prototype.verificarUbicacion(true,coordenadas);
    }

    //funcion que pone la informacion fuera del poligono
    function placeInfo(latLng){
      ProfileComponent.prototype.verificarUbicacion(false,latLng);
      infoWindow = new google.maps.InfoWindow({position: latLng});
      infoWindow.setContent('¡No se permite la entrega a domicilio a esa ubicación!');
      infoWindow.open(map);
    }

    //funcion que coloca los marcadores
    function placeMarkerAndPanTo(latLng, map, tipo?) {
      if(infoWindow){
        infoWindow.close();
      }
      marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: latLng,
        map: map,
      });
      map.panTo(latLng);
      markers.push(marker);
      if(tipo == 2){
        google.maps.event.clearListeners(polygonAct, 'click');
        google.maps.event.clearListeners(map, 'click');
        marker.addListener('click', function(e) {
          revisarUbicacion(e.latLng)
        });
      }else{
        ProfileComponent.prototype.verificarUbicacion(true,latLng)
        marker.addListener('click', toggleBounce);
      }
    }

    //animación para los marcadores
    function toggleBounce() {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    }

    //eliminando el marker existente antes de colocar uno nuevo
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
      markers = []
    }

    //GEOLOCALIZACION
    if(!coordenadas1){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var pos1 = {
            lat: position.coords.latitude + 0.005,
            lng: position.coords.longitude + 0.005
          }
          ProfileComponent.prototype.verificarUbicacion(false,`(${pos.lat} , ${pos.lng})`);
          placeMarkerAndPanTo(pos, map, 2)
          if(infoWindow){
            infoWindow.close();
          }
          infoWindow = new google.maps.InfoWindow({position: pos1});
          infoWindow.setContent('¡Por favor da click en el marcador de tu ubicación!');
          infoWindow.open(map);
        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    }

    //funcion de error por si la geolocalizacion falla
    function handleLocationError(val, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(val ? 'Error: ¡Falló la busqueda de tu ubicación!' : 'Error: ¡Debes permitir la localización en tu navegador!');
      infoWindow.open(map);
    }

    //verifica que el marcador este dentro del poligono
    function revisarUbicacion(pos){
      if(google.maps.geometry.poly.containsLocation(pos, polygonAct)){
        infoWindow.close();
        ProfileComponent.prototype.verificarUbicacion(true,pos);
      }else{
        //elimina ubicación y redirige al poligono
        setMapOnAll(null);
        map.panTo({lat: 11.406626909728654, lng: -69.66205351784669});
        infoWindow.close();
        //muestra que la ubicacion no es permitida
        infoWindow = new google.maps.InfoWindow({position: {lat: 11.406626909728654, lng: -69.66205351784669}});
        infoWindow.setContent('¡No se permite la entrega a domicilio en su ubicación actual!, por favor elija una ubicación permitida');
        infoWindow.open(map);
        ProfileComponent.prototype.verificarUbicacion(false,pos);
        //activa la funcion al dar click fuera del poligono
        map.addListener('click', function(e) {
          if(markers != ""){
            setMapOnAll(null);
          }
          if(infoWindow){
            infoWindow.close();
          }
          placeInfo(e.latLng)
        });

        //activa la funcion al dar click dentro del poligono
        polygonAct.addListener('click', function(e) {
          if(markers != ""){
            setMapOnAll(null);
          }
          let coordenadas = e.latLng.toString();
          placeMarkerAndPanTo(e.latLng, map);
        });
      }
    }
  }

  verificarUbicacion(ubicacion, coordenadas){
    this.coordenadas = coordenadas.toString();
    this.ubicacionPermitida = ubicacion;
  }

  /*==============================================================
  <-- FUNCION DE CAMBIO DE PRECIOS DOLARES A BSS -->
  ============================================================== */

  cambio(event){
    let dolar = event.target.value;
    let tasa = 0
    let precioFinal = 0;
    if(!this.datosForm.value.precioDolarPorPideSpeed){
      if(this.empresa.tasa != 0){
        tasa = this.empresa.tasa
      }else{
        tasa = this.tasa
      }
    }else{
      tasa = this.tasa;
    }
    let precioBs = Math.round(tasa*dolar);
    if(this.empresa.porcent_mas != 0){
      precioBs = precioBs + ((precioBs*this.empresa.porcent_mas)/100);
    }
    precioFinal = precioBs;
    if(this.datosForm.value.precioRedondeado){
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
  }

  /**
  * Validar el Numero de Telefono
  */

  validatePhoneNumber(input: FormControl) {
    const validatePhoneNumber = input.value.substring (0 , 1) != "0";
    return validatePhoneNumber ? null : { zeroIswrong: true };
  }
}
