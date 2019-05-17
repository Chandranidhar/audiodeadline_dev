import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-promocodelist',
    templateUrl: './promocodelist.component.html',
    styleUrls: ['./promocodelist.component.css'],
    providers: [Commonservices]
})
export class PromocodelistComponent implements OnInit {
    public loadinglist:boolean;
    public p: number = 1;
    modalRef: BsModalRef;
    public serverurl;
    public searchText3;
    public promocodelist;
    public searchText;
    public idx;
    public editobj;

    constructor(private _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService) {
        this.serverurl=_commonservices.url;
        this.searchText3 = '';
        this.getPromocodeList();
    }

    ngOnInit() {
    }

    getPromocodeList(){
        this.loadinglist = true;
        var link =this.serverurl+'promocodelist';
        var data = {};

        this._http.post(link, data)
            .subscribe(res => {
                this.loadinglist = false;
                let result:any;
                result = res;
                this.promocodelist = result.res;
            },error => {
                this.loadinglist = false;
                console.log("Oooops!");
            });

    }

    cngstatus(item){
        var status = 1;
        if(typeof (item.status) != 'undefined')
            status = 1-parseInt(item.status);
        var link =this.serverurl+'cngstatusprocode';
        var data = {_id:item._id,status : status,type:'user'};

        this._http.post(link, data)
            .subscribe(res => {
                item.status = status;
            },error => {
                console.log("Oooops!");
            });
    }


    openDelModal(template: TemplateRef<any>,item) {
        this.idx = this.promocodelist.indexOf(item);
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    }

    confirm(): void {
        var link =this.serverurl+'deleteprocode';
        var data = {_id:this.promocodelist[this.idx]._id};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.status == 'success'){
                    this.promocodelist.splice(this.idx, 1);
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

        this.modalRef = this.modalService.show(template, {class: 'modal-md addpromocode'});
    }

    openEditModal(template: TemplateRef<any>,item:any){
        this.editobj = item._id;
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md editpromocode'});
    }

}
