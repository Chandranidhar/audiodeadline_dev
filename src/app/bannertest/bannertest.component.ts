import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bannertest',
  templateUrl: './bannertest.component.html',
  styleUrls: ['./bannertest.component.css'],
  providers: [Commonservices]
})
export class BannertestComponent implements OnInit {
  public serverurl;
  public bannerlist;
  public idx;
  constructor(private _commonservices: Commonservices,private _http: HttpClient) {
    this.serverurl=_commonservices.url;
    this.getBannerList();
  }

  ngOnInit() {
  }

  getBannerList(){
    var link =this.serverurl+'bannertestlist';
    var data = {};

    this._http.post(link, data)
        .subscribe(res => {
            let result:any;
          result = res;
          this.bannerlist = result.res;
        },error => {
          console.log("Oooops!");
        });
  }

  cngstatus(item){
    var status = 1;
    if(typeof (item.status) != 'undefined')
      status = 1-parseInt(item.status);
    var link =this.serverurl+'cngstatusbannertest';
    var data = {_id:item._id,status : status};

    this._http.post(link, data)
        .subscribe(res => {
          item.status = status;
        },error => {
          console.log("Oooops!");
        });
  }

  delbtest(item){
    this.idx = this.bannerlist.indexOf(item);
    var link =this.serverurl+'deletebannertest';
    var data = {_id:this.bannerlist[this.idx]._id};

    this._http.post(link, data)
        .subscribe(res => {
            let result:any;
          result = res;
          if(result.status == 'success'){
            this.bannerlist.splice(this.idx, 1);
          }
        },error => {
          console.log("Oooops!");
        });
  }

}
