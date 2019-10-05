import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compfilter',
  pure: false
})
export class CompfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, args?: any): any[] {
    if(!items) return [];
    if(!searchText) return items;

    return items.filter( it => {
      let competitionname = it.competitionname;
      if(!competitionname)
        competitionname = '';
      let status = it.status;

      if(args == 'name'){
        searchText = searchText.toLowerCase();
        return (competitionname.toLowerCase().includes(searchText));
      }
      if(args == 'status'){
        return (status == searchText);
      }
    });
  }

}
