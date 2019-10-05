import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {Router, ActivatedRoute} from "@angular/router";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css'],
  providers: [Commonservices]
})
export class OrderlistComponent implements OnInit {
  public loadinglist:boolean;
  public p: number = 1;
  public serverurl;
  public username;
  public isadmin;
  public orderlist:any=[];
  public searchDate;
  public searchText;
  public userid:any;
  public nodesslurl:any;
  public userdata2: any;
  public afforderlist: any=[];
  public afforderlist_skip: any=["_id", "userid", "firstname", "lastname", "phone", "email","address", "city", "state", "zip", "affiliate", "media", "sponsor", "productid", "subtotal", "shipping", "tax", "discount","orderdetails","userphone","time"];
  public orderlist_skip: any=["_id", "userid", "firstname", "lastname", "phone", "email","address", "city", "state", "zip", "affiliate", "media", "sponsor", "productid", "subtotal", "shipping", "tax", "discount","orderdetails","userphone","time"];
  public modify_header: any={"useremail":"Email","promocode":"Promocode","added time":"Date/Time","productname":"Product"};
  public orderlist_modify_header: any={"type":"Type",'genrename':"Genre",'status':'Status'};
  // genrelistarray_modify_header:any={"type":"Type",'genrename':"Genre",'status':'Status'};
  // genrelistarray_skip:any=["_id"];
  tablename: any = 'order_view';
  detailroute1:any = 'order-details';

  constructor(private _commonservices: Commonservices, userdata: CookieService, private router: Router,private _http: HttpClient, public activeRoute:ActivatedRoute) {
    this.serverurl=_commonservices.url;
    this.nodesslurl=_commonservices.nodesslurl;
    this.username = '';
    this.userdata2= userdata.get('userdetails');
    if (typeof (this.userdata2) == 'undefined' || this.userdata2 == ''){
      this.router.navigateByUrl('/login');
    }else{
      this.userdata2 =JSON.parse(this.userdata2);
      this.isadmin = this.userdata2.admin;
      this.userid = this.userdata2._id;
      if(this.isadmin == 0){
        this.username = this.userdata2.username;
      }
      if(this.userdata2.signupaffiliate ==1){

        this.activeRoute.data.forEach((data) => {
          //PRE LOAD DATA PRIOR
          /*console.log('route data for profile');
           console.log('json',data['results']);
           console.log(data['results'].item);*/
          // console.log('json',data['results']);
          let result=data['results'];
          //console.log(result);
          this.afforderlist = result.res;
          // console.log(this.ticketsalebanner);

        });
      }
      else {
        this.getOrderList2();
      }
      // this.getOrderList();

    }
  }

  ngOnInit() {
  }


  getOrderList(){
    this.loadinglist = true;
    var link =this.serverurl+'orderlist';
    var data = {isadmin:this.isadmin,username:this.username};

    this._http.post(link, data)
        .subscribe(res => {
          this.loadinglist = false;
          let result:any;
          result = res;
          this.orderlist = result.item;
        },error => {
          this.loadinglist = true;
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
