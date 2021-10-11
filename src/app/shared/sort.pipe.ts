import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(data: any, property: string): any {
    data.sort((a: any, b: any) => a[property].localeCompare(b[property]));
    return data;
  }
}
