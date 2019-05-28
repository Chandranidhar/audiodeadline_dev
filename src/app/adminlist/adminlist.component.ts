import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from '../app.commonservices';
import {Router, ActivatedRoute} from '@angular/router';

// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-adminlist',
    templateUrl: './adminlist.component.html',
    styleUrls: ['./adminlist.component.css'],
    providers: [Commonservices]
})

export class AdminlistComponent implements OnInit {

    date_search_source: any='all_admin';
    date_search_endpoint: any='datalist';
    search_settings:any={datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search By Date",field:"unixtime"}],textsearch:[{label:"Search By Name",field:'fullname'}]};




    public loadinglist:boolean;
    public p: number = 1;
    modalRef: BsModalRef;
    public userdata: CookieService;
    public serverurl;
    public userlist;
    public adminlist:any={};
    public searchText;
    public idx;
    public editroute1:any='edit-admin';
    datasource:any;
    adminlistarray:any=[];
    grab_link: any = [
        {
            col_name: 'grab_url',
            field_name: 'username'
        },
        {
            label: 'artistxp grab url',
            url: 'https://artistxp.com/',
            action: 'null'
        }, {
            label: 'Audiodeadline grab url',
            url: 'https://development.audiodeadline.com/',
            action: 'null'
        }
    ];
    adminlistarray_skip:any=["_id","grab_url", "phone", "username", "password", "address", "address2", "city", "state", "zip", "rsvp", "signupaffiliate","parent","admin", "agreement", "noofclick", "mediaid", "gender", "ambassador", "dancer", "model", "musicians", "fan", "accesscode", "lastactivetime", "agreement_time", "sign", "commission","fb_access_token","fb_access_token_expire_in","fullname","unixtime"];
    adminlistarray_modify_header:any={'added_time':"Date Added",'firstname':"First Name",'lastname':"Last Name",'email':"Email"};
    // admintablename:'all_users';
    admintablename:any='user';
    updateurl:any = 'addorupdatedata';
    apiurl:any;
    jwttoken:any;
    deleteval:any= 'deletesingledata';
    adminstatusarray:any=[{val:1,name:'Active'},{val:0,name:'Inactive'}];


    constructor(private _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService, public activeRoute:ActivatedRoute,userdata: CookieService) {
        this.userdata = userdata;
        this.serverurl=_commonservices.url;
        this.apiurl = _commonservices.nodesslurl;
        this.jwttoken = this.userdata.get('jwttoken');
        // this.getUserList();
        //this.adminlist();

    }

    ngOnInit() {
        this.activeRoute.data.forEach((data) => {
            console.log('json',data['results']);
            console.log(data);
            console.log(data['results']);
            let result=data['results'];
            console.log(result);
             this.adminlistarray = result.res;

            // console.log(this.ticketsalebanner);



        });
    }


    getUserList(){
        this.loadinglist = true;
        this.adminlistarray=[];
        var link =this.serverurl+'adminlist';
        var data = {type : 'admin'};

        this._http.post(link, data)
            .subscribe(res => {
                this.loadinglist = false;
                let result:any;
                result = res;
                this.adminlistarray = result.res;
            },error => {
                this.loadinglist = false;
                console.log("Oooops!");
            });
    }

    cngstatus(item){
        var status = 1;
        if(typeof (item.status) != 'undefined')
            status = 1-parseInt(item.status);
        var link =this.serverurl+'cngstatus';
        var data = {_id:item._id,status : status,type:'user'};

        this._http.post(link, data)
            .subscribe(res => {
                item.status = status;
            },error => {
                console.log("Oooops!");
            });
    }

    openDelModal(template: TemplateRef<any>,item){
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

    openAddModal(template: TemplateRef<any>){
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md addadmin'});
    }

    openEditModal(template: TemplateRef<any>){
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md editadmin'});
    }
}