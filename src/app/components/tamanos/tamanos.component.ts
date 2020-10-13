import { Component, OnInit, ChangeDetectorRef, NgModule } from "@angular/core";
import { ProductosService } from "../../services/productos/productos.service";
import { ProfileService } from "../../services/profile/profile.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
declare var $: any;

@Component({
    selector: "app-tamanos",
    templateUrl: "./tamanos.component.html",
    styleUrls: ["./tamanos.component.css"]
})

export class TamanosComponent implements OnInit {
    visibleAdi: number;
    visible: number = 1;
    noVisible: number = 0;
    maxTamanos = false;
    relacion: number;
    siRelacion: number = 1;
    noRelacion: number = 0;
    empresa: any;
    acomps: any = [];
    tamanos: any = [];
    idTamano: any;
    tipoBebidasTodas: any = [];
    tipoBebidasNum: any = [];
    tipoBebidas: any = [];
    relacionAcomp: any;
    editar: any = {
        tabla: "algo",
        nombre: "algo",
        nombreProdcut: "algo"
    };
    agregarTamanoForm = new FormGroup({
        nombre: new FormControl("", Validators.required),
        publish: new FormControl("", Validators.required)
    });
    editarTamanoForm = new FormGroup({
        nombre: new FormControl("", Validators.required),
        publish: new FormControl("", Validators.required)
    });
    tamanoEdit: any;
    tipoAcompSelected: any;
    bebidaSelected: any;
    tipoAcompBebidaSelected: any;
    
    constructor(private cdRef: ChangeDetectorRef, public productosService: ProductosService, public profileService: ProfileService) {}
    
    ngOnInit() {
        this.getEmpresa();
    }
    
    getEmpresa() {
        this.empresa = this.profileService.getCurrentUser();
        this.productosService.getTamanos(this.empresa.id).subscribe((tamanos: any) => {
            if (tamanos.length >= 3) {
                this.maxTamanos = true;
            } else {
                this.maxTamanos = false;
            }
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
    
    getTamanoToUpdate(id) {
        this.idTamano = id;
        this.productosService.getTamano(id).subscribe((tamano: any) => {
            this.editarTamanoForm.patchValue({
                nombre: tamano.nombre,
                publish: tamano.publish
            });
        },
        err => {
            Swal.fire({
                title: "Ha ocurrido un error intente nuevamente",
                confirmButtonText: "Aceptar"
            });
        });
    }
    
    resetForm(form) {
        form.reset();
    }
    
    createTamano() {
        let data = {
            nombre: this.agregarTamanoForm.value.nombre,
            publish: this.agregarTamanoForm.value.publish,
            empresa_id: this.empresa.id
        };
        this.productosService.setTamano(data).subscribe((add: any) => {
            if (add.message === "ok") {
                $("#add").modal("hide");
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Se ha creado correctamente un nuevo tamaño",
                    showConfirmButton: false,
                    timer: 900
                });
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
    
    updateTamano() {
        let data = {
            nombre: this.editarTamanoForm.value.nombre,
            publish: this.editarTamanoForm.value.publish
        };
        this.productosService.updateTamano(this.idTamano, data).subscribe((add: any) => {
            if (add.message === "ok") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Se ha editado correctamente el tamaño",
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
    
    updatePublish(id, publish) {
        let data;
        data = {
            publish: publish === 1 ? 0 : 1
        };
        this.productosService.updateTamano(id, data).subscribe((add: any) => {
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
    
    deleteTamano(id) {
        Swal.fire({
            title: "¿Seguro que quieres hacerlo?",
            text: "Eliminarás este tamaño.",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.value) {
                this.productosService.deleteTamano(id).subscribe(() => {
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
