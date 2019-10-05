import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from "../app.commonservices";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-upcomingevents',
  templateUrl: './upcomingevents.component.html',
  styleUrls: ['./upcomingevents.component.css'],
  providers: [Commonservices]
})
export class UpcomingeventsComponent implements OnInit {
  userdata: CookieService;
  public userdetails:any=[];
  public bloglist:any=[];
  public userdetail:any;
  public searchText;
  public searchText2;
  public searchText3;

  constructor(public activeRoute:ActivatedRoute,private _commonservices: Commonservices,private _http: HttpClient, public usercookie:CookieService) {

    this.userdata = usercookie;
    this.userdetail = JSON.parse(this.userdata.get('userdetails'));
    console.log(this.userdetail);
    this.searchText='';
    this.searchText2='';
    this.searchText3='';

  }

  ngOnInit() {
    this.activeRoute.data.forEach((data) => {
      //PRE LOAD DATA PRIOR
      /*console.log('route data for profile');
       console.log('json',data['results']);
       console.log(data['results'].item);*/
      // console.log('json',data['results']);
      console.log('json',data['results']);
      let result=data['results'];
      // console.log(result);
      // this.bloglist = result.res;
      for(let i in result.res){
        if(this.userdetail.signupaffiliate == 1 && result.res[i].signupaffiliate==1){
          this.bloglist.push(result.res[i]);
        }
        if(this.userdetail.ambassador == 1 && result.res[i].ambassador==1){
          this.bloglist.push(result.res[i]);
        }
        if((this.userdetail.musicians == 1 && result.res[i].musicians==1) || (this.userdetail.fan == 1 && result.res[i].fan==1) || (this.userdetail.dancer == 1 && result.res[i].dancer==1) || (this.userdetail.model == 1 && result.res[i].model==1)){
          this.bloglist.push(result.res[i]);
        }

      }
      console.log(this.bloglist);
      // this.ticketsalebanner = result.res;
      // console.log(this.ticketsalebanner);
    });
  }

}
