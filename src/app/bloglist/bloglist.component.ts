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
        this.searchText3='';
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            title :[""],
            description: [""],
            startdate: [""],
            enddate: [""],
        });
    }
    checkval(eventdata,event,type){

        var link = this.serverurl+'updateblogchange';

        var data = eventdata;
        if(event.target.checked){
            console.log(type);
            //return;
            if(type=='dancer'){
                data.dancer = 1;
            }

            if(type=='model'){
                data.model = 1;
            }

            if(type=='musicians'){
                data.musicians = 1;
            }

           if(type=='producer'){
               data.producer = 1;
            }
            if(type=='fan'){
                data.fan = 1;
            }
           if(type=='signupaffiliate'){
                    data.signupaffiliate = 1;
            }
            if(type=='ambassadors'){

                data.ambassadors = 1;
            }
        }else{
            if(type=='dancer'){
                data.dancer = 0;
            }

            if(type=='model'){
                data.model = 0;
            }

            if(type=='musicians'){
                data.musicians = 0;
            }

            if(type=='producer'){
                data.producer = 0;
            }
            if(type=='fan'){
                data.fan = 0;
            }
            if(type=='signupaffiliate'){
                data.signupaffiliate = 0;
            }
            if(type=='ambassadors'){

                data.ambassadors = 0;
            }
        }
        console.log('Data');
        //console.log(eventdata);
        console.log(data);
       // return;

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if (result.status == 'success') {
                    //this.bloglistpage.modalRef.hide();
                   // this.bloglistpage.getBlogList();

                    // this.router.navigate(['/blog-list']);
                }
                else {
                   // this.is_error = result.msg;
                }
            }, error => {
                console.log("Oooops!");
            });


    }

    allcheck(eventdata,event,type){
        /*this.dataForm.patchValue(
         {
         musicians:true,
         user:true
         }
         );*/
        var link = this.serverurl+'updateblogchange';

        var data = eventdata;
         if(event.target.checked){
                data.dancer = 1;
                data.model = 1;
                data.musicians = 1;
                data.producer = 1;
                 data.fan = 1;
         }else{
            data.dancer = 0;
            data.model = 0;
            data.musicians = 0;
            data.producer = 0;
            data.fan = 0;

        }

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if (result.status == 'success') {
                    //this.bloglistpage.modalRef.hide();
                    // this.bloglistpage.getBlogList();

                    // this.router.navigate(['/blog-list']);
                }
                else {
                    // this.is_error = result.msg;
                }
            }, error => {
                console.log("Oooops!");
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
