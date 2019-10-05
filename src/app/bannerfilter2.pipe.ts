import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bannerfilter2',
  pure: false
})
export class Bannerfilter2Pipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;


    return items.filter( it => {
      if(searchText != ''){
        return (it.status == parseInt(searchText));
      }else{
        return true;
      }
    });
  }

}
