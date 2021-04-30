import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class DateService {
    private relativeTime = {
        future: 'en %s',
        past: 'Hace %s',
        s: 'unos segundos',
        ss: '%d segundos',
        m: 'un minuto',
        mm: '%d minutos',
        h: 'una hora',
        hh: '%d horas',
        d: 'un día',
        dd: '%d días',
        M: 'un mes',
        MM: '%d meses',
        y: 'un año',
        yy: '%d años'
    }

    constructor() {
        const relativeTime = this.relativeTime;
        moment.locale('es', {
            relativeTime,
        });
    }

    public getTimeAgo(dateToCompare: string) {
        const date = dateToCompare.split('T')[0]
        const time = dateToCompare.split('T')[1].substr(0, 8);
        return moment(date + 'T' + time).fromNow();
    }
}
