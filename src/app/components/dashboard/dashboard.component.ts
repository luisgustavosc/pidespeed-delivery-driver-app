import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../../services/dashboard/dashboard.service";
import { ProfileService } from "../../services/profile/profile.service";
import { OrdersService } from "../../services/orders/orders.service";
import * as moment from 'moment';
import { ProductosService } from "../../services/productos/productos.service";
import Swal from "sweetalert2";
import { FormGroup, FormControl } from '@angular/forms';
declare var $: any;
declare var c3: any;
@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
	lazyloader: boolean = false;
	empresa: any;
	noPagado: any;
	ventasSemana: any;
	ventasMes: any;
	ventasTotales: any;
	ventasDia: any;
	visitas: any;
	ordenes: any;
	terminados: any;
	entregados: any;
	ordenesDia: any = 0;
	usuarios: any = [{
		nombre: ''
	}];
	precioDolar = new FormGroup({
		DolarDelDia: new FormControl("")
	});
	empresaAbierta: { abierto: number; };

	constructor(
		public productosService: ProductosService,
		public dashboardService: DashboardService,
		public profileService: ProfileService,
		public ordersService: OrdersService
		) {}

		ngOnInit() {
			this.getEmpresa();
			this.precioDolar.patchValue({
				DolarDelDia: this.empresa.tasa
			});
		}

		actualizarTasa(){
			let tasa = this.precioDolar.value.DolarDelDia;
			if (tasa == 0){
				Swal.fire({
					position: "center",
					icon: "error",
					title: "No puede colocar su tasa en 0",
					confirmButtonText: "Aceptar"
				});
			} else {
				this.lazyloader = true;
				this.productosService.getAdicionales(this.empresa.id).subscribe((adicionales: any) => {
					adicionales.forEach((item,index) => {
						let precioFinal1 = 0;
						if (item.precio$ != 0) {
							let precioBs = Math.round(tasa*item.precio$);
							if(this.empresa.porcent_mas != 0)  {
								precioBs = precioBs + ((precioBs*this.empresa.porcent_mas)/100);
							}
							precioFinal1 = precioBs;
							if (this.empresa.redondear_precio == 1) {
								let precioBsString = precioBs.toString();
								let ultNums:any = precioBsString.substr(-3);
								let primNums = "";
								if (ultNums == "500") {
									precioFinal1 = precioBs;
								} else {
									let longitud = precioBsString.length - 3;
									primNums = precioBsString.slice(0,longitud);
									ultNums = Number(ultNums);
									if (ultNums > 500){
										primNums = (Number(primNums) + 1).toString();
										precioFinal1 = Number(primNums + "000");
									} else {
										precioFinal1 = Number(primNums + "000")
									}
								}
							}
						}
						let precio = {
							precio: precioFinal1
						}
						if (precioFinal1 != 0) {
							this.productosService.updateAdicional(item.id, precio).subscribe((add: any) => {},
							err => {
								this.lazyloader = false;
								Swal.fire({
									title: "Ha ocurrido un error",
									confirmButtonText: "Aceptar"
								});
								return;
							});
						}
					})
				},
				err =>  {
					this.lazyloader = false;
					Swal.fire({
						title: "Ha ocurrido un error",
						confirmButtonText: "Aceptar"
					});
					return;
				});

				this.productosService.getProductos(this.empresa.ruta).subscribe((productos: any) => {
					productos.forEach((item,index) => {
						let precioFinal1 = 0;
						let precioFinalToGo = 1;
						if (item.precio1_dl != 0) {
							let precioBs = Math.round(tasa*item.precio1_dl);
							if(this.empresa.porcent_mas != 0){
								precioBs = precioBs + ((precioBs*this.empresa.porcent_mas)/100);
							}
							precioFinal1 = precioBs;
							if(this.empresa.redondear_precio == 1){
								let precioBsString = precioBs.toString();
								let ultNums:any = precioBsString.substr(-3);
								let primNums = "";
								if (ultNums == "500") {
									precioFinal1 = precioBs;
								} else {
									let longitud = precioBsString.length - 3;
									primNums = precioBsString.slice(0,longitud);
									ultNums = Number(ultNums);
									if (ultNums > 500) {
										primNums = (Number(primNums) + 1).toString();
										precioFinal1 = Number(primNums + "000");
									} else {
										precioFinal1 = Number(primNums + "000")
									}
								}
							}
						}

						if (item.to_go > 1) {
							let precioBs = Math.round(tasa*item.to_go$);
							precioFinalToGo = precioBs;
							if (this.empresa.redondear_precio == 1) {
								let precioBsString = precioBs.toString();
								let ultNums:any = precioBsString.substr(-3);
								let primNums = "";
								if (ultNums == "500") {
									precioFinalToGo = precioBs;
								} else {
									let longitud = precioBsString.length - 3;
									primNums = precioBsString.slice(0,longitud);
									ultNums = Number(ultNums);
									if (ultNums > 500) {
										primNums = (Number(primNums) + 1).toString();
										precioFinalToGo = Number(primNums + "000");
									} else {
										precioFinalToGo = Number(primNums + "000")
									}
								}
							}
						} else if (item.to_go == 0) {
							precioFinalToGo = 0;
						}
						let precios = {
							precio1: precioFinal1,
							to_go: precioFinalToGo
						}

						this.productosService.updateProducto(item.id, precios).subscribe((add: any) => {
							if (add.message === "ok") {
								if (index == (productos.length - 1)) {
									let data = {
										tasa: tasa
									}
									this.profileService.updateProfile(data,this.empresa.id).subscribe(empresa=>{
										this.lazyloader = false;
										Swal.fire({
											position: "center",
											icon: "success",
											title: "Se han actualizado los precios correctamente",
											confirmButtonText: "Aceptar"
										});
										this.empresa.tasa = tasa;
										this.profileService.setCurrentEmpresa(this.empresa);
									},err => {
										this.lazyloader = false;
										Swal.fire({
											title: "Ha ocurrido un error",
											confirmButtonText: "Aceptar"
										});
										return;
									})
								}
							}
						},
						err => {
							this.lazyloader = false;
							Swal.fire({
								title: "Ha ocurrido un error",
								confirmButtonText: "Aceptar"
							});
							return;
						});
					})
				},
				err => {
					this.lazyloader = false;
					Swal.fire({
						title: "Ha ocurrido un error",
						confirmButtonText: "Aceptar"
					});
					return;
				});
			}
		}

		grafica(ventaArray) {
			if ($("#c3chart_area").length) {
				var chart = c3.generate({
					bindto: "#c3chart_area",
					data: {
						columns: [ventaArray],
						types: {
							ventas: "area-spline"
						},
						colors: {
							ventas: "#fb4a55"
						}
					},
					axis: {
						y: {
							show: true
						},
						x: {
							show: false
						}
					}
				});
			}
		}

		getEmpresa() {
			this.empresa = this.profileService.getCurrentUser();
			let fechaMomentAct = moment().format("L").split("/");
			let fechaAct = `${fechaMomentAct[2]}-${fechaMomentAct[0]}-${fechaMomentAct[1]}`;
			let fechaMes = fechaMomentAct[0];
			let fechaDia = fechaMomentAct[1];
			this.dashboardService.getVentas(this.empresa.id).subscribe((ventas: any) => {
				let fechaMomentAct = moment().format("L").split("/");
				let fechaAct = `${fechaMomentAct[2]}-${fechaMomentAct[0]}-${fechaMomentAct[1]}`;
				let fechaMomentSemana = moment().subtract(7, "day").format("L").split("/");
				let fechaSemanaPas = `${fechaMomentSemana[2]}-${fechaMomentSemana[0]}-${fechaMomentSemana[1]}`;
				let fechaMomentMes = moment().subtract(1, "month").format("L").split("/");
				let fechaMoment1dia = moment().subtract(1, "day").format("L").split("/");
				let fechaMoment2dia = moment().subtract(2, "day").format("L").split("/");
				let fechaMoment3dia = moment().subtract(3, "day").format("L").split("/");
				let fechaMoment4dia = moment().subtract(4, "day").format("L").split("/");
				let fechaMoment5dia = moment().subtract(5, "day").format("L").split("/");
				let fechaMoment6dia = moment().subtract(6, "day").format("L").split("/");
				let fecha1dia = `${fechaMoment1dia[2]}-${fechaMoment1dia[0]}-${fechaMoment1dia[1]}`;
				let fecha2dia = `${fechaMoment2dia[2]}-${fechaMoment2dia[0]}-${fechaMoment2dia[1]}`;
				let fecha3dia = `${fechaMoment3dia[2]}-${fechaMoment3dia[0]}-${fechaMoment3dia[1]}`;
				let fecha4dia = `${fechaMoment4dia[2]}-${fechaMoment4dia[0]}-${fechaMoment4dia[1]}`;
				let fecha5dia = `${fechaMoment5dia[2]}-${fechaMoment5dia[0]}-${fechaMoment5dia[1]}`;
				let fecha6dia = `${fechaMoment6dia[2]}-${fechaMoment6dia[0]}-${fechaMoment6dia[1]}`;
				let noPagado = 0;
				let ventasSemana = 0;
				let ventasMes = 0;
				let ventasTotales = 0;
				let ventasDia = 0;
				let diaAct = [];
				let dia1 = [];
				let dia2 = [];
				let dia3 = [];
				let dia4 = [];
				let dia5 = [];
				let dia6 = [];
				for (let venta of ventas) {
					let fecha = venta.fecha.split("T");
					var mes = fecha[0].split("-")[1];
					var dia = fecha[0].split("-")[2];

					if (venta.pagado != 0) {
						if (fecha[0] >= fechaSemanaPas) {
							ventasSemana += venta.total;
						}
						if (fechaMes == mes) {
							ventasMes += venta.total;
						}
						ventasTotales += venta.total;
					}

					if (fechaAct == fecha[0]) {
						ventasDia += venta.total;
					}

					if (venta.pagado == 0) {
						noPagado += venta.total;
					}

					if (fecha[0] == fechaAct) {
						diaAct.push(venta);
					}
					if (fecha[0] == fecha1dia) {
						dia1.push(venta);
					}
					if (fecha[0] == fecha2dia) {
						dia2.push(venta);
					}
					if (fecha[0] == fecha3dia) {
						dia3.push(venta);
					}
					if (fecha[0] == fecha4dia) {
						dia4.push(venta);
					}
					if (fecha[0] == fecha5dia) {
						dia5.push(venta);
					}
					if (fecha[0] == fecha6dia) {
						dia6.push(venta);
					}
				}
				this.noPagado = noPagado;
				this.ventasSemana = ventasSemana - (ventasSemana * this.empresa.porcentaje) / 100;
				this.ventasMes = ventasMes - (ventasMes * this.empresa.porcentaje) / 100;
				this.ventasTotales = ventasTotales - (ventasTotales * this.empresa.porcentaje) / 100;
				this.ventasDia = ventasDia - (ventasDia * this.empresa.porcentaje) / 100;

				let ventaArray = [
					"ventas",
					dia6.length,
					dia5.length,
					dia4.length,
					dia3.length,
					dia2.length,
					dia1.length,
					diaAct.length
				];
				this.grafica(ventaArray);
			},
			err => {
				Swal.fire({
					title: "Ha ocurrido un error al cargar su gráfico de ventas",
					confirmButtonText: "Aceptar"
				});
			});

			this.ordersService.getOrdenes(this.empresa.id).subscribe((ordenes: any) => {
				this.ordenes = ordenes;
				let ordenesDia = [];
				let terminados = [];
				let entregados = [];
				this.ordenes.forEach((orden, index) => {
					this.usuarios[index] = {
						nommbre: ''
					}
					let fecha = orden.fecha.split("T");
					if (fecha[0] == fechaAct) {
						ordenesDia.push(orden);
					}

					if (orden.terminado == 1) {
						terminados.push(orden);
					}

					if (orden.entregado == 1) {
						entregados.push(orden);
					}

					this.dashboardService.getUsuario(orden.usuario_id).subscribe((usuario: any) => {
						this.usuarios[index] = (usuario);
					},
					err => {
						Swal.fire({
							title: "Ha ocurrido un error buscando los usuarios de las ordenes recientes",
							confirmButtonText: "Aceptar"
						});
					});
				});
				this.ordenesDia = ordenesDia.length;
				this.terminados = terminados.length;
				this.entregados = entregados.length;
			},
			err => {
				Swal.fire({
					title: "Ha ocurrido un error buscando sus ordenes recientes",
					confirmButtonText: "Aceptar"
				});
			});

			this.dashboardService.getEmpresa(this.empresa.ruta).subscribe((empresa: any) => {
				this.visitas = empresa.visitas;
			},
			err => {
				Swal.fire({
					title: "Ha ocurrido un error buscando las visitas a su empresa",
					confirmButtonText: "Aceptar"
				});
			});
		}

		Apertura(){
			this.empresa = this.profileService.getCurrentUser();
			if(this.empresa.abierto === 0) {
				this.empresaAbierta = {
					abierto: 1,
				};
			} else {
				this.empresaAbierta = {
					abierto: 0,
				};
			}

			this.profileService.updateProfile(this.empresaAbierta, this.empresa.id).subscribe((empresa: any) => {
				//si empresa.message == "ok" mostrar que todo correcto
				if (empresa.message == "ok") {
					if (this.empresa.abierto === 0) {
						Swal.fire({
							title: "Ahora tu empresa está abierta al público",
							text: "Ahora tus clientes pueden realizar compras!",
							icon: "success",
							confirmButtonText: "Aceptar"
						});
					} else {
						Swal.fire({
							title: "Ahora tu empresa está cerrada",
							text: "Haz cerrado correctamente tu empresa!",
							icon: "success",
							confirmButtonText: "Aceptar"
						});
					}
				} else {
					Swal.fire({
						title: "Ha ocurrido un error",
						text: "Por favor intente nuevamente",
						confirmButtonText: "Aceptar"
					});
				}

				this.empresa.abierto = this.empresaAbierta.abierto;
				this.profileService.setCurrentEmpresa(this.empresa);
			},
			err => {
				Swal.fire({
					title: "Ha ocurrido un error",
					text: "Por favor intente nuevamente",
					confirmButtonText: "Aceptar"
				});
			});
		}
	}
