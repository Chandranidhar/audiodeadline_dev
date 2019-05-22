import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-bannerlist',
    templateUrl: './bannerlist.component.html',
    styleUrls: ['./bannerlist.component.css'],
    providers: [Commonservices]
})

export class BannerlistComponent implements OnInit {
    public loadinglist:boolean;
    public p: number = 1;
    modalRef: BsModalRef;
    public serverurl;
    public fileurl;
    public bannerlist;
    public idx;
    public searchType;
    public searchStatus;
    public sponsorList;
    public uploadfolder;
    public bannerTypeList;
    public inlineerror;
    public isadmin;
    public userid;
    public searchText;
    public searchText3;
    public rolediv:any = [];
    public arrayforrole:any = [];
    public mediaid:any = '';
    public item;

    constructor(private _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService, userdata: CookieService, private router: Router) {
        this.serverurl=_commonservices.url;
        this.uploadfolder = 'banner/';
        this.fileurl=_commonservices.fileurl;
        this.searchType = '';
        this.searchStatus = '';
        this.sponsorList=_commonservices.getSponsorList();
        this.bannerTypeList=_commonservices.getBannerTypeList();
        let userdata2: any;
        userdata2= userdata.get('userdetails');
        if (typeof (userdata2) == 'undefined' || userdata2 == ''){
            this.router.navigateByUrl('/login');
        }else{
            userdata2 =JSON.parse(userdata2);
            this.userid = userdata2._id;
            this.isadmin = userdata2.admin;
        }
        this.getBannerList();
        // this.arrayforrole.push("Fan");
    }

    ngOnInit() {

    }

    openrolediv(id){

        if(this.rolediv[id]==null){

            this.rolediv[id]=1;
        }else {

            this.rolediv[id] = 1-this.rolediv[id];
        }

    }
    getBannerList(){
        this.loadinglist = true;
        // var link =this.serverurl+'medialist';
        var link =this._commonservices.nodesslurl1+'medialistnew';
        var data = {userid: this.userid,isadmin: this.isadmin};

        this._http.post(link, data)
            .subscribe(res => {
                this.loadinglist = false;
                let result:any;
                result = res;
                this.bannerlist = result.res;
                console.log(this.bannerlist);
                for(let i in this.bannerlist){
                    if(this.bannerlist[i].musician ==1 || this.bannerlist[i].dancer ==1 || this.bannerlist[i].fan ==1 || this.bannerlist[i].producer ==1 || this.bannerlist[i].model ==1 ){
                        this.bannerlist[i].user = 1;
                        this.openrolediv(this.bannerlist[i]._id);
                    }
                }
            },error => {
                this.loadinglist = false;
                console.log("Oooops!");
            });
    }

    cngstatus(item){
        var status = 1;
        if(typeof (item.status) != 'undefined')
            status = 1-parseInt(item.status);
        var link =this.serverurl+'cngstatusmedia';
        var data = {_id:item._id,status : status};
        this._http.post(link, data)
            .subscribe(res => {
                item.status = status;
            },error => {
                console.log("Oooops!");
            });
    }

    openDelModal(template: TemplateRef<any>,item) {
        this.idx = this.bannerlist.indexOf(item);
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    }

    confirm(): void {
        var link =this.serverurl+'deletemedia';
        var data = {_id:this.bannerlist[this.idx]._id};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.status == 'success'){
                    this.bannerlist.splice(this.idx, 1);
                }
                this.modalRef.hide();
            },error => {
                console.log("Oooops!");
                this.modalRef.hide();
            });
    }

    linkedmediadel(idx): void {
        var link =this.serverurl+'deletemedia';
        var data = {_id:this.bannerlist[idx]._id};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.status == 'success'){
                    this.bannerlist.splice(idx, 1);
                    this.bannerlist.splice(this.idx, 1);
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

    getTypeName(type){
        var spname = '';
        var spobj = this.bannerTypeList.filter(function (el) {
            if(el.val == type)
                return el;
        });
        if(typeof(spobj) != 'undefined'){
            if(typeof(spobj[0]) == 'object'){
                return spobj[0].label;
            }
        }
        return spname;
    }

    getSponsorName(sponsor){
        var spname = 'N/A';
        var spobj = this.sponsorList.filter(function (el) {
            if(el.name == sponsor)
                return el;
        });
        if(typeof(spobj) != 'undefined'){
            if(typeof(spobj[0]) == 'object'){
                return spobj[0].label;
            }
        }
        return spname;
    }

    getStatusName(status){
        var satatuname = '';
        if(status == 1){
            satatuname = 'Active';
        }
        if(status == 2){
            satatuname = 'Inactive';
        }
        if(status == 3){
            satatuname = 'Pending';
        }
        return satatuname;
    }

    isClickedFunc(item,fld_name){
        this.inlineerror = '';
        if(fld_name == 'sortindex'){
            item.isSortindexClicked = true;
        }
        if(fld_name == 'label'){
            item.isLabelClicked = true;
        }
        if(fld_name == 'status'){
            item.isStatusClicked = true;
        }
    }

    editInlineField(ev,fld_name,item,itemval){
        var fld_val = ev.target.value;
        if(fld_val != itemval){
            if(fld_name == 'sortindex'){
                if(fld_val == ''){
                    this.inlineerror = '*Please insert value';
                    ev.target.focus();
                    ev.target.value = itemval;
                    return true;
                }else{
                    fld_val = parseInt(fld_val);
                    if(fld_val == 0){
                        ev.target.value = itemval;
                        ev.target.focus();
                        this.inlineerror = '*Please insert value';
                        return true;
                    }
                }
            }
            if(fld_name == 'label'){
                if(fld_val == ''){
                    this.inlineerror = '*Please insert value';
                    ev.target.focus();
                    ev.target.value = itemval;
                    return true;
                }
            }

            // var link =this.serverurl+'updatemediainline';
            var link =this._commonservices.nodesslurl1+'updatemediainline';
            // var link =this._commonservices.nodesslurl+'updatemediainline';
            var data = {_id: item._id,fieldname:fld_name,filedvalue:fld_val};

            this._http.post(link, data)
                .subscribe(res => {
                    let result:any;
                    result = res;
                    if(result.status == 'error'){
                        ev.target.focus();
                        this.inlineerror = result.msg;
                        return true;
                    }
                    item.isSortindexClicked = false;
                    item.isLabelClicked = false;
                    item.isStatusClicked = false;
                    if(result.status == 'success'){
                        if(fld_name == 'sortindex'){
                            item.sortindex = fld_val;
                        }
                        if(fld_name == 'label'){
                            item.label = fld_val;
                        }
                        if(fld_name == 'status'){
                            item.status = fld_val;
                        }
                    }
                },error => {
                    item.isSortindexClicked = false;
                    item.isLabelClicked = false;
                    item.isStatusClicked = false;
                    console.log("Oooops!");
                });
        }else{
            item.isSortindexClicked = false;
            item.isLabelClicked = false;
            item.isStatusClicked = false;
        }
    }


    selectblur(item){
        item.isStatusClicked = false;
    }


    openEditModal(template: TemplateRef<any>,id:any){
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md editmedialist'});
        this.mediaid = id;

    }

    openAddModal(template: TemplateRef<any>){
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md addmedialist'});
    }
    changerole(item:any){

        // console.log(item.fan);
        if(item.fan == true){
            item.fan = 1;

        }else{
            item.fan = 0;
        }
        if(item.model == true){
            item.model = 1;

        }else{
            item.model = 0;
        }
        if(item.dancer == true){
            item.dancer = 1;

        }else{
            item.dancer = 0;
        }
        if(item.musician == true){
            item.musician = 1;

        }else{
            item.musician = 0;
        }
        if(item.producer == true){
            item.producer = 1;

        }else{
            item.producer = 0;
        }
        if(item.affiliate == true){
            item.affiliate = 1;

        }else{
            item.affiliate = 0;
        }
        if(item.ambassador == true){
            item.ambassador = 1;

        }else{
            item.ambassador = 0;
        }
        // console.log(item);
        let dataval:any ={fan:item.fan,musician : item.musician, dancer: item.dancer, producer: item.producer, model:item.model, affiliate:item.affiliate, ambassador:item.ambassador,id:item._id};
        let data:any = {data: dataval,source:'media'};
        console.log(data);
        let link = this._commonservices.nodesslurl+'addorupdatedata';
        this._http.post(link,data)
            .subscribe(res=>{
                let result:any = {};
                result = res;
                console.log(result);
                if(result.status == "success"){
                    this.getBannerList();
                }
            });
    }
}
