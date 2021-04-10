import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'mes'
})
export class MesPipe implements PipeTransform{
    transform(value:any){
        let mes;
        if(value[0] === 1){
            mes = 'Enero';
        }
        if(value[0] === 2){
            mes = 'Febrero';
        }
        if(value[0] === 3){
            mes = 'Marzo';
        }
        if(value[0] === 4){
            mes = 'Abril';
        }
        if(value[0] === 5){
            mes = 'Mayo';
        }
        if(value[0] === 6){
            mes = 'Junio';
        }
        if(value[0] === 7){
            mes = 'Julio';
        }
        if(value[0] === 8){
            mes = 'Agosto';
        }
        if(value[0] === 9){
            mes = 'Septiembre';
        }
        if(value[0] === 10){
            mes = 'Octubre';
        }
        if(value[0] === 11){
            mes = 'Noviembre';
        }
        if(value[0] === 12){
            mes = 'Diciembre';
        }
        return mes;
    }
}
