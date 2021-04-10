import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'horarios'
})
export class HorariosPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        let horario;
        const horaSeparada = value.split(':');
        if (horaSeparada[0] === 0) {
            horario = `12:${horaSeparada[1]} am`
        } else if (horaSeparada[0] <= 12) {
            horario = `${horaSeparada[0]}:${horaSeparada[1]} am`
        } else {
            horaSeparada[0] -= 12;
            horario = `${horaSeparada[0]}:${horaSeparada[1]} pm`
        }
        return horario;
    }

}
