import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateInSpanish'
})
export class DateInSpanishPipe implements PipeTransform {
    transform(value: string | Date): string {
        const datePipe = new DatePipe('es-ES');
        return datePipe.transform(value, 'dd \'de\' MMMM, yyyy') || '';
    }
}