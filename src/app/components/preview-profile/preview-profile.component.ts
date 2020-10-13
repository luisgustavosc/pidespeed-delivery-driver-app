import { Component, OnInit } from '@angular/core';
import { ProductosService } from "../../services/productos/productos.service";
import { ProfileService } from "../../services/profile/profile.service";
import Swal from "sweetalert2";
declare var $: any;

@Component({
    selector: 'app-preview-profile',
    templateUrl: './preview-profile.component.html',
    styleUrls: ['./preview-profile.component.css']
})
export class PreviewProfileComponent implements OnInit {
    productos: Object;
    empresa: any;
    categorias: any = [];
    coordenadas: any;
    horarios: any;
    lazyloaderProducto: boolean = true;
    dias = [
        {dia: 'Lunes', i: 1},
        {dia: 'Martes', i: 2},
        {dia: 'Miércoles', i: 3},
        {dia: 'Jueves', i: 4},
        {dia: 'Viernes', i: 5},
        {dia: 'Sabado', i: 6},
        {dia: 'Domingo', i: 0}
    ]
    
    constructor(public productosService: ProductosService, public profileService: ProfileService ) { }
    
    ngOnInit(): void {
        this.getEmpresa();
        this.getCategorias();
        this.getProductos();
    }
    
    getEmpresa() {
        let id = this.profileService.getCurrentUser().id;
        this.profileService.getEmpresa(id).subscribe((empresa) : any => {
            this.empresa = empresa;
            if (this.empresa.coordenadas != "") {
                var primero = this.empresa.coordenadas.slice(1,40);
                this.coordenadas = primero.slice(0, -1)
            }
            $(".carousel-item").css("background-image", 'url(https://ssl.pidespeed.com/' + this.empresa.img + ')');
            $('#mensaje_carrito[data-toggle="popover"]').attr("data-content", this.empresa.mensaje_carrito);
            
            if (this.empresa.horarios != '{"0":{"inicio":"","fin":""},"1":{"inicio":"","fin":""},"2":{"inicio":"","fin":""},"3":{"inicio":"","fin":""},"4":{"inicio":"","fin":""},"5":{"inicio":"","fin":""},"6":{"inicio":"","fin":""}}'){
                this.horarios = JSON.parse(this.empresa.horarios);
            } else {
                this.horarios = '';
            }
        })
    }
    
    
    getCategorias() {
        this.empresa = this.profileService.getCurrentUser();
        this.productosService.getCategorias(this.empresa.ruta).subscribe((categorias:any) => {
            let categorias1:any = [];
            if (this.empresa.orden != "") {
                JSON.parse(this.empresa.orden).forEach(item => {
                    categorias.forEach(item1 => {
                        if (JSON.parse(this.empresa.orden).some(item => item.id == item1.categoria_product_id)) {
                            if (item.id == item1.categoria_product_id) {
                                categorias1.push(item1)
                            }
                        }else{
                            if (!categorias1.some(item => item.categoria_product_id == item1.categoria_product_id)) {
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
    
    getProductos() {
        this.empresa = this.profileService.getCurrentUser();
        this.productosService.getProductos(this.empresa.ruta).subscribe((productos: any) => {
            this.productos = productos;
            this.lazyloaderProducto =  false
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
