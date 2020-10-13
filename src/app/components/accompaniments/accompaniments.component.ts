import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ProductosService } from "../../services/productos/productos.service";
import { ProfileService } from "../../services/profile/profile.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
declare var $: any;
@Component({
  selector: "app-accompaniments",
  templateUrl: "./accompaniments.component.html",
  styleUrls: ["./accompaniments.component.css"]
})
export class AccompanimentsComponent implements OnInit {
    selected: number;
    visible: number = 1;
    noVisible: number = 0;
    acomps: any = [];
    empresa: any;
    tablaAcomps: any;
    acomp: any;
    agregar: any = {
        tabla: "algo",
        nombre: "algo"
    };
    editar: any = {
        tabla: "algo",
        nombre: "algo",
        nombreProduct: "algo"
    };
    agregarDatos: any;
    editarDatos: any;

    agregarForm = new FormGroup({
        nombre: new FormControl("", Validators.required),
        tipoAcompBebida: new FormControl(""),
        publish: new FormControl("", Validators.required)
    });

    editarForm = new FormGroup({
        nombre: new FormControl("", Validators.required),
        tipoAcompBebida: new FormControl(""),
        publish: new FormControl("", Validators.required)
    });
    tipoBebidas: any;

    constructor(
        private cdRef: ChangeDetectorRef,
        public productosService: ProductosService,
        public profileService: ProfileService
    ) {}

    ngOnInit() {
        //this.disabledLimit(); // Esto es para habilitar cantidad en acompanamientos
        this.getEmpresa();
        this.getBebidas();
        this.setFormValidators();
    }

    getTablaAcomp(tabla, nombre) {
        this.agregar = {
            nombre: nombre,
            tabla: tabla
        };
    }

    disabledLimit() {
            this.agregarForm.get("ilimitado").valueChanges.subscribe(v => {
            if (v) {
                this.agregarForm.get("cantidad").disable();
            } else {
                this.agregarForm.get("cantidad").enable();
            }
        });

        this.editarForm.get("ilimitado").valueChanges.subscribe(v => {
            if (v) {
                this.editarForm.get("cantidad").disable();
            } else {
                this.editarForm.get("cantidad").enable();
            }
        });
    }

    setFormValidators() {
        const tipoAcompBebidaAgg = this.agregarForm.get("tipoAcompBebida");
        const tipoAcompBebidaEdit = this.agregarForm.get("tipoAcompBebida");
        this.agregar.subscribe(res => {
            if (res.tabla === "bebidas") {
                tipoAcompBebidaAgg.enable();
                tipoAcompBebidaAgg.setValidators([Validators.required]);
            } else {
                tipoAcompBebidaAgg.disable();
                tipoAcompBebidaAgg.setValidators(null);
            }
            tipoAcompBebidaAgg.updateValueAndValidity();
        });
        this.editar.subscribe(res => {
            if (res.nombre === "bebidas") {
                tipoAcompBebidaEdit.enable();
                tipoAcompBebidaEdit.setValidators([Validators.required]);
            } else {
                tipoAcompBebidaEdit.disable();
                tipoAcompBebidaEdit.setValidators(null);
            }
            tipoAcompBebidaEdit.updateValueAndValidity();
        });
    }

    getEmpresa() {
        this.empresa = this.profileService.getCurrentUser();
        this.productosService.getAcomps().subscribe((acomps: any) => {
            this.tablaAcomps = acomps;
            for (let item of this.tablaAcomps) {
                this.productosService.getAcompanamientos(item.nombre, this.empresa.id).subscribe((acomp: any) => {
                    if (item.nombre == "siropes") {
                        this.acomps[0] = {};
                        this.acomps[0] = acomp;
                    }
                    if (item.nombre == "toppings") {
                        this.acomps[1] = {};
                        this.acomps[1] = acomp;
                    }
                    if (item.nombre == "bebidas") {
                        this.acomps[2] = {};
                        this.acomps[2] = acomp;
                    }
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

    getBebidas() {
        this.productosService.getTipoBebidas().subscribe((tipoBebidas: any) => {
            this.tipoBebidas = tipoBebidas;
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

    resetForm(form?: FormGroup) {
        if (form) {
            form.reset();
        }
    }

    createAcomp() {
        let cantidad = -1;
        if (this.agregar.tabla == "bebidas") {
            this.agregarDatos = {
                nombre: this.agregarForm.value.nombre,
                publish: this.agregarForm.value.publish,
                empresa_id: this.empresa.id,
                cantidad: cantidad,
                tipo_id: this.agregarForm.value.tipoAcompBebida
            };
        } else {
            this.agregarDatos = {
                nombre: this.agregarForm.value.nombre,
                publish: this.agregarForm.value.publish,
                empresa_id: this.empresa.id,
                cantidad: cantidad
            };
        }
        this.productosService.setAcomp(this.agregar.tabla, this.agregarDatos).subscribe((acomp: any) => {
            if (acomp.message == "ok") {
                Swal.fire({
                position: "center",
                icon: "success",
                title: "Se ha creado correctamente un nuevo acompañamiento",
                showConfirmButton: false,
                timer: 900
                });
                $("#add").modal("hide");
                this.getEmpresa();
            }
        },
        err => {
            Swal.fire({
                title: "Ha ocurrido un error",
                confirmButtonText: "Aceptar"
            });
        });
    }

    getAcompToUpdate(tabla, id, nombre) {
        this.productosService.getAcompanamiento(tabla, id).subscribe((acomp: any) => {
        this.editar = {
            nombre: nombre,
            tabla: tabla,
            id: acomp.id
        };
        if (this.editar.tabla == "bebidas") {
            this.editarForm.patchValue({
                nombre: acomp.nombre,
                tipoAcompBebida: acomp.tipo_id,
                publish: acomp.publish
            });
            } else {
                this.editarForm.patchValue({
                nombre: acomp.nombre,
                publish: acomp.publish
                });
            }
        },
        err => {
            Swal.fire({
                title: "Ha ocurrido un error intente nuevamente",
                confirmButtonText: "Aceptar"
            });
        });
    }

    updateAcomp() {
        let cantidad = -1;
        if (this.editar.tabla == "bebidas") {
            this.editarDatos = {
                nombre: this.editarForm.value.nombre,
                tipo_id: this.editarForm.value.tipoAcompBebida,
                publish: this.editarForm.value.publish,
                empresa_id: this.empresa.id,
                cantidad: cantidad
            };
        } else {
            this.editarDatos = {
                nombre: this.editarForm.value.nombre,
                publish: this.editarForm.value.publish,
                empresa_id: this.empresa.id,
                cantidad: cantidad
            };
        }
        this.productosService.updateAcomp(this.editar.id, this.editar.tabla, this.editarDatos).subscribe((acomp: any) => {
            if (acomp.message === "ok") {
                Swal.fire({
                position: "center",
                icon: "success",
                title: "Se ha editado correctamente un nuevo acompañamiento",
                showConfirmButton: false,
                timer: 900
                });
                $("#edit").modal("hide");
                this.getEmpresa();
            }
        },
        err => {
            Swal.fire({
                title: "Ha ocurrido un error intente nuevamente",
                confirmButtonText: "Aceptar"
            });
        });
    }

    updatePublish(tabla, id, publish) {
        let data;
        data = {
        publish: publish === 1 ? 0 : 1
        };

        this.productosService.updateAcomp(id, tabla, data).subscribe((add: any) => {
            if (add.message === "ok") {
                this.getEmpresa();
            }
        },
        err => {
            Swal.fire({
                title: "Ha ocurrido un error intente nuevamente",
                confirmButtonText: "Aceptar"
            });
        });
    }

    deleteAcomp(id, tabla) {
        Swal.fire({
        title: "¿Seguro que quieres hacerlo?",
        text: "Eliminarás este acompañamiento.",
        // icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.value) {
                this.productosService.deleteAcomp(id, tabla).subscribe(() => {
                this.getEmpresa();
                },
                err => {
                    Swal.fire({
                        title: "Ha ocurrido un error intente nuevamente",
                        confirmButtonText: "Aceptar"
                    });
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                return false;
            }
        });
    }
}
