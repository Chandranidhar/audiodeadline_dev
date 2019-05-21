import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
// import {Http} from '@angular/http';
import {Commonservices} from '../app.commonservices';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormBuilder} from "@angular/forms";


@Component({
    selector: 'app-bloglist',
    templateUrl: './bloglist.component.html',
    styleUrls: ['./bloglist.component.css'],
    providers: [Commonservices]
})
export class BloglistComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public loadinglist:boolean;
    public p: number = 1;
    modalRef: BsModalRef;
    public serverurl;
    public bloglist;
    public id;
    public idx;
    public searchText;
    public searchText2='';
    public searchText3;

    constructor(fb: FormBuilder, public _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService) {
        this.fb = fb;
        this.serverurl=_commonservices.url;
        this.getBlogList();
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            title :[""],
            description: [""],
            startdate: [""],
            enddate: [""],
        });
    }

    getBlogList(){
        this.loadinglist = true;
        var link =this.serverurl+'bloglist';
        var data = {};

        this._http.post(link, data)
            .subscribe(res => {
                this.loadinglist = false;
                let result:any;
                result = res;
                this.bloglist = result.res;
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
        var data = {_id:item._id,status : status,type:'blog'};

        this._http.post(link, data)
            .subscribe(res => {
                item.status = status;
            },error => {
                console.log("Oooops!");
            });
    }

    openDelModal(template: TemplateRef<any>,item) {
        this.idx = this.bloglist.indexOf(item);
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    }

    confirm(): void {
        var link =this.serverurl+'deleteblog';
        var data = {_id:this.bloglist[this.idx]._id};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.status == 'success'){
                    this.bloglist.splice(this.idx, 1);
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
        this.modalRef = this.modalService.show(template, {class: 'modal-lg addblog'});
    }


    openEditModal(template: TemplateRef<any>,item){
        this.id = item;
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-lg editblog'});
    }


}
