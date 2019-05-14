import { Component, OnInit, TemplateRef } from '@angular/core';
import {Commonservices} from "../app.commonservices";
// import {Http} from "@angular/http";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {DomSanitizer} from "@angular/platform-browser";
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormBuilder} from "@angular/forms";



@Component({
  selector: 'app-manage-competition-signup',
  templateUrl: './manage-competition-signup.component.html',
  styleUrls: ['./manage-competition-signup.component.css'],
  providers: [Commonservices]
})
export class ManageCompetitionSignupComponent implements OnInit {

  public dataForm: FormGroup;
  public fb;
  public idx;
  modalRef: BsModalRef;
  public loadinglist:boolean;
  public p: number = 1;
  public serverurl;
  public userlist;
  public searchText;
  public searchText2 = '';
  public searchText3 = '';
  public searchText4 = '';
  public searchText5;
  public selecteduser;
  public iframevideourl;
  public fileurl;
  public videouploadfolder;
  public imageuploadfolder;
  public musicuploadfolder;
  public competitionlist;
  public genrelist;

  constructor(fb: FormBuilder, private _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService,private sanitizer:DomSanitizer) {
    this.fb = fb;
    this.serverurl=_commonservices.url;
    this.fileurl=_commonservices.fileurl;
    this.videouploadfolder= 'artistxpvideo/';
    this.imageuploadfolder= 'artistxpimage/';
    this.musicuploadfolder= 'artistxpmusic/';
    this.iframevideourl = '';
    this.getUserList();
    this.getCompetitionList();
    this.getGenreList();
  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      fullname :[""],
      firstname :[""],
      lastname :[""],
      artistname:[""],
      birthdate:[""],
      state:[""],
      email:[""],
      phonenumber:[""],
      competition:[""],
      genre:[""],
      competitionname: [""],
      description: [""],
      startdate: [""],
      enddate: [""],
    });

  }




  getUserList(){
    this.loadinglist = true;
    var link =this.serverurl+'getcompetitionsignuplist';
    var data = {};

    this._http.post(link, data)
        .subscribe(res => {
          this.loadinglist = false;
          let result:any;
          result = res;
          this.userlist = result.item;
        },error => {
          this.loadinglist = false;
          console.log("Oooops!");
        });
  }

  getCompetitionList(){
    var link =this.serverurl+'competitionlist';
    var data = {type: 'active'};

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          this.competitionlist = result.res;
        },error => {
          console.log("Oooops!");
        });

  }

  getGenreList(){
    var link =this.serverurl+'genrelist';
    var data = {type: 'active'};

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          this.genrelist = result.res;
        },error => {
          console.log("Oooops!");
        });

  }


  getStatusName(status){
    var satatuname = 'Pending';
    if(status == 1){
      satatuname = 'Approved';
    }
    if(status == 2){
      satatuname = 'Declined';
    }
    return satatuname;
  }

  isClickedFunc(item){
    item.isStatusClicked = true;
  }

  editInlineField(ev,item,itemval){
    var fld_val = ev.target.value;
    if(fld_val != itemval){

      var link =this.serverurl+'cngstatuscompuser';
      var data = {_id: item._id,filedvalue:fld_val};

      this._http.post(link, data)
          .subscribe(res => {
            let result:any;
            result = res;
            item.isStatusClicked = false;
            item.status = fld_val;
          },error => {
            item.isStatusClicked = false;
            console.log("Oooops!");
          });
    }else{
      item.isStatusClicked = false;
    }
  }

  selectblur(item){
    item.isStatusClicked = false;
  }

  hideBtn(item){
    var isnull = 1;
    if(item.backstorytype != '' && item.backstoryval != ''){
      isnull = 0;
    }else if (item.images instanceof Array) {
      if(item.images.length > 0){
        isnull = 0;
      }
    }else if (item.videos instanceof Array) {
      if(item.videos.length > 0){
        isnull = 0;
      }
    }else if (item.musics instanceof Array) {
      if(item.musics.length > 0){
        isnull = 0;
      }
    }

    if(isnull == 1){
      return true;
    }

    return false;
  }

  getPath(item,folder){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.fileurl+folder+item);
  }




}
