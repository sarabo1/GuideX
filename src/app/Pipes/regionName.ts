import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceAllService } from '../Services/service-all.service';

@Pipe({
  name: 'regionName',
})
export class regionNamePipe implements PipeTransform {
  constructor(private srv_all: ServiceAllService) {}

  transform(reigionId: number): Observable<string> {
    // המרה סינכרונית אמינה – ללא קריאת HTTP, כך שהאזור לעולם לא "נמחק"
    // או מוצג כלא ידוע גם אחרי עריכה/שמירה.
    return of(this.srv_all.GetRegions(Number(reigionId)));
  }
}
