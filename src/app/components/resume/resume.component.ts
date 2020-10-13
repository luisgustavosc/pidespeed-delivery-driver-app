import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl
} from "@angular/forms";
import { InvoiceService } from "../../services/invoice/invoice.service";
import { ProfileService } from "../../services/profile/profile.service";
import Swal from "sweetalert2";
import * as moment from 'moment';
@Component({
  selector: "app-resume",
  templateUrl: "./resume.component.html",
  styleUrls: ["./resume.component.css"]
})
export class ResumeComponent implements OnInit {
  empresa: any;
  pagos:any = [];
  porcentaje:any = [];
  ventas:any = [];
  selectedMonth: string = "Septiembre";
  selectedYear: number = 2019;
  actualMonth: any;
  actualYear: number;
  ResumeTime = new FormGroup({
    mes: new FormControl(""),
    year: new FormControl("")
  });
  meses = [
    {id: 1, nombre: "Enero"},
    {id: 2, nombre:"Febrero"},
    {id: 3, nombre:"Marzo"},
    {id: 4, nombre:"Abril"},
    {id: 5, nombre:"Mayo"},
    {id: 6, nombre:"Junio"},
    {id: 7, nombre:"Julio"},
    {id: 8, nombre:"Agosto"},
    {id: 9, nombre:"Septiembre"},
    {id: 10, nombre:"Octubre"},
    {id: 11, nombre:"Noviembre"},
    {id: 12, nombre:"Diciembre"}
  ];
  years = [2020];
  
  constructor(
    public invoiceService: InvoiceService,
    public profileService: ProfileService
    ){}
    
    
  ngOnInit() {
    this.actualMonth = Number(moment().format("L").split("/")[0]);
    this.actualYear = Number(moment().format("L").split("/")[2]);
    this.ResumeTime.patchValue({
      mes: this.actualMonth,
      year: this.actualYear
    });
    this.getEmpresa();
  }
  
  getEmpresa(){
    this.pagos = [];
    this.ventas = [];
    this.empresa = this.profileService.getCurrentUser();
    this.invoiceService.getPagos(this.empresa.id).subscribe((pagos: any) => {
      pagos.forEach((pago,index) => {
        let fecha = pago.fecha.split("T")[0].split("-");
        let mes = fecha[1]
        if(Number(mes) == Number(this.ResumeTime.value.mes)){
          this.pagos.push(pago);
        }
        if(index == pagos.length - 1){
          this.getOrdenes();
        }
      })
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
  
  getOrdenes(){
    this.pagos.forEach((pago,index) => {
      let porcentaje = (pago.total*this.empresa.porcentaje)/100;
      this.porcentaje.push(porcentaje);
      this.invoiceService.getVentas(pago.ventas_ids).subscribe((ventas: any) => {
        ventas.forEach((item, index1) => {
          this.invoiceService.getByEmpresaByPedido(item.empresa_id, item.pedido_id).subscribe((orden: any) => {
            if(orden != ""){
              ventas[index1].codigo = orden[0].codigo
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
        });
        this.ventas[index] = ventas;
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
    });
  }
  
  getTotal(){
    let total = 0;
    for(let pago of this.pagos){
      let porcentaje = (pago.total*this.empresa.porcentaje)/100;
      total += Number(pago.total) - Number(porcentaje);
    }
    return total;
  }
}
  