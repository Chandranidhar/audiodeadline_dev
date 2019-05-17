import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Commonservices} from "../app.commonservices";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-competitionlist',
  templateUrl: './competitionlist.component.html',
  styleUrls: ['./competitionlist.component.css'],
  providers: [Commonservices]
})
export class CompetitionlistComponent implements OnInit {
  public loadinglist:boolean;
  public p: number = 1;
  modalRef: BsModalRef;
  modalRef1: BsModalRef;
  modalRef2: BsModalRef;
  public serverurl;
  public fileurl;
  public competitionlist;
  public idx;
  public maxlength;
  public isMore;
  public moreTxt;
  public updatedcompetition;
  public searchText;
  public searchText2='';
  public paramid:any = '';

  constructor(private _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService, public activeRoute:ActivatedRoute) {
    this.maxlength= 100;
    this.isMore= false;
    this.moreTxt= 'Show More';
    this.serverurl=_commonservices.url;
    this.fileurl=_commonservices.fileurl;
    // this.getCompetitionList();
  }

  ngOnInit() {
    this.activeRoute.data.forEach((data) => {
      //PRE LOAD DATA PRIOR
      /*console.log('route data for profile');
       console.log('json',data['results']);
       console.log(data['results'].item);*/
      // console.log('json',data['results']);
      console.log('json',data['results']);
      let result=data['results'];
      console.log(result);
      this.competitionlist = result.res;
      // this.ticketsalebanner = result.res;
      // console.log(this.ticketsalebanner);
    });
  }

  getCompetitionList(){
    this.loadinglist = true;
    var link =this._commonservices.nodesslurl1+'competitionlist';
    var data = {};

    this._http.post(link, data)
        .subscribe(res => {
          this.loadinglist = false;
          let result:any;
          result = res;
          this.competitionlist = result.res;
        },error => {
          this.loadinglist = false;
          // this.getCompetitionList();
          console.log("Oooops!");
        });

  }

  cngstatus(item){
    var status = 1;
    if(typeof (item.status) != 'undefined')
      status = 1-parseInt(item.status);
    var link =this.serverurl+'cngstatuscompetition';
    var data = {_id:item._id,status : status};

    this._http.post(link, data)
        .subscribe(res => {
          item.status = status;
        },error => {
          console.log("Oooops!");
        });
  }

  openDelModal(template: TemplateRef<any>,item) {
    this.idx = this.competitionlist.indexOf(item);
    //noinspection TypeScriptValidateTypes
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  confirm(): void {
    var link =this.serverurl+'deletecompetition';
    var data = {_id:this.competitionlist[this.idx]._id};
    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          if(result.status == 'success'){
            this.competitionlist.splice(this.idx, 1);
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

  readmore(item){
    this.isMore = !this.isMore;
    if(this.isMore){
      this.maxlength = item.description.length;
      this.moreTxt= 'Show Less';
    }else{
      this.maxlength = 100;
      this.moreTxt= 'Show More';
    }
  }

  managesetting(template: TemplateRef<any>,item){
    this.updatedcompetition = item;
    this.modalRef = this.modalService.show(template);
  }

  savemanagesettings(template1: TemplateRef<any>,template2: TemplateRef<any>){
    this.modalRef.hide();
    this.modalRef1 = this.modalService.show(template1);
    if(!this.updatedcompetition.noofphoto){
      this.updatedcompetition.noofphoto = 0;
    }
    if(!this.updatedcompetition.noofvideo){
      this.updatedcompetition.noofvideo = 0;
    }
    if(!this.updatedcompetition.noofmusic){
      this.updatedcompetition.noofmusic = 0;
    }
    var link = this.serverurl+'updatecompetitionsettings';
    var data = {
      _id: this.updatedcompetition._id,
      backstoryrequired: this.updatedcompetition.backstoryrequired,
      photorequired: this.updatedcompetition.photorequired,
      videorequired: this.updatedcompetition.videorequired,
      musicrequired: this.updatedcompetition.musicrequired,
      noofphoto: this.updatedcompetition.noofphoto,
      noofvideo: this.updatedcompetition.noofvideo,
      noofmusic: this.updatedcompetition.noofmusic,
    };

    this._http.post(link, data)
        .subscribe(res => {
          this.modalRef1.hide();
          this.modalRef2 = this.modalService.show(template2);
          setTimeout(()=>{
            this.modalRef2.hide();
          }, 3000);
        }, error => {
          this.modalRef1.hide();
          console.log("Oooops!");
        });
  }

  checkValue(event: any,fldval){
    if(fldval == 'backstoryrequired'){
      if(event.target.checked){
        this.updatedcompetition.backstoryrequired = 1;
      }else{
        this.updatedcompetition.backstoryrequired = 0;
      }
    }
    if(fldval == 'photorequired'){
      if(event.target.checked){
        this.updatedcompetition.photorequired = 1;
      }else{
        this.updatedcompetition.photorequired = 0;
        this.updatedcompetition.noofphoto = 0;
      }
    }
    if(fldval == 'videorequired'){
      if(event.target.checked){
        this.updatedcompetition.videorequired = 1;
      }else{
        this.updatedcompetition.videorequired = 0;
        this.updatedcompetition.noofvideo = 0;
      }
    }
    if(fldval == 'musicrequired'){
      if(event.target.checked){
        this.updatedcompetition.musicrequired = 1;
      }else{
        this.updatedcompetition.musicrequired = 0;
        this.updatedcompetition.noofmusic = 0;
      }
    }
  }


  openAddModal(template: TemplateRef<any>){
    //noinspection TypeScriptValidateTypes
    this.modalRef = this.modalService.show(template, {class: 'modal-md addcompetition'});
  }

  openEditModal(template: TemplateRef<any>,id:any){
    //noinspection TypeScriptValidateTypes
    this.modalRef = this.modalService.show(template, {class: 'modal-md editcompetition'});
    this.paramid = id;
  }


}
