import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'oreder1'
})
export class Oreder1Pipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;


    searchText = searchText.toLowerCase();

    return items.filter( it => {
      let fullname = it.fullname;
      if(!fullname)
        fullname = '';
      let email = it.email;
      if(!email)
        email = '';
      let phone = it.phone;
      if(!phone)
        phone = '';
      let affiliatename = it.affiliatename;
      if(!affiliatename)
        affiliatename = '';
      let productname = it.productname;
      if(!productname)
        productname = '';
      let promocode = it.promocode;
      if(!promocode)
        promocode = '';
      let sponsor = it.sponsor;
      if(!sponsor)
        sponsor = '';
      return (fullname.toLowerCase().includes(searchText) || email.toLowerCase().includes(searchText) || phone.toLowerCase().includes(searchText) || affiliatename.toLowerCase().includes(searchText) || productname.toLowerCase().includes(searchText) || promocode.toLowerCase().includes(searchText) || sponsor.toLowerCase().includes(searchText));
    });
  }
}
