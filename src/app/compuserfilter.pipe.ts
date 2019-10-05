import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compuserfilter'
})
export class CompuserfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, args?: any): any[] {
    if(!items) return [];
    if(!searchText) return items;


    searchText = searchText.toLowerCase();

    return items.filter( it => {
      let name = it.name;
      if(!name)
        name = '';
      let email = it.email;
      if(!email)
        email = '';
      let competitionid = it.competitionid;
      if(!competitionid)
        competitionid = '';
      let genre = it.genre;
      if(!genre)
        genre = '';
      let status = it.status;

      if(args == 'name'){
        return (name.toLowerCase().includes(searchText) || email.toLowerCase().includes(searchText));
      }
      if(args == 'competition'){
        return (competitionid == searchText);
      }
      if(args == 'genre'){
        return (genre == searchText);
      }
      if(args == 'status'){
        return (status == searchText);
      }
      if(args == 'daterange'){
        return (status == searchText);
      }
    });
  }

}
