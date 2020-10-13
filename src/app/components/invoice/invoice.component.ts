import { Component, OnInit } from "@angular/core";
import { InvoiceService } from "../../services/invoice/invoice.service";
import { ProfileService } from "../../services/profile/profile.service";
import * as moment from 'moment';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  NgForm
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.css"]
})
export class InvoiceComponent implements OnInit {
  selectedYear: number = 2020;
  yearActual: number;
  empresa: any;
  meses: any = [];
  mes1: any = [];
  mes2: any = [];
  mes3: any = [];
  mes4: any = [];
  mes5: any = [];
  mes6: any = [];
  mes7: any = [];
  mes8: any = [];
  mes9: any = [];
  mes10: any = [];
  mes11: any = [];
  mes12: any = [];
  
  YearsInvo = new FormGroup({
    year: new FormControl("")
  });
  years = [2020];
  constructor(
    public invoiceService: InvoiceService,
    public profileService: ProfileService
    ) {}
    
  ngOnInit() {
    this.yearActual = Number(moment().format("L").split("/")[2]);
    this.YearsInvo.patchValue({
      year: this.yearActual
    });
    this.getEmpresa();
  }
  
  getEmpresa() {
    this.empresa = this.profileService.getCurrentUser();
    this.invoiceService.getPagos(this.empresa.id).subscribe((pagos: any) => {
      let fActual = moment()
      .format("L")
      .split("/");
      let f1Mes = moment()
      .subtract(1, "month")
      .format("L")
      .split("/");
      let f1Mes1 = new Date(f1Mes['2'], f1Mes['1'], f1Mes['0']);
      let f2Mes = moment()
      .subtract(2, "month")
      .format("L")
      .split("/");
      let f2Mes1 = new Date(f2Mes['2'], f2Mes['1'], f2Mes['0']);
      let f3Mes = moment()
      .subtract(3, "month")
      .format("L")
      .split("/");
      let f3Mes1 = new Date(f3Mes['2'], f3Mes['1'], f3Mes['0']);
      let f4Mes = moment()
      .subtract(4, "month")
      .format("L")
      .split("/");
      let f4Mes1 = new Date(f4Mes['2'], f4Mes['1'], f4Mes['0']);
      let f5Mes = moment()
      .subtract(5, "month")
      .format("L")
      .split("/");
      let f5Mes1 = new Date(f5Mes['2'], f5Mes['1'], f5Mes['0']);
      let f6Mes = moment()
      .subtract(6, "month")
      .format("L")
      .split("/");
      let f6Mes1 = new Date(f6Mes['2'], f6Mes['1'], f6Mes['0']);
      let f7Mes = moment()
      .subtract(7, "month")
      .format("L")
      .split("/");
      let f7Mes1 = new Date(f7Mes['2'], f7Mes['1'], f7Mes['0']);
      let f8Mes = moment()
      .subtract(8, "month")
      .format("L")
      .split("/");
      let f8Mes1 = new Date(f8Mes['2'], f8Mes['1'], f8Mes['0']);
      let f9Mes = moment()
      .subtract(9, "month")
      .format("L")
      .split("/");
      let f9Mes1 = new Date(f9Mes['2'], f9Mes['1'], f9Mes['0']);
      let f10Mes = moment()
      .subtract(10, "month")
      .format("L")
      .split("/");
      let f10Mes1 = new Date(f10Mes['2'], f10Mes['1'], f10Mes['0']);
      let f11Mes = moment()
      .subtract(11, "month")
      .format("L")
      .split("/");
      let f11Mes1 = new Date(f11Mes['2'], f11Mes['1'], f11Mes['0']);
      let f12Mes = moment()
      .subtract(12, "month")
      .format("L")
      .split("/");
      let f12Mes1 = new Date(f12Mes['2'], f12Mes['1'], f12Mes['0']);
      let mes1 = 0;
      let mes2 = 0;
      let mes3 = 0;
      let mes4 = 0;
      let mes5 = 0;
      let mes6 = 0;
      let mes7 = 0;
      let mes8 = 0;
      let mes9 = 0;
      let mes10 = 0;
      let mes11 = 0;
      let mes12 = 0;
      let fechaEmpresa = this.empresa.fecha.split("T")[0].split("-");
      let fechaInic = new Date(fechaEmpresa[0], fechaEmpresa[1], fechaEmpresa[2])
      for (let pago of pagos) {
        let fecha = pago.fecha.split("T")[0].split("-");
        let mes = fecha[1]
        let fecha1 = new Date(fecha[0], fecha[1], fecha[2])
        if(this.YearsInvo.value.year == Number(fecha[0])){
          if (fActual[0] > f1Mes[0]) {
            if (fechaInic < f1Mes1) {
              if (mes == f1Mes[0]) {
                mes1 += Number(pago.total);
              }
            }
          }
          if (fechaInic < f2Mes1) {
            if (mes == f2Mes[0]) {
              mes2 += Number(pago.total);
            }
          }
          if (fechaInic < f3Mes1) {
            if (mes == f3Mes[0]) {
              mes3 += Number(pago.total);
            }
          }
          if (fechaInic < f4Mes1) {
            if (mes == f4Mes[0]) {
              mes4 += Number(pago.total);
            }
          }
          if (fechaInic < f5Mes1) {
            if (mes == f5Mes[0]) {
              mes5 += Number(pago.total);
            }
          }
          if (fechaInic < f6Mes1) {
            if (mes == f6Mes[0]) {
              mes6 += Number(pago.total);
            }
          }
          if (fechaInic < f7Mes1) {
            if (mes == f7Mes[0]) {
              mes7 += Number(pago.total);
            }
          }
          if (fechaInic < f8Mes1) {
            if (mes == f8Mes[0]) {
              mes8 += Number(pago.total);
            }
          }
          if (fechaInic < f9Mes1) {
            if (mes == f9Mes[0]) {
              mes9 += Number(pago.total);
            }
          }
          if (fechaInic < f10Mes1) {
            if (mes == f10Mes[0]) {
              mes10 += Number(pago.total);
            }
          }
          if (fechaInic < f11Mes1) {
            if (mes == f11Mes[0]) {
              mes11 += Number(pago.total);
            }
          }
          if (fechaInic < f11Mes1) {
            if (mes == f11Mes[0]) {
              mes11 += Number(pago.total);
            }
          }
          if (fechaInic < f12Mes1) {
            if (mes == f12Mes[0]) {
              mes12 += Number(pago.total);
            }
          }
        }
      }
      if(mes1 != 0){
        this.mes1.push(f1Mes)
        this.mes1.push(mes1);
        let porcentaje = (mes1*this.empresa.porcentaje)/100;
        this.mes1.push(porcentaje);
      }
      if(mes2 != 0){
        this.mes2.push(f2Mes)
        this.mes2.push(mes2);
        let porcentaje = (mes2*this.empresa.porcentaje)/100;
        this.mes2.push(porcentaje);
      }
      if(mes3 != 0){
        this.mes3.push(f3Mes)
        this.mes3.push(mes3);
        let porcentaje = (mes3*this.empresa.porcentaje)/100;
        this.mes3.push(porcentaje);
      }
      if(mes4 != 0){
        this.mes4.push(f4Mes)
        this.mes4.push(mes4);
        let porcentaje = (mes4*this.empresa.porcentaje)/100;
        this.mes4.push(porcentaje);
      }
      if(mes5 != 0){
        this.mes5.push(f5Mes)
        this.mes5.push(mes5);
        let porcentaje = (mes5*this.empresa.porcentaje)/100;
        this.mes5.push(porcentaje);
      }
      if(mes6 != 0){
        this.mes6.push(f6Mes)
        this.mes6.push(mes6);
        let porcentaje = (mes6*this.empresa.porcentaje)/100;
        this.mes6.push(porcentaje);
      }
      if(mes7 != 0){
        this.mes7.push(f7Mes)
        this.mes7.push(mes7);
        let porcentaje = (mes7*this.empresa.porcentaje)/100;
        this.mes7.push(porcentaje);
      }
      if(mes8 != 0){
        this.mes8.push(f8Mes)
        this.mes8.push(mes8);
        let porcentaje = (mes8*this.empresa.porcentaje)/100;
        this.mes8.push(porcentaje);
      }
      if(mes9 != 0){
        this.mes9.push(f9Mes)
        this.mes9.push(mes9);
        let porcentaje = (mes9*this.empresa.porcentaje)/100;
        this.mes9.push(porcentaje);
      }
      if(mes10 != 0){
        this.mes10.push(f10Mes)
        this.mes10.push(mes10);
        let porcentaje = (mes10*this.empresa.porcentaje)/100;
        this.mes10.push(porcentaje);
      }
      if(mes11 != 0){
        this.mes11.push(f11Mes)
        this.mes11.push(mes11);
        let porcentaje = (mes11*this.empresa.porcentaje)/100;
        this.mes11.push(porcentaje);
      }
      if(mes12 != 0){
        this.mes12.push(f12Mes)
        this.mes12.push(mes12);
        let porcentaje = (mes12*this.empresa.porcentaje)/100;
        this.mes12.push(porcentaje);
      }
      
      if(this.mes1 != ''){
        this.meses.push(this.mes1);
      }
      if(this.mes2 != ''){
        this.meses.push(this.mes2);
      }
      if(this.mes3 != ''){
        this.meses.push(this.mes3);
      }
      if(this.mes4 != ''){
        this.meses.push(this.mes4);
      }
      if(this.mes5 != ''){
        this.meses.push(this.mes5);
      }
      if(this.mes6 != ''){
        this.meses.push(this.mes6);
      }
      if(this.mes7 != ''){
        this.meses.push(this.mes7);
      }
      if(this.mes8 != ''){
        this.meses.push(this.mes8);
      }
      if(this.mes9 != ''){
        this.meses.push(this.mes9);
      }
      if(this.mes10 != ''){
        this.meses.push(this.mes10);
      }
      if(this.mes11 != ''){
        this.meses.push(this.mes11);
      }
      if(this.mes12 != ''){
        this.meses.push(this.mes12);
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
}
