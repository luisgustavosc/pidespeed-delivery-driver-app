import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from "../../services/profile/profile.service";
import {Validators, FormGroup, FormBuilder, FormArray, FormControl } from "@angular/forms";
import Swal from "sweetalert2";
declare var $:any;
declare var lightGallery: any

@Component({
    selector: 'app-zonas',
    templateUrl: './zonas.component.html',
    styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit {
    get zonasArray(){
        return this.zonasForm.get('zonas') as FormArray;
    }
    lazyloader: boolean = false;
    espera = true;
    empresa:any = {nombre: ''};
    //ZONAS
    zonas:any = [];
    zonasEmpresa:any;
    zonaNoDisponible:any = [];
    checksNoDisponibles:any = [];
    valoresZonas:any = [];
    precioAlert = true;
    precioMinAlert = true;
    
    //FORMULARIO
    zonasForm: FormGroup;
    constructor(public profileService: ProfileService, private cdRef: ChangeDetectorRef, private fb: FormBuilder) {}
    
    ngOnInit() {
        this.zonasForm = this.fb.group({
            freeDelivery: [false],
            deliveryPriceAllCond: [false],
            deliveryPriceAll: [""],
            deliveryRequiredPriceCond: [""],
            deliveryRequiredPrice: [""],
            deliveryLimit: [""],
            zonas: this.fb.array([])
        });
        this.getEmpresa();
    }
    
    /*==============================================================
    <-- CONSULTA DE ZONAS -->
    ============================================================== */
    
    getEmpresa() {
        //BUSQUEDA DE LA EMPRESA
        let id = this.profileService.getCurrentUser().id;
        this.profileService.getEmpresa(id).subscribe((empresa) => {
            //seteando la empresa en el local
            this.profileService.setCurrentEmpresa(empresa);
            this.empresa = empresa;
            
            //seteando array de zonas de la empresa
            if (this.empresa.delivery != 0 && this.empresa.delivery != 1) {
                this.zonasEmpresa = JSON.parse(this.empresa.delivery)
                this.getZonas();
                this.recorrerZonas();
                //colocando valores en los formularios
                this.defaultValue();
            } else {
                this.zonasEmpresa = this.empresa.delivery;
                this.getZonas();
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
        })
    }
    
    getZonas(){
        this.profileService.getZonas(this.empresa.ciudad).subscribe((zonas:any) => {
            if (this.zonasEmpresa == 1 || this.zonasEmpresa == 0) {
                this.zonasEmpresa = {
                    "zonas": [],
                    "free":"no",
                    "precioIgual": "no",
                    "precioMin": "no",
                    "horario": "no"
                }
                zonas.forEach(item => {
                    let valor = {id: item.id ,precio: '', precioMin: 'no', horario: 'no'}
                    this.zonasEmpresa.zonas.push(valor);
                });
                this.recorrerZonas();
                this.defaultValue();
                this.zonas = zonas
            } else {
                this.zonas = zonas
            }
            setTimeout(() => {
                this.zonas.forEach(zona => {
                    lightGallery(document.getElementById('lightgallery-'+zona.id));
                    $(".gallery-image-"+zona.id).attr("data-src", 'https://ssl.pidespeed.com/' + zona.img);
                    $(".gallery-image-"+zona.id).attr("data-sub-html", '<h3>'+ zona.nombre +'</h3><p>'+ zona.detalle +'</p>');
                });
            }, 1000);
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
    <-- SETEANDO VALORES -->
    ============================================================== */
    
    defaultValue(){
        if (this.zonasEmpresa != 0 && this.zonasEmpresa != 1) {
            this.zonasForm.patchValue({
                freeDelivery: this.zonasEmpresa.free == "no" ? false : true,
                deliveryPriceAllCond: this.zonasEmpresa.precioIgual == "no" ? false : true,
                deliveryPriceAll: this.zonasEmpresa.precioIgual == "no" ? "" : this.zonasEmpresa.precioIgual,
                deliveryRequiredPriceCond: this.zonasEmpresa.precioMin == "no" ? false : true,
                deliveryRequiredPrice: this.zonasEmpresa.precioMin == "no" ? "" : this.zonasEmpresa.precioMin,
                deliveryLimit: this.zonasEmpresa.horario == "no" ? false : true,
            })
            if(this.zonasEmpresa.free != "no"){
                this.zonasArray.controls.forEach(item=>{
                    item.get("precio").disable()
                })
            }
            if(this.zonasEmpresa.precioMin == "no"){
                this.zonasArray.controls.forEach(item=>{
                    item.get("precioMin").disable()
                })
            }if(this.zonasEmpresa.horario == "no"){
                this.zonasArray.controls.forEach(item=>{
                    item.get("horario").disable()
                })
            }
        }
    }
    
    zonasConds() {
        this.zonasForm.get("freeDelivery").valueChanges.subscribe(v => {
            if (v) {
                this.zonasForm.patchValue({
                    deliveryPriceAllCond: false
                });
                this.zonasArray.controls.forEach(item=>{
                    item.get("precio").disable()
                })
            }else{
                this.zonasArray.controls.forEach(item=>{
                    item.get("precio").enable()
                })
            }
        });
        this.zonasForm.get("deliveryPriceAllCond").valueChanges.subscribe(v => {
            if (v) {
                this.zonasForm.patchValue({
                    freeDelivery: false
                });
                this.zonasForm.get("deliveryPriceAll").enable();
                this.zonasForm.get("deliveryPriceAll").setValidators([Validators.required]);
            } else {
                this.zonasForm.get("deliveryPriceAll").disable();
                this.zonasForm.get("deliveryPriceAll").setValidators(null);
            }
        });
        
        this.zonasForm.get("deliveryRequiredPriceCond").valueChanges.subscribe(v => {
            if (v) {
                this.zonasArray.controls.forEach(item=>{
                    item.get("precioMin").enable()
                })
            } else {
                this.zonasArray.controls.forEach(item=>{
                    item.get("precioMin").disable()
                })
            }
        });
        
        this.zonasForm.get("deliveryLimit").valueChanges.subscribe(v => {
            if (v) {
                this.zonasArray.controls.forEach(item=>{
                    item.get("horario").enable()
                })
            } else {
                this.zonasArray.controls.forEach(item=>{
                    item.get("horario").disable()
                })
            }
        });
        
        this.zonasArray.controls.forEach((item, index) => {3
            item.get("disabled").valueChanges.subscribe(v => {
                if (v) {
                    item.get("precio").disable();
                    item.get("horario").disable();
                    item.get("precioMin").disable();
                }else{
                    item.get("precio").enable();
                    item.get("horario").enable();
                    item.get("precioMin").enable();
                }
            })
        })
    }
    
    /*==============================================================
    <-- VERIFICAR ZONAS, FUNCIONES DE PRECIO Y DESHABILITAR -->
    ============================================================== */
    
    recorrerZonas() {
        this.zonasEmpresa.zonas.forEach((item,index)=>{
            let zonasFormGoup = this.fb.group({
                id: item.id,
                precio: new FormControl("", [Validators.required, Validators.pattern('^[0-9.]+')]),
                horario: new FormControl("", [Validators.pattern('^[0-9.:]+')]),
                precioMin: new FormControl("", [Validators.pattern('^[0-9.]+')]),
                disabled: new FormControl(false)
            })
            if (item.precio == "no") {
                zonasFormGoup.patchValue({
                    disabled: true
                })
                zonasFormGoup.get("precio").setValidators(null);
            } else {
                zonasFormGoup.patchValue({
                    precio: item.precio
                })
                if (item.horario != "no") {
                    zonasFormGoup.patchValue({
                        horario: item.horario
                    })
                }
                if (item.precioMin != "no") {
                    zonasFormGoup.patchValue({
                        precioMin: item.precioMin
                    });
                }
            }
            this.zonasArray.push(zonasFormGoup);
        })
        this.zonasConds();
        this.espera = false;
    }
    
    //SETEANDO PRECIOS GENERALES
    setPrecio(valor){
        let prueba = 0;
        this.zonasEmpresa.zonas.forEach((item,index) => {
            if(valor == "precio"){
                if (item.precio != 'no' && item.precio != 0) {
                    if(this.precioAlert && this.zonasEmpresa.precioIgual == "no") {
                        prueba = 1;
                        Swal.fire({
                            title: "Si colocas un valor aquí todos los campos de precio se verán afectados y cambiarán su valor",
                            text: "¿Estas seguro de que quieres cambiar el valor?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar"
                        }).then(result => {
                            if (result.value) {
                                this.precioAlert = false;
                                this.zonasArray.controls.forEach((item,index) => {
                                    item.patchValue({
                                        precio: this.zonasForm.value.deliveryPriceAll
                                    })
                                });
                            }
                        });
                        return;
                    }
                }
            } else {
                if (item.precioMin != 'no' && item.precioMin != 0) {
                    if (this.precioMinAlert) {
                        prueba = 1;
                        Swal.fire({
                            title: "Si colocas un valor aquí todos los campos de precio minimo se verán afectados y cambiarán su valor",
                            text: "¿Estas seguro de que quieres cambiar el valor?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar"
                        }).then(result => {
                            if (result.value) {
                                this.precioMinAlert = false;
                                this.zonasArray.controls.forEach((item,index) => {
                                    item.patchValue({
                                        precioMin: this.zonasForm.value.deliveryRequiredPrice
                                    })
                                });
                            }
                        });
                        return;
                    }
                }
            }
        });
        if (prueba == 0) {
            this.zonas.forEach((item,index) => {
                if (valor == "precio") {
                    $("input#"+valor+index)[0].value = this.zonasForm.value.deliveryPriceAll;
                } else {
                    $("input#"+valor+index)[0].value = this.zonasForm.value.deliveryRequiredPrice;
                }
            });
        }
    }
    
    /*==============================================================
    <-- GUARDAR ZONAS EN LA BD -->
    ============================================================== */
    
    procesarZonas(){
        this.lazyloader = true;
        let array = {
            zonas: [],
            free:"no",
            precioIgual: "no",
            precioMin: "no",
            horario: "no"
        };
        this.zonas.forEach((item, index) => {
            let valores:any = {id: item.id ,precio: '', precioMin: 'no', horario: 'no'}
            if (!this.zonasArray.value[index].disabled) {
                if (this.zonasForm.value.freeDelivery) {
                    valores.precio = 0;
                } else {
                    valores.precio = Number($("#precio"+index)[0].value);
                }
                if (this.zonasForm.value.deliveryRequiredPriceCond && $("#precioMin"+index)[0].value != '') {
                    valores.precioMin = Number($("#precioMin"+index)[0].value);
                }
                if (this.zonasForm.value.deliveryLimit && $("#horario"+index)[0].value != '') {
                    valores.horario = $("#horario"+index)[0].value;
                }
            } else {
                valores.precio = "no";
            }
            array.zonas.push(valores)
        });
        
        array.free = this.zonasForm.value.freeDelivery ? 'si' : 'no';
        array.precioIgual = this.zonasForm.value.deliveryPriceAllCond ? this.zonasForm.value.deliveryPriceAll : 'no';
        array.precioMin = this.zonasForm.value.deliveryRequiredPriceCond ? this.zonasForm.value.deliveryRequiredPrice : 'no';
        array.horario = this.zonasForm.value.deliveryLimit ? 'si' : 'no';
        let data = {
            delivery : JSON.stringify(array)
        }
        this.profileService.updateProfile(data, this.empresa.id).subscribe(empresa => {
            this.lazyloader = false;
            Swal.fire({
                title: "Se han actualizado los valores del delivery correctamente",
                icon: "success",
                confirmButtonText: "Aceptar"
            })
        },
        err => {
            Swal.fire({
                title: "Ha ocurrido un error intente nuevamente",
                confirmButtonText: "Aceptar"
            })
            this.lazyloader = false;
        })
    }
}
