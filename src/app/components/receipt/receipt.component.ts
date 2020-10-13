import { Component, OnInit, Inject } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Content } from "@angular/compiler/src/render3/r3_ast";
import { InvoiceService } from "../../services/invoice/invoice.service";
import { ProfileService } from "../../services/profile/profile.service";
import * as moment from 'moment';
import Swal from "sweetalert2";

declare var xepOnline: any;
@Component({
  selector: "app-receipt",
  templateUrl: "./receipt.component.html",
  styleUrls: ["./receipt.component.css"],
  providers: [{ provide: "Window", useValue: window }]
})
export class ReceiptComponent implements OnInit {
  ciudad;
  estado;
  paramRutas: { fecha: any };
  empresa: any;
  mes: any;
  ano: any;
  porcentaje: any;
  serial: any;
  fecha: any;
  config: any;
  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    public invoiceService: InvoiceService,
    public profileService: ProfileService,
    @Inject("Window") private window: Window
    ) {}
    
  ngOnInit() {
    this.paramRutas = {
      fecha: this.rutaActiva.snapshot.params.factID
    };
    this.rutaActiva.params.subscribe((params: Params) => {
      this.paramRutas.fecha = params.factID;
    });
    this.getEmpresa();
    this.getConfig();
  }
  
  getEmpresa() {
    this.empresa = this.profileService.getCurrentUser();
    this.invoiceService.getCiudad(this.empresa.ciudad).subscribe((ciudad:any) => this.ciudad = ciudad.nombre)
    this.invoiceService.getEstado(this.empresa.estado).subscribe((estado:any) => this.estado = estado.nombre)
    this.invoiceService.getPagos(this.empresa.id).subscribe((pagos: any) => {
      let total = 0;
      let fActual = moment()
      .format("L")
      .split("/");
      let f1Mes = moment()
      .subtract(1, "month")
      .format("L")
      .split("/");
      let f1Mes1 = new Date(f1Mes['2'], f1Mes['1'], f1Mes['0']);
      let mesRecibo = this.paramRutas.fecha.substr(0, 2);
      this.mes = mesRecibo;
      this.ano = this.paramRutas.fecha.substr(2, 6);
      this.serial = this.paramRutas.fecha + this.empresa.id;
      this.fecha = {
        [0]: this.paramRutas.fecha.substr(0, 2)
      };
      let fechaEmpresa = this.empresa.fecha.split("T")[0].split("-");
      let fechaInic = new Date(fechaEmpresa[0], fechaEmpresa[1], fechaEmpresa[2])
      for (let pago of pagos) {
        let fecha = pago.fecha.split("T");
        var mes = fecha[0].split("-");
        
        if (fechaInic < f1Mes1) {
          if (mes[1] == mesRecibo) {
            if (pago.total != "") {
              total += Number(pago.total);
            }
          }
        }
      }
      
      if (total != 0) {
        let porcentaje = (total * this.empresa.porcentaje) / 100;
        this.porcentaje = porcentaje;
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
  getConfig() {
    this.invoiceService.getConfig(1).subscribe((config) => {
      this.config = config;
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
  
  
  public downloadPDF() {
    return xepOnline.Formatter.Format("content", {
      render: "download",
      filename: "Recibo-" + this.serial
    });
  }
}
  