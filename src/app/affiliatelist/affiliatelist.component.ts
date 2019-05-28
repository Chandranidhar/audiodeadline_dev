import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from '../app.commonservices';
//import {Router} from '@angular/router';
import {Router, ActivatedRoute} from '@angular/router'

// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {CookieService} from 'ngx-cookie-service';
//import {Router,ActivatedRoute} from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-affiliatelist',
    templateUrl: './affiliatelist.component.html',
    styleUrls: ['./affiliatelist.component.css'],
    providers: [Commonservices]
})

export class AffiliatelistComponent implements OnInit {
    date_search_source: any='user_affiliate';
    date_search_endpoint: any='datalist';
    search_settings:any={datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search By Date",field:"unixtime"}],textsearch:[{label:"Search By Name",field:'fullname'}]};



    public loadinglist:boolean;
    public p: number = 1;
    modalRef: BsModalRef;
    public serverurl;
    public userlist;
    public userdata:CookieService;

    public idx;
    public searchText;
    public username;
    public isadmin;
    public defaultadmedia;
    public defaultxpmedia;
    jwttoken:any;
    apiurl:any;


    public editroute1:any="edit-affiliate";
    public dataForm: FormGroup;
    public fb;
    public datasource:any;
    affiliatelistarray:any[];
    affiliatearray_skip:any=["_id", "phone", "username", "password", "address", "address2", "city", "state", "zip", "rsvp", "signupaffiliate","admin", "status", "agreement", "noofclick", "mediaid", "gender", "ambassador", "dancer", "model", "musicians", "fan", "accesscode", "lastactivetime", "agreement_time", "sign", "commission","unixtime","fullname"];
    affiliatelistarray_modify_header:any={'added time':"Date Added",'firstname':"First Name",'lastname':"Last Nmae",'email':"Email",'parent':"Enroller"};
    affiliatelisttablename:any="user";

    deleteval:any= 'deletesingledata';
    affiliatestatusarray:any=[{val:1,name:"Active"},{val:2,name:"Inactive"}];
    updateurl:any = 'addorupdatedata';

    constructor(fb: FormBuilder, public _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService, userdata: CookieService, private router: Router,public activeRoute:ActivatedRoute) {
        this.userdata = userdata;
        this.fb = fb;
        this.serverurl=_commonservices.url;
        this.username = '';
        this.defaultadmedia = '';
        this.defaultxpmedia = '';
        this.jwttoken = this.userdata.get('jwttoken');
        this.apiurl = _commonservices.nodesslurl;

        let userdata2: any;
        userdata2= userdata.get('userdetails');

        if (typeof (userdata2) == 'undefined' || userdata2 == ''){
            this.router.navigateByUrl('/login');
        }else{
            userdata2 =JSON.parse(userdata2);
            this.isadmin = userdata2.admin;
            if(this.isadmin == 0){
                this.username = userdata2.username;
            }
            this.getUserList();
            this.getBannerList1();
            this.getBannerList2();
        }
        //this.affiliatelist();
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            firstname: [""],
            lastname: [""],
            phone: [""],
            email: [""],
            username: [""],
            role: [""],
            address: [""],
            address2: [""],
            city: [""],
            state: [""],
            zip: [""],
            cardonfile:[""],
            expirydate:[""],
            csv:[""],
            currentpassword:[""],
            password:[""],
            confirmpassword:[""],
        });
      this.activeRoute.data.forEach((data) => {
          console.log('json',data['results']);
          console.log(data);
          console.log(data['results']);
          let result=data['results'];
          console.log(result);
          this.affiliatelistarray=result.res;
      });

    }

   /* affiliatelist() {
      let link=this._commonservices.nodesslurl+'datalist';
      this._http.post(link,{"source":"user_affiliate"})
          .subscribe(res=>{
              let result:any;
              result=res;
              this.affiliatelistarray=result.res;
              console.log(this.affiliatelistarray);
        });

}*/

    getUserList(){
        this.loadinglist = true;
        var link =this.serverurl+'affiliatelist';
        var data = {type : 'affiliate',isadmin:this.isadmin,username:this.username};

        this._http.post(link, data)
            .subscribe(res => {
                this.loadinglist = false;
                let result:any;
                 result = res;
                this.userlist = result.res;
            },error => {
                this.loadinglist = false;
                console.log("Oooops!");
            });
    }


    getBannerList1(){
        var link =this.serverurl+'medialistbytype';
        var data = {type: 3};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.res.length > 0){
                    this.defaultadmedia = result.res[0].name;
                }
            },error => {
                console.log("Oooops!");
            });
    }

    getBannerList2(){
        var link =this.serverurl+'medialistbytype';
        var data = {type: 4};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.res.length > 0){
                    this.defaultxpmedia = result.res[0].name;
                }
            },error => {
                console.log("Oooops!");
            });
    }


    cngstatus(item){
        var status = 1;
        if(typeof (item.status) != 'undefined')
            status = 1-parseInt(item.status);
        var link =this.serverurl+'cngstatus';
        var data = {_id:item._id,status : status};

        this._http.post(link, data)
            .subscribe(res => {
                item.status = status;
            },error => {
                console.log("Oooops!");
            });
    }

    openDelModal(template: TemplateRef<any>,item) {
        this.idx = this.userlist.indexOf(item);
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    }

    confirm(): void {
        var link =this.serverurl+'deleteuser';
        var data = {_id:this.userlist[this.idx]._id};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.status == 'success'){
                    this.userlist.splice(this.idx, 1);
                }
                this.modalRef.hide();
            },error => {
                console.log("Oooops!");
                this.modalRef.hide();
            });
    }

    decline(): void {
        this.modalRef.hide();
    }
    copyText(val: string){
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }


    openEditModal(template: TemplateRef<any>){
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md editaffiliatecls'});
    }


}
