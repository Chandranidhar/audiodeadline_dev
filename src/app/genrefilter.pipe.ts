import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genrefilter',
  pure: false
})
export class GenrefilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, args?: any): any[] {
    if(!items) return [];
    if(!searchText) return items;

    return items.filter( it => {
      let genrename = it.genrename;
      if(!genrename)
        genrename = '';
      let status = it.status;
      let type = it.type;

      if(args == 'name'){
        searchText = searchText.toLowerCase();
        return (genrename.toLowerCase().includes(searchText));
      }
      if(args == 'type'){
        return (type.indexOf(searchText) > -1);
      }
      if(args == 'status'){
        return (status == searchText);
      }
    });
  }

}
