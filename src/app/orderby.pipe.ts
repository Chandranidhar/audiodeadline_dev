import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderby',
  pure: false
})
export class OrderbyPipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {
    if(!array || array === undefined || array.length === 0) return null;

    array.sort((a: any, b: any) => {
      if(args == 'sortindex'){
        if (a.sortindex < b.sortindex) {
          return -1;
        } else if (a.sortindex > b.sortindex) {
          return 1;
        } else {
          return 0;
        }
      }else{
        if (a.status < b.status) {
          return -1;
        } else if (a.status > b.status) {
          return 1;
        } else {
          return 0;
        }
      }
    });
    return array;
  }

}
