import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commission3'
})
export class Commission3Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
