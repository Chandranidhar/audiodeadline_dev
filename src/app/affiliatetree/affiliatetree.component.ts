import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices';
declare var $:any;

@Component({
  selector: 'app-affiliatetree',
  templateUrl: './affiliatetree.component.html',
  styleUrls: ['./affiliatetree.component.css'],
  providers: [Commonservices]
})
export class AffiliatetreeComponent implements OnInit {
  commonservices:Commonservices;
  public userdata;
  datasource:any;
  listarray:any=[];
  custombutton:any={};
  // listarray_skip:any=['_id','password','rsvp','signupaffiliate','status','gender','phone','parentname','admin','ambassador','dancer','model','musicians','fan','parent'];
  listarray_skip:any=["_id", "phone", "username", "password", "address", "address2", "city", "state", "zip", "rsvp", "signupaffiliate", "parent", "admin", "status", "agreement", "noofclick", "mediaid", "gender", "ambassador", "dancer", "model", "musicians", "fan", "accesscode", "lastactivetime", "agreement_time", "sign", "commission"];
  listarray_modify_header:any={'added time':"Date Added",'firstname':"First Name",'email':'Email','lastname':'Last Name'};      //'added_time' has been replaced with 'added time' , because of library declaration
  statusarray:any=[{val:1,name:'Approve'},{val:2,name:'Decline'},{val:3,name:'Lock'}];
  tablename='user_affiliate';
  public isShow:any=false;
  public searchText:any;
  public searchText5:any;
  // public searchText5:any;
  public loadinglist:any;

  constructor(public router: Router,private activeRoute: ActivatedRoute, userdata: CookieService,private _http: HttpClient, private _commonservices: Commonservices) {
    this.userdata = userdata;
    let link = this._commonservices.nodesslurl+'datalist';
    this._http.post(link,({"source": this.tablename,"condition":{"parent":this.userdata.get('username')}}))
        .subscribe(res=>{
          let result:any ;
          result = res;
          this.listarray = result.res;
          console.log(this.listarray);
        });
    if(_commonservices.envflag=="live"){
      /*for grab url in live*/

      this.custombutton={label:'my tree',fields:['username','fullname','children'],url:'https://audiodeadline.com/affiliate-tree'};
    }
    if(_commonservices.envflag=="dev"){
      /*for grab url in development*/

      /*for tree view.. fields are nothing but those fieldnames which will be added in route of affiliate-tree*/
      this.custombutton={label:'my tree',fields:['username','fullname','children'],url:'https://development.audiodeadline.com/affiliate-tree'};
    }

  }





  ngOnInit() {
  }


  isShowing(){
    $('.content').toggle();
    $(".toggle").toggleClass("expanded");
    this.isShow=true;
  }

  isShowing1(){
    $('.content1').toggle();
    $(".toggle").toggleClass("expanded");
    this.isShow=true;
  }

  isShowing2(){
    $('.content2').toggle();
    $(".toggle").toggleClass("expanded");
    this.isShow=true;
  }

}
