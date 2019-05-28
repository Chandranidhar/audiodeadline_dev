import { Component, OnInit, TemplateRef } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
@Component({
  selector: 'app-savedcards',
  templateUrl: './savedcards.component.html',
  styleUrls: ['./savedcards.component.css'],
  providers: [Commonservices]
})
export class SavedcardsComponent implements OnInit {

  public loadinglist:any=false;
  public serverurl:any;
  public userdata:any;
  public cardid:any;
  public userid:any;
  public cardlist:any=[];
  modalRef: BsModalRef;
  constructor(private _commonservices: Commonservices,userdata: CookieService,private _http: HttpClient,private modalService: BsModalService) {
    this.serverurl=_commonservices.url;
    this.userdata = userdata;
    this.getCardList();
  }

  ngOnInit() {
  }
  getCardList(){
    this.loadinglist = true;
    let link =this._commonservices.nodesslurl+'datalist';
    this._http.post(link, {"condition":{"userid_object": this.userdata.get('user_id')},"source": "carddetails"})
        .subscribe(res => {
          this.loadinglist = false;
          let result:any;
          result = res;
          this.cardlist = result.res;
        },error => {
          this.loadinglist = false;
          console.log("Oooops!");
         // this.getCardList();

        });

  }
  decline(): void {
    this.modalRef.hide();
  }
  confirm(){
    let link =this._commonservices.nodesslurl1+'deletecard';
    let data = {"userid": this.userid,"token":this.cardid};
    console.log('data');
    console.log(data);
    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          if(result.status == 'success'){
            this.getCardList();
            this.modalRef.hide();
          }
        },error => {
          console.log("Oooops!");
        });

  }
  openDelModal(template: TemplateRef<any>,item) {
    this.cardid = item.token;
    this.userid = item.userid;
    //noinspection TypeScriptValidateTypes
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }


}
