import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {Router, ActivatedRoute} from "@angular/router";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [Commonservices]
})
export class OrderDetailsComponent implements OnInit {
  public serverurl;
  public nodesslurl1;
  public commonservices;
  public activeRoute:any;
  public orderdetails:any={};

  constructor(public _commonservices: Commonservices, userdata: CookieService, private router: Router,private _http: HttpClient, private route:ActivatedRoute) {

    this.commonservices = _commonservices;
    this.serverurl=_commonservices.url;
    this.nodesslurl1=_commonservices.nodeurl1;
    this.activeRoute = route;
    // console.log(this.activeRoute.snapshot.params.id);
    let orderid:any = '';
    orderid = this.activeRoute.snapshot.params.id;
    this.getorderdetails(orderid);
  }

  ngOnInit() {
  }
  getorderdetails(id:any){
    let link = this.nodesslurl1+'vieworderdetails';
    let data ={'_id':id};
    this._http.post(link,data)
        .subscribe(res=>{

          let result:any;
          result = res;
          // console.log(result);
          this.orderdetails = result.data[0];
          console.log(this.orderdetails);
        });

  }

}
