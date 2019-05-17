import { Pipe, PipeTransform } from '@angular/core';
import {moment} from "ngx-bootstrap/chronos/test/chain";

@Pipe({
  name: 'dateblogpipe'
})
export class DateblogpipePipe implements PipeTransform {

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
      var ftime = moment(searchText1,"MMM DD YYYY HH:mm:ss").unix();
      searchText2 = searchText2.toString();
      searchText2 = searchText2.substring(4,15);
      console.log(searchText2);
      searchText2 = searchText2+' 23:59:59';
      var etime = moment(searchText2,"MMM DD YYYY HH:mm:ss").unix();
      console.log(etime);
      console.log(ftime);
      console.log(items);

      if(ftime > 0 && etime >0){
        return items.filter( it => {
          return (it.startdate >=ftime);
        //  return (it.startdate >=ftime && it.startdate <= etime);

        });
      }else{
        return items;
      }
    }

  }

}
