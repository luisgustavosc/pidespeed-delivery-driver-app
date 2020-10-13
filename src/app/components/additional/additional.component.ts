import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ProductosService } from "../../services/productos/productos.service";
import { ProfileService } from "../../services/profile/profile.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from "sweetalert2";
declare var $: any;
@Component({
	selector: "app-additional",
	templateUrl: "./additional.component.html",
	styleUrls: ["./additional.component.css"]
})
export class AdditionalComponent implements OnInit {
	visibleAdi: number;
	precioAct:any;
	visible: number = 1;
	noVisible: number = 0;
	relacion: number;
	siRelacion: number = 1;
	noRelacion: number = 0;
	empresa: any;
	acomps: any = [];
	adicionales: any = [];
	idAdicional: any;
	tipoBebidasTodas: any = [];
	tipoBebidasNum: any = [];
	tipoBebidas: any = [];
	tipoBebidas1:any = "";
	relacionAcomp: any;
	tasa:any;
	editar: any = {
		tabla: "algo",
		nombre: "algo",
		nombreProdcut: "algo"
	};
	agregarAdicionalForm = new FormGroup({
		nombre: new FormControl("", Validators.required),
		relacion: new FormControl("", Validators.required),
		tipoAcomp: new FormControl("", Validators.required),
		tipoAcompBebida: new FormControl("", Validators.required),
		precio_dls: new FormControl(""),
		precio: new FormControl("", Validators.required),
		publish: new FormControl("", Validators.required)
	});
	editarAdicionalForm = new FormGroup({
		nombre: new FormControl("", Validators.required),
		relacion: new FormControl("", Validators.required),
		tipoAcomp: new FormControl("", Validators.required),
		tipoAcompBebida: new FormControl("", Validators.required),
		precio_dls: new FormControl(""),
		precio: new FormControl("", Validators.required),
		publish: new FormControl("", Validators.required)
	});
	adicionalEdit: any;
	tipoAcompSelected: any;
	bebidaSelected: any;
	tipoAcompBebidaSelected: any;
	
	constructor(
		private cdRef: ChangeDetectorRef,
		public productosService: ProductosService,
		public profileService: ProfileService
		) {}
		
	ngOnInit() {
		this.getEmpresa();
		this.setFormValidators();
	}
	
	setFormValidators() {
		const tipoAcompAgg = this.agregarAdicionalForm.get("tipoAcomp");
		const tipoAcompBebidaAgg = this.agregarAdicionalForm.get("tipoAcompBebida");
		const tipoAcompEdit = this.editarAdicionalForm.get("tipoAcomp");
		const tipoAcompBebidaEdit = this.editarAdicionalForm.get("tipoAcompBebida");
		this.agregarAdicionalForm.get("relacion").valueChanges.subscribe(res => {
			if (res === this.siRelacion) {
				tipoAcompAgg.enable();
				tipoAcompAgg.setValidators([Validators.required]);
			} else {
				tipoAcompAgg.disable();
				tipoAcompAgg.setValidators(null);
			}
			tipoAcompAgg.updateValueAndValidity();
		});
		this.agregarAdicionalForm.get("tipoAcomp").valueChanges.subscribe(res => {
			if (res === 3) {
				tipoAcompBebidaAgg.enable();
				tipoAcompBebidaAgg.setValidators([Validators.required]);
			} else {
				tipoAcompBebidaAgg.disable();
				tipoAcompBebidaAgg.setValidators(null);
			}
			tipoAcompBebidaAgg.updateValueAndValidity();
		});
		this.editarAdicionalForm.get("relacion").valueChanges.subscribe(res => {
			if (res === this.siRelacion) {
				tipoAcompEdit.enable();
				tipoAcompEdit.setValidators([Validators.required]);
			} else {
				tipoAcompEdit.disable();
				tipoAcompEdit.setValidators(null);
			}
			tipoAcompEdit.updateValueAndValidity();
		});
		this.editarAdicionalForm.get("tipoAcomp").valueChanges.subscribe(res => {
			if (res === 3) {
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
		const precio_dls = this.agregarAdicionalForm.get("precio_dls");
		const precio_dls1 = this.editarAdicionalForm.get("precio_dls");
		this.empresa = this.profileService.getCurrentUser();
		if (this.empresa.modDollar == 1) {
			precio_dls.enable();
			precio_dls.setValidators([Validators.required]);
			precio_dls1.enable();
			precio_dls1.setValidators([Validators.required]);
		} else {
			precio_dls.disable();
			precio_dls.setValidators(null);
			precio_dls1.disable();
			precio_dls1.setValidators(null);
		}
		
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
		})
		
		this.acomps = [];
		this.adicionales = [];
		this.tipoBebidasTodas = [];
		this.tipoBebidasNum = [];
		this.tipoBebidas = [];
		this.productosService.getAdicionales(this.empresa.id).subscribe((adicionales: any) => {
			for (let adicional of adicionales) {
				if (adicional.consulta === 1) {
					this.productosService.getAcomp(adicional.acomp_id).subscribe((acomp: any) => {
						adicional.tabla = acomp.nombre;
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
					adicional.tabla = "sin relación";
				}
			}
			this.adicionales = adicionales;
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
		
		this.productosService.getAcomps().subscribe((acomps: any) => {
			for (let item of acomps) {
				this.productosService.getAcompanamientos(item.nombre, this.empresa.id).subscribe((acomp: any) => {
					if (acomp != "") {
						this.acomps.push({ id: item.id, nombre: item.nombre });
					}
					if (item.nombre == "bebidas" && acomp) {
						for (let item1 of acomp) {
							this.tipoBebidasTodas.push(item1.tipo_id);
						}
						this.arreglarArray();
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
	
	arreglarArray() {
		this.tipoBebidasNum = this.tipoBebidasTodas.filter(function(item, index, array) {
			return array.indexOf(item) === index;
		});
		
		this.productosService.getTipoBebidas().subscribe((tipoBebidas1: any) => {
			this.tipoBebidas1 = tipoBebidas1
			this.tipoBebidas1.forEach((item, index) => {
				this.tipoBebidasNum.forEach((item2, index2) => {
					if ((item.id == item2)) {
						this.tipoBebidas.push({ id: item.id, nombre: item.nombre });
					}
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
	
	getAdditionalToUpdate(id) {
		this.idAdicional = id;
		this.productosService.getAdicional(id).subscribe((adicional: any) => {
			this.precioAct = adicional.precio;
			if (adicional.tipo_acomp != "") {
				this.adicionalEdit = adicional;
				this.relacionAcomp = adicional.consulta;
				this.tipoAcompSelected = adicional.acomp_id;
				this.tipoAcompBebidaSelected = parseInt(adicional.tipo_acomp);
				this.editarAdicionalForm.patchValue({
					nombre: adicional.nombre,
					relacion: adicional.consulta,
					tipoAcomp: adicional.acomp_id,
					tipoAcompBebida: parseInt(adicional.tipo_acomp),
					precio_dls: adicional.precio$,
					precio: adicional.precio,
					publish: adicional.publish
				});
			} else {
				this.adicionalEdit = adicional;
				this.relacionAcomp = adicional.consulta;
				this.tipoAcompSelected = adicional.acomp_id;
				this.tipoAcompBebidaSelected = "";
				this.editarAdicionalForm.patchValue({
					nombre: adicional.nombre,
					relacion: adicional.consulta,
					tipoAcomp: adicional.acomp_id,
					tipoAcompBebida: "",
					precio_dls: adicional.precio$,
					precio: adicional.precio,
					publish: adicional.publish
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
	
	resetTipoBebida(){
		this.editarAdicionalForm.patchValue({
			tipoAcompBebida: 0
		});
	}
	
	resetForm(form) {
		form.reset();
	}
	
	createAdicional() {
		let data = {
			nombre: this.agregarAdicionalForm.value.nombre,
			precio$: this.agregarAdicionalForm.value.precio_dls,
			precio: this.agregarAdicionalForm.value.precio,
			cantidad: -1,
			publish: this.agregarAdicionalForm.value.publish,
			empresa_id: this.empresa.id,
			productos_ids: 0,
			consulta: this.agregarAdicionalForm.value.relacion,
			acomp_id: this.agregarAdicionalForm.value.tipoAcomp,
			tipo_acomp: this.agregarAdicionalForm.value.tipoAcompBebida
		};
		
		
		if(this.empresa.modDollar == 0 && this.empresa.porcent_mas != 0){
			let precio = this.agregarAdicionalForm.value.precio;
			precio = Number(precio);
			precio = Math.round(precio + ((precio*this.empresa.porcent_mas)/100));
			data.precio = precio;
		}
		this.productosService.createAdicional(data).subscribe((add: any) => {
			if (add.message === "ok") {
				$("#add").modal("hide");
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Se ha creado correctamente un nuevo adicional",
					showConfirmButton: false,
					timer: 900
				});
				this.getEmpresa();
			}
		},
		err => {
			Swal.fire({
				title: "Ha ocurrido un error",
				confirmButtonText: "Aceptar"
			});
		}
		);
	}
	
	updateAdicional() {
		let data = {
			nombre: this.editarAdicionalForm.value.nombre,
			precio$: this.editarAdicionalForm.value.precio_dls,
			precio: this.editarAdicionalForm.value.precio,
			publish: this.editarAdicionalForm.value.publish,
			consulta: this.editarAdicionalForm.value.relacion,
			acomp_id: this.editarAdicionalForm.value.tipoAcomp,
			tipo_acomp: this.editarAdicionalForm.value.tipoAcompBebida
		};
		
		if(this.empresa.modDollar == 0 && this.empresa.porcent_mas != 0){
			let precio = this.editarAdicionalForm.value.precio;
			if(this.precioAct != precio){
				precio = Number(precio);
				precio = Math.round(precio + ((precio*this.empresa.porcent_mas)/100));
				data.precio = precio;
			}
		}
		this.productosService.updateAdicional(this.idAdicional, data).subscribe((add: any) => {
			if (add.message === "ok") {
				Swal.fire({
					position: "center",
					icon: "success",
					title: "Se ha editado correctamente el adicional",
					showConfirmButton: false,
					timer: 900
				});
				$("#edit").modal("hide");
				this.getEmpresa();
			}
		},
		err => {
			Swal.fire({
				title: "Ha ocurrido un error",
				confirmButtonText: "Aceptar"
			});
		}
		);
	}
	
	updatePublish(id, publish) {
		let data;
		data = {
			publish: publish === 1 ? 0 : 1
		};
		this.productosService.updateAdicional(id, data).subscribe((add: any) => {
			if (add.message === "ok") {
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
	
	deleteAdicional(id) {
		Swal.fire({
			title: "¿Seguro que quieres hacerlo?",
			text: "Eliminarás este adicional.",
			// icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Aceptar",
			cancelButtonText: "Cancelar"
		}).then(result => {
			if (result.value) {
				this.productosService.deleteAdicional(id).subscribe(() => {
					this.getEmpresa();
				},
				err => {
					Swal.fire({
						title: "Ha ocurrido un error",
						confirmButtonText: "Aceptar"
					});
				}
				);
			} else if (result.dismiss === Swal.DismissReason.cancel) {
			}
		});
	}
	
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
		if(posicion === 'agregar'){
			this.agregarAdicionalForm.patchValue({
				precio: precioFinal,
			});
		}else if(posicion === 'editar'){
			this.editarAdicionalForm.patchValue({
				precio: precioFinal,
			});
		}
	}
}
	