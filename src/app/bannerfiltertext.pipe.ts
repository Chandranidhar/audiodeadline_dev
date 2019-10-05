import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bannerfiltertext'
})
export class BannerfiltertextPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;


    searchText = searchText.toLowerCase();

    return items.filter( it => {
      let title = it.label;
      if(!title)
        title = '';
      let description = it.description;
      if(!description)
        description = '';
      else
        description = description.replace(/<.*?>/g, '');
      let parentname = it.parentname;
      if(!parentname)
        parentname = '';
      return (title.toLowerCase().includes(searchText) || description.toLowerCase().includes(searchText) || parentname.toLowerCase().includes(searchText));
    });
  }

}
