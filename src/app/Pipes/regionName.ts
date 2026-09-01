import { Pipe, PipeTransform } from '@angular/core';
import { ServiceAllService } from '../Services/service-all.service';

@Pipe({
  name: 'regionName',
})
export class regionNamePipe implements PipeTransform {
  constructor(private srv_all: ServiceAllService) {}

  transform(reigionId: number): string {
    // המרה סינכרונית אמינה – ללא קריאת HTTP וללא Observable,
    // כך שהתא מעולם לא נשאר "ריק" גם אחרי סינון או שינוי נתוני הטבלה.
    return this.srv_all.GetRegions(Number(reigionId));
  }
}
