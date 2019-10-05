import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css'],
  providers: [Commonservices]
})
export class MyorderComponent implements OnInit {
  public loadinglist:boolean;
  public p: number = 1;
  public serverurl;
  public nodesslurl:any;
  public userid;
  public isadmin;
  public orderlist;
  public searchDate;
  public searchText;

  constructor(private _commonservices: Commonservices, userdata: CookieService, private router: Router,private _http: HttpClient) {
    this.serverurl=_commonservices.url;
    this.userid = '';
    this.nodesslurl=_commonservices.nodesslurl;
    let userdata2: any;
    userdata2= userdata.get('userdetails');

    if (typeof (userdata2) == 'undefined' || userdata2 == ''){
      this.router.navigateByUrl('/login');
    }else{
      userdata2 =JSON.parse(userdata2);
      this.userid = userdata2._id;
      this.getOrderList2();
    }
  }

  ngOnInit() {
  }

  getMyOrders(){
    this.loadinglist = true;
    var link =this.serverurl+'myorder';
    var data = {_id:this.userid};

    this._http.post(link, data)
        .subscribe(res => {
          this.loadinglist = false;
          let result:any;
          result = res;
          this.orderlist = result.item;
        },error => {
          this.loadinglist = false;
          console.log("Oooops!");
        });
  }
  getOrderList2(){

    this.loadinglist = true;
    let link = this.nodesslurl+'datalist';
    this._http.post(link,{source:'order_view'})
        .subscribe(val=>{

          let result:any ;
          result = val;
          // console.log(result);
          this.loadinglist = false;
          for(let i in result.res){

            if(result.res[i].userid!=0){
              this.orderlist.push(result.res[i]) ;

            }
          }

          console.log(this.orderlist);

        });
  }

  showtwoDecnum(fnum){
    fnum = parseFloat(fnum);
    return fnum.toFixed(2);
  }

}
