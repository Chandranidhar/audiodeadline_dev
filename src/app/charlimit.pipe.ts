import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charlimit'
})
export class CharlimitPipe implements PipeTransform {

  public transform(value: any, args?: any): any  {
    var ret = value;
    var res = '';
    if(ret.length > args){
      res = ret.substring(0, args);
      res += '...';
    }else{
      res = ret;
    }
    return res;
  }

}
