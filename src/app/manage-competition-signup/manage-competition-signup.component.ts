import { Component, OnInit, TemplateRef } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {Router,ActivatedRoute} from "@angular/router";
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
  public searchText3;
  public searchText6;
  public searchText2 = '';
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

  constructor(fb: FormBuilder, private _commonservices: Commonservices,private _http: HttpClient,
              private modalService: BsModalService,private sanitizer:DomSanitizer,public activeRoute:ActivatedRoute) {
    this.fb = fb;
    this.serverurl=_commonservices.url;
    this.fileurl=_commonservices.fileurl;
    this.videouploadfolder= 'artistxpvideo/';
    this.imageuploadfolder= 'artistxpimage/';
    this.musicuploadfolder= 'artistxpmusic/';
    this.iframevideourl = '';
    this.searchText3 = '';
    this.searchText6 = '';
    //this.getUserList();
    this.getCompetitionList();
    this.getGenreList();
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
      this.userlist = result.item;
      // this.ticketsalebanner = result.res;
      // console.log(this.ticketsalebanner);
    });

    this.dataForm = this.fb.group({
      fullname :[""],
      /*firstname :[""],
      lastname :[""],
      artistname:[""],*/
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

  viewassets(template: TemplateRef<any>,item) {
    this.selecteduser = item;
    /*this.musicform.patchValue({
     music : this.tempUploadFilename
     });*/
    this.dataForm.patchValue({
      fullname: this.selecteduser.name,
      email: this.selecteduser.email,/*
      genre: this.selecteduser.genrename,
      competition: this.selecteduser.competitionname,*/
      description: this.selecteduser.bio
    });
    this.dataForm.controls['genre'].setValue(this.selecteduser.genre);
    this.dataForm.controls['competition'].setValue(this.selecteduser.competitionname);
    console.log(this.dataForm.value);
    this.selecteduser.isImages = Array.isArray(item.images);
    this.selecteduser.isVideos = Array.isArray(item.videos);
    this.selecteduser.isMusics = Array.isArray(item.musics);
    if(this.selecteduser.backstorytype !='' && this.selecteduser.backstoryval !=''){
      if(this.selecteduser.backstorytype == 'Youtube'){
        this.iframevideourl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.selecteduser.backstoryval+'?rel=0&amp;showinfo=0');
      }else if(this.selecteduser.backstorytype == 'Vimeo'){
        this.iframevideourl = this.sanitizer.bypassSecurityTrustResourceUrl('https://player.vimeo.com/video/'+this.selecteduser.backstoryval+'?title=0&byline=0&portrait=0');
      }else{
        this.iframevideourl = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileurl+this.videouploadfolder+this.selecteduser.backstoryval);
      }
    }
    console.log(this.selecteduser);
    // console.log(this.dataForm.value);
    //noinspection TypeScriptValidateTypes
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }


  getUserList(){
    this.loadinglist = true;
    // var link =this.serverurl+'getcompetitionsignuplist';
    var link =this._commonservices.nodesslurl1+'getcompetitionsignuplist';
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
    // var link =this.serverurl+'competitionlist';
    var link =this._commonservices.nodesslurl1+'competitionlist';
    var data = {type: 'active'};

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          this.competitionlist = result.res;
          console.log(this.competitionlist);
        },error => {
          console.log("Oooops!");
        });

  }

  getGenreList(){
    // var link =this.serverurl+'genrelist';
    var link =this._commonservices.nodesslurl1+'genrelist';
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
    var fld_val = ev;
    if(fld_val != itemval){

      // var link =this.serverurl+'cngstatuscompuser';
      var link =this._commonservices.nodesslurl1+'cngstatuscompuser';
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
