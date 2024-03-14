import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'deliveryTime',
  standalone: true,
})
export class DeliveryTimePipe implements PipeTransform {
  transform(value: string | number, args?: any): string {
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (value.length === 0) {
      return 'deliveryTime.notAvailable';
    }
    if (value === '1') {
      return 'deliveryTime.in24Hours';
    }
    return 'deliveryTime.inDays';
  }

  constructor(private translateService: TranslateService) {}
}
