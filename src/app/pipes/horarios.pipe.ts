import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horarios'
})
export class HorariosPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let horario;
    let hora_separada = value.split(':');
    if(hora_separada[0] == 0){
      horario = `12:${hora_separada[1]} am`
    }else if(hora_separada[0] <= 12){
      horario = `${hora_separada[0]}:${hora_separada[1]} am`
    }else{
      hora_separada[0] -= 12;
      horario = `${hora_separada[0]}:${hora_separada[1]} pm`
    }
    return horario;
  }

}
