import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {CookieService} from 'ngx-cookie-service';
// import {Http} from "@angular/http";
import {Commonservices} from "../app.commonservices";
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [Commonservices]
})
export class DashboardComponent implements OnInit {
    modalRef: BsModalRef;
    private userdata: CookieService;
    public userdetails:any=[];
    items:any;
    commonservices:Commonservices;
    coockieData:CookieService;
    public userid;
    public serverurl;
    public dataForm: FormGroup;
    public fb;
    private userlist: any;
    private idx: number;

    datasource:any;
    ambassadorlistarray:any[];
    ambassadorlistarray_skip:any=["_id", "phone", "username", "password", "address", "address2", "city", "state", "zip", "rsvp", "signupaffiliate","admin", "status", "agreement", "noofclick", "mediaid", "gender", "ambassador", "dancer", "model", "musicians", "fan", "accesscode", "lastactivetime", "agreement_time", "sign", "commission"];
    ambassadorlistarray_modify_header:any={'added time':"Date Added",'firstname':"First Name",'email':'Email','lastname':'Last Name','parent':'Enroller'};
    // tablename:'user';
    ambassadortablename:'user_ambassador';
    ambassadorstatusarray:any=[{val:1,name:'Active'},{val:2,name:'Inactive'}];
    affiliatelistarray:any[];
    affiliatelistarray_skip:any=["_id", "phone", "username", "password", "address", "address2", "city", "state", "zip", "rsvp", "signupaffiliate","admin", "status", "agreement", "noofclick", "mediaid", "gender", "ambassador", "dancer", "model", "musicians", "fan", "accesscode", "lastactivetime", "agreement_time", "sign", "commission"];
    affiliatelistarray_modify_header:any={'added time':'Date Added','firstname':'First Name','lastname':'Last Name','email':'email','parent':'Enroller'};
    affiliateliststatusarray:any=[{val:1,name:'Active'},{val:2,name:'Inactive'}];
    affiliatetablename:'user_affiliate';







    constructor(fb: FormBuilder , private _http: HttpClient, private router: Router, userdata: CookieService, private _commonservices: Commonservices, private modalService: BsModalService,) {
        this.fb = fb;

        this.coockieData= userdata;
        this.commonservices=_commonservices;
        this.items = _commonservices.getItems();
        this.serverurl=_commonservices.url;
        let userdata2: any;
        userdata2= userdata.get('userdetails');
        if (typeof (userdata2) == 'undefined' || userdata2 == '') {
            this.router.navigateByUrl('/login');
        } else
            {                                    //replace in login page
            userdata2 =JSON.parse(userdata2);
            this.userid = userdata2._id;
            if(userdata2.admin == 0){
                if(userdata2.signupaffiliate == 1){
                    if(userdata2.agreement == 0){
                        this.router.navigateByUrl('/agreement/'+userdata2._id);
                    }else{
                        this.router.navigateByUrl('/affiliate-dashboard');
                    }
                }else if(userdata2.ambassador == 1){
                    if(userdata2.agreement == 0){
                        this.router.navigateByUrl('/ambassador-agreement/'+userdata2._id);
                    }else{
                        this.router.navigateByUrl('/ambassador-dashboard');
                    }
                }else {
                    //this.router.navigateByUrl('/user-dashboard');
                    this.router.navigateByUrl('/my-order');
                }
            }
        }
        this.ambassadorlist();
        this.affiliatelist();

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
    }
    ambassadorlist() {
        let link = this._commonservices.nodesslurl + 'datalist';
        // this._http.post(link,{"source":this.tablename,"condition":{"username":"banetest"}})
        this._http.post(link, ({"source": "user_ambassador"}))
            .subscribe(res => {
                let result: any;
                result = res;
                this.ambassadorlistarray = result.res;
                console.log(this.ambassadorlistarray);
            });


    }
    affiliatelist(){
        let link=this._commonservices.nodesslurl+'datalist';
        this._http.post(link,({"source":"user_affiliate"}))
            .subscribe(res=>{
                let result:any;
                result=res;
                this.affiliatelistarray=result.res;
                console.log(this.affiliatelistarray);
            });

    }


    openDelModal(template: TemplateRef<any>){
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    }




}


