import { DateTime, DurationUnit } from 'luxon';


export class DateUtils {
    static format(date: Date, format: string = 'dd/MM/yyyy HH:mm:ss.SSS'): string {
        return DateTime.fromJSDate(date).toFormat(format);
    }

    static formatTime(date: Date): string {
        return DateTime.fromJSDate(date).toFormat('HH:mm:ss.SSS');
    }

    static formatDate(date: Date): string {
        return DateTime.fromJSDate(date).toFormat('dd/MM/yyyy');
    }

    static diffTime(begin: Date, end: Date = new Date(), unit: string = 'second'): number {
        const dtBegin = DateTime.fromJSDate(begin);
        const dtEnd = DateTime.fromJSDate(end);
        return dtEnd.diff(dtBegin).as(unit as DurationUnit);
    }
}
