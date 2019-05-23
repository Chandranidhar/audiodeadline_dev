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
  private userdata: CookieService;
  public userdetails:any=[];
  public bloglist:any=[];

  constructor(public activeRoute:ActivatedRoute,private _commonservices: Commonservices,private _http: HttpClient) {

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
      console.log(result);
      this.bloglist = result.item;
      // this.ticketsalebanner = result.res;
      // console.log(this.ticketsalebanner);
    });
  }

}
