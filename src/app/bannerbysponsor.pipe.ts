import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bannerbysponsor',
  pure: false
})
export class BannerbysponsorPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    return items.filter( it => {
      if(searchText != ''){
        return (it.sponsor == searchText);
      }else{
        return true;
      }
    });
  }
}
