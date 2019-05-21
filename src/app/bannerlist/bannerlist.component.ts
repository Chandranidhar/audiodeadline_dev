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
    public mediaid:any = '';

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
    }

    ngOnInit() {}

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
        var link =this._commonservices.nodesslurl1+'medialist';
        var data = {userid: this.userid,isadmin: this.isadmin};

        this._http.post(link, data)
            .subscribe(res => {
                this.loadinglist = false;
                let result:any;
                result = res;
                this.bannerlist = result.res;
                console.log(this.bannerlist);
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


}
