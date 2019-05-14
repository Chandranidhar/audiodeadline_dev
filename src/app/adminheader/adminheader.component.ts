import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import { CookieService } from 'ngx-cookie-service';
declare var $:any;
@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css'],
  providers: [Commonservices]
})
export class AdminheaderComponent implements OnInit {
  public userdata:any;
  public commonservices:any;
  public fullname:any='';

  constructor( userdata: CookieService, private _commonservices: Commonservices) {

    this.userdata = userdata;
    this.commonservices = _commonservices;
    console.log(this.userdata.get('userdetails'));
    let userdetail = JSON.parse(this.userdata.get('userdetails'));
    console.log(userdetail.firstname);
    this.fullname = userdetail.firstname+' '+userdetail.lastname;
  }

  ngOnInit() {
  }


  menuopennew(){
    $('ul.sub-menu').slideToggle();
  }


}
