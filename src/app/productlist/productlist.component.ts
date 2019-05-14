import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from "ngx-bootstrap";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {Commonservices} from "../app.commonservices";

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
  providers: [Commonservices]
})
export class ProductlistComponent implements OnInit {
    public loadinglist:boolean;
    public p: number = 1;
  modalRef: BsModalRef;
  public serverurl;
  public productlist;
  public idx;

  constructor(private _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService) {
    this.serverurl=_commonservices.url;
    this.getProductList();
  }

  ngOnInit() {
  }

  getProductList(){
      this.loadinglist = true;
    var link =this.serverurl+'productlist';
    var data = {};

    this._http.post(link, data)
        .subscribe(res => {
            this.loadinglist = false;
            let result:any;
          result = res;
          this.productlist = result.res;
        },error => {
            this.loadinglist = false;
          console.log("Oooops!");
        });

  }

  cngstatus(item){
    var status = 1;
    if(typeof (item.status) != 'undefined')
      status = 1-parseInt(item.status);
    var link =this.serverurl+'cngstatusproduct';
    var data = {_id:item._id,status : status,type:'user'};

    this._http.post(link, data)
        .subscribe(res => {
          item.status = status;
        },error => {
          console.log("Oooops!");
        });
  }


  openDelModal(template: TemplateRef<any>,item) {
    this.idx = this.productlist.indexOf(item);
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  confirm(): void {
    var link =this.serverurl+'deleteproduct';
    var data = {_id:this.productlist[this.idx]._id};

    this._http.post(link, data)
        .subscribe(res => {
            let result:any;
          result = res;
          if(result.status == 'success'){
            this.productlist.splice(this.idx, 1);
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


}
