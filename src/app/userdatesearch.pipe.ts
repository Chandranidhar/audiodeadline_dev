import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userdatesearch'
})
export class UserdatesearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;

    var searchText1 = searchText[0];
    var searchText2 = searchText[1];
    console.log(searchText1);
    console.log(searchText2);
    if(!searchText1 || !searchText2 || typeof (searchText1) == 'undefined' || typeof (searchText2) == 'undefined'){
      return items;
    }else{
      searchText1 = searchText1.toString();
      searchText1 = searchText1.substring(4,15);
      console.log(searchText1);
      searchText1 = searchText1+' 00:00:00';

      var ftime = new Date(searchText1).getTime();
      searchText2 = searchText2.toString();
      searchText2 = searchText2.substring(4,15);
      console.log(searchText2);
      searchText2 = searchText2+' 23:59:59';
      var etime =new Date(searchText2).getTime();

      if(ftime > 0 && etime >0){
        return items.filter( it => {
          console.log(it.added_time);
          return (it.added_time >=ftime && it.added_time <= etime);
        });
      }else{
        return items;
      }
    }

  }

}
