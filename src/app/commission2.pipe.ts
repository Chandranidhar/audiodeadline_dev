import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commission2'
})
export class Commission2Pipe implements PipeTransform {


  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;


    return items.filter( it => {
      if(searchText == '1'){
        return (it.ambassador == 1);
      }else{
        return (it.ambassador != 1);
      }
    });
  }


}
