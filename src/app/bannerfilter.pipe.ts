import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bannerfilter',
  pure: false
})
export class BannerfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;


    return items.filter( it => {
      if(searchText != ''){
        return (it.type == parseInt(searchText));
      }else{
        return true;
      }
    });
  }

}
