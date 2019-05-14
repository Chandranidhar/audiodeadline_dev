import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {CookieService} from "ngx-cookie-service";
import {Router,ActivatedRoute} from "@angular/router";
// import {Http} from "@angular/http";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-commssionlist',
  templateUrl: './commssionlist.component.html',
  styleUrls: ['./commssionlist.component.css'],
  providers: [Commonservices]
})
export class CommssionlistComponent implements OnInit {
  public loadinglist:boolean;
  public p: number = 1;
  modalRef: BsModalRef;
  public serverurl;
  public username;
  public isadmin;
  public commisionlist:any = [];
  public commisiondetlist;
  public searchText;
  public searchType;
  public searchDate;
  public fullname:any;

  constructor(private _commonservices: Commonservices, userdata: CookieService, private router: Router,private _http: HttpClient,private modalService: BsModalService, public activeRoute:ActivatedRoute) {
    this.serverurl=_commonservices.url;
    this.username = '';
    this.searchType = '';

    let userdata2: any;
    userdata2= userdata.get('userdetails');

    if (typeof (userdata2) == 'undefined' || userdata2 == ''){
      this.router.navigateByUrl('/login');
    }else{
      userdata2 =JSON.parse(userdata2);
      this.isadmin = userdata2.admin;
      // this.username = userdata2.username;
      if(this.isadmin == 0){
        this.username = userdata2.username;
          //this.fullname = userdata2.firstname+' '+userdata2.lastname;
        //this.getCommisionList2();
      }
      if(this.isadmin == 1){

        //this.getAllCommisionList();
      }


    }
  }

  ngOnInit() {
      this.activeRoute.data.forEach((data) => {
          //PRE LOAD DATA PRIOR
          /*console.log('route data for profile');
           console.log('json',data['results']);
           console.log(data['results'].item);*/
          // console.log('json',data['results']);
          let result=data['results'];
          console.log(result);
          this.commisionlist = result.res;
         // this.ticketsalebanner = result.res;
          // console.log(this.ticketsalebanner);



      });
  }

  getAllCommisionList(){

    this.loadinglist = true;
    this.commisiondetlist = [];
    // let link =this._commonservices.nodeurl+'datalist';
    // var data = {isadmin:this.isadmin,username:this.username};
    // let data = {parent:this.username};

//    this._http.post(link, {condition:{"parent": this.username},source: "newcommision"})
    let link = this._commonservices.nodesslurl+'datalist';
    this._http.post(link,{source:'newcommision'})
        .subscribe(res => {
          this.loadinglist = false;
            let result:any;
          result = res;
          this.commisionlist = result.res;
        },error => {
          this.loadinglist = false;
          console.log("Oooops!");
        });
  }

  getCommisionList(){
    this.loadinglist = true;
    this.commisiondetlist = [];
    var link =this.serverurl+'commisionlist';
    var data = {isadmin:this.isadmin,username:this.username};

    this._http.post(link, data)
        .subscribe(res => {
          this.loadinglist = false;
            let result:any;
          result = res;
          this.commisionlist = result.item;
        },error => {
          this.loadinglist = false;
          console.log("Oooops!");
        });
  }
  getCommisionList2(){
    this.loadinglist = true;
    this.commisiondetlist = [];
   // let link =this._commonservices.nodeurl+'datalist';
    // var data = {isadmin:this.isadmin,username:this.username};
    // let data = {parent:this.username};

//    this._http.post(link, {condition:{"parent": this.username},source: "newcommision"})
      let link = this._commonservices.nodesslurl+'datalist';
      this._http.post(link,{source:'newcommision',condition:{"parent":this.username }})
        .subscribe(res => {
          this.loadinglist = false;
            let result:any;
          result = res;
          this.commisionlist = result.item;
        },error => {
          this.loadinglist = false;
          console.log("Oooops!");
        });
  }

  openViewModal(template: TemplateRef<any>,item) {
    //noinspection TypeScriptValidateTypes
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    // var link =this.serverurl+'commisiondetlist';
    let link =this._commonservices.nodesslurl+'datalist';
    // var data = {username:item._id};
    //this._http.post(link, data)
      this.fullname = item.firstname+' '+item.lastname;
      this._http.post(link,{source:'commission_details',condition:{"username":item.username }})
        .subscribe(res => {
            let result:any;
          result = res;
          console.log(result);
          this.commisiondetlist = result.res;
        },error => {
          console.log("Oooops!");
        });
  }

}
