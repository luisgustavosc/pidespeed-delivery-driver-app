import { Component, OnInit } from "@angular/core";
import { ProductosService } from "../../services/productos/productos.service";
import { ProfileService } from "../../services/profile/profile.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
declare var $: any;

@Component({
    selector: 'app-sabores',
    templateUrl: './sabores.component.html',
    styleUrls: ['./sabores.component.css']
})
export class SaboresComponent implements OnInit {
    visibleAdi: any;
    empresa:any;
    visible: number = 1;
    noVisible: number = 0;
    sabores:any;
    idSabor:any;
    tasa:any;
    precioAct:any;
    editar: any = {
        tabla: "algo",
        nombre: "algo",
        nombreProdcut: "algo"
    };
    agregarSaborForm = new FormGroup({
        nombre: new FormControl("", Validators.required),
        publish: new FormControl("", Validators.required)
    });
    editarSaborForm = new FormGroup({
        nombre: new FormControl("", Validators.required),
        publish: new FormControl("", Validators.required)
    });
    constructor(
        public productosService: ProductosService,
        public profileService: ProfileService
        ) {}
        
    ngOnInit() {
        this.getEmpresa();
    }
    
    getEmpresa() {
        this.empresa = this.profileService.getCurrentUser();
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
    
    getSaborToUpdate(id) {
        this.idSabor = id;
        this.productosService.getSabor(id).subscribe((sabor: any) => {
            this.precioAct = sabor.precio;
            this.editarSaborForm.patchValue({
                nombre: sabor.nombre,
                publish: sabor.publish
            });
        },
        err => {
            Swal.fire({
                title: "Ha ocurrido un error intente nuevamente",
                confirmButtonText: "Aceptar"
            });
        });
    }
    
    createSabor() {
        let data = {
            nombre: this.agregarSaborForm.value.nombre,
            cantidad: -1,
            publish: this.agregarSaborForm.value.publish,
            empresa_id: this.empresa.id,
        };
        
        this.productosService.createSabor(data).subscribe((res: any) => {
            if (res.message === "ok") {
                $("#add").modal("hide");
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Se ha creado correctamente un nuevo sabor",
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
    
    updateSabor() {
        let data = {
            nombre: this.editarSaborForm.value.nombre,
            publish: this.editarSaborForm.value.publish,
        };
        
        this.productosService.updateSabor(this.idSabor, data).subscribe((res: any) => {
            if (res.message === "ok") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Se ha editado correctamente el sabor",
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
        this.productosService.updateSabor(id, data).subscribe((res: any) => {
            if (res.message === "ok") {
                this.getEmpresa();
            }
        },
        err => {
            Swal.fire({
                title: "Ha ocurrido un error intente nuevamnente",
                confirmButtonText: "Aceptar"
            });
        });
    }
    
    deleteSabor(id) {
        Swal.fire({
            title: "¿Seguro que quieres hacerlo?",
            text: "Eliminarás este sabor.",
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then(result => {
            if (result.value) {
                this.productosService.deleteSabor(id).subscribe(() => {
                    this.getEmpresa();
                },
                err => {
                    Swal.fire({
                        title: "Ha ocurrido un error intente nuevamente",
                        confirmButtonText: "Aceptar"
                    });
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                return false
            }
        });
    }
    
    resetForm(form) {
        form.reset();
    }
}
    