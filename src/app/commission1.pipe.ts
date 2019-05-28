import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commission1'
})
export class Commission1Pipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;


    searchText = searchText.toLowerCase();

    return items.filter( it => {
      let fullname = it.fullname;
      if(!fullname)
        fullname = '';
      return (fullname.toLowerCase().includes(searchText));
    });
  }

}
