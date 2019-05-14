import {Component, OnInit, TemplateRef, Input} from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {moment} from "ngx-bootstrap/chronos/test/chain";
import {BannerlistComponent} from "../bannerlist/bannerlist.component";

@Component({
  selector: 'app-banneredit',
  templateUrl: './banneredit.component.html',
  styleUrls: ['./banneredit.component.css'],
  providers: [Commonservices]
})
export class BannereditComponent implements OnInit {
  public dataForm: FormGroup;
  public fb;
  public is_error;
  public siteurl;
  public serverurl;
  public fileurl;
  public uploadurl;
  public uploadfolder;
  public sponsorList;
  public imagewidth;
  public imageheight;
  public imagewidth2;
  public imageheight2;
  public imagewidth3;
  public imageheight3;
  public image;
  public image1;
  public origimage;
  public imageloading;
  public imageserror:any=false;
  public selectedFile;
  public uploaderror:any=false;
  public image2;
  public origimage2;
  public imageloading2;
  public imageserror2:any=false;
  public selectedFile2;
  public uploaderror2:any=false;
  public image3;
  public origimage3;
  public imageloading3;
  public imageserror3:any=false;
  public selectedFile3;
  public uploaderror3:any=false;
  public bannerTypeList;
  public origimages;
  public images;
  public userid;
  public _id;
  public isadmin;
  public bannerlistpage;
  public mediaid:any;

  @Input()
  set id(data: any) {
    this.mediaid = (data) || '<no name set>';
    this.mediaid = data;
    console.log(this.mediaid);
  }
  constructor(fb: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private modalService: BsModalService,private sanitizer:DomSanitizer,private route:ActivatedRoute, public bannerlist:BannerlistComponent) {
    this.fb = fb;
    this.serverurl = _commonservices.url;
    this.imagewidth = 0;
    this.imageheight = 0;
    this.imagewidth2 = 370;
    this.imageheight2 = 170;
    this.imagewidth3 = 1024;
    this.imageheight3 = 412;
    this.uploadfolder = 'banner/';
    this.siteurl=_commonservices.siteurl;
    this.serverurl=_commonservices.url;
    this.fileurl=_commonservices.fileurl;
    this.uploadurl=_commonservices.uploadncropurlnew;
    this.sponsorList=_commonservices.getSponsorList();
    this.bannerTypeList=_commonservices.getBannerTypeList();
    this.bannerlistpage = bannerlist;
    setTimeout(()=>{
      this.getmediadetails();

    },1000);


  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      label: ["", BannereditComponent.validateLabel],
      type: ["", Validators.required],
      sponsor: [""],
    });
  }

  getmediadetails(){

    let link = this._commonservices.nodesslurl1+'mediadetails';
    let data = {_id:this.mediaid};
    this._http.post(link ,data)
        .subscribe(res=>{
          let result:any;
          result = res;
         // console.log(result);
          if (result.status == 'success' && typeof(result.item) != 'undefined'){
            let mediadet = result.item;
            console.log(mediadet);
            this.dataForm.controls['label'].setValue(mediadet.label);
            this.dataForm.controls['type'].setValue(mediadet.type);
            this.cngtype(mediadet.type);
            this.dataForm.controls['sponsor'].setValue(mediadet.sponsor);
            this.image = mediadet.image;
            this.image1 = mediadet.image1;
            this.image2 = mediadet.image2;
            this.image3 = mediadet.image3;
            this.origimage = mediadet.origimage;
            this.origimage2 = mediadet.origimage2;
            this.origimage3 = mediadet.origimage3;
            this._id = mediadet._id;

            console.log("this.getTypeName(this.dataForm.controls");
            console.log(this.getTypeName(mediadet.type));
            console.log(this.dataForm.controls['type'].value);
          }

        });
  }


  static validateLabel(control: FormControl) {
    if (control.value === '') {
      return { blank: true };
    }
    var reg = /[^A-Za-z0-9 ]/;
    if (reg.test(control.value)) {
      return { invalid: true };
    }
  }

  cngtype(ev){
    if(ev == '2'){
      this.imagewidth = 370;
      this.imageheight = 340;
    }
    if(ev == '3' || ev == '4'|| ev == '7' || ev == '8' || ev == '9'){
      this.imagewidth = 515;
      this.imageheight = 270;
    }
    if(ev == '5' || ev == '6'){
      this.imagewidth = 1080;
      this.imageheight = 1080;
    }
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
    //console.log(spname);
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

  onFileChanged(event) {
    this.uploaderror = '';
    this.imageloading = true;
    this.image = '';
    this.imageserror = false;
    this.selectedFile = event.target.files[0];

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);
    uploadData.append('uploadfolder', this.uploadfolder);
    uploadData.append('imagewidth', this.imagewidth);
    uploadData.append('imageheight', this.imageheight);

    this._http.post(this.uploadurl, uploadData)
        .subscribe(event => {
          this.imageloading = false;
          let res:any;
          res = event;
          if(res.error_code == 0){
            this.origimage = res.filename;
            this.image = res.filename2;
          }else{
            this.uploaderror = res.msg;
          }
        }, error => {
          this.uploaderror = 'File Upload Error Occured! Try Again.';
          this.imageloading = false;
        });
  }
  onFileChanged2(event) {
    this.uploaderror2 = '';
    this.imageloading2 = true;
    this.image2 = '';
    this.imageserror2 = false;
    this.selectedFile2 = event.target.files[0];

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile2);
    uploadData.append('uploadfolder', this.uploadfolder);
    uploadData.append('imagewidth', this.imagewidth2);
    uploadData.append('imageheight', this.imageheight2);

    this._http.post(this.uploadurl, uploadData)
        .subscribe(event => {
          this.imageloading2 = false;
          let res:any;
          res = event;
          if(res.error_code == 0){
            this.origimage2 = res.filename;
            this.image2 = res.filename2;
          }else{
            this.uploaderror2 = res.msg;
          }
        }, error => {
          this.uploaderror2 = 'File Upload Error Occured! Try Again.';
          this.imageloading2 = false;
        });
  }
  onFileChanged3(event) {
    this.uploaderror3 = '';
    this.imageloading3 = true;
    this.image3 = '';
    this.imageserror3 = false;
    this.selectedFile3 = event.target.files[0];

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile3);
    uploadData.append('uploadfolder', this.uploadfolder);
    uploadData.append('imagewidth', this.imagewidth3);
    uploadData.append('imageheight', this.imageheight3);

    this._http.post(this.uploadurl, uploadData)
        .subscribe(event => {
          this.imageloading3 = false;
          let res:any;
          res = event;
          if(res.error_code == 0){
            this.origimage3 = res.filename;
            this.image3 = res.filename2;
          }else{
            this.uploaderror3 = res.msg;
          }
        }, error => {
          this.uploaderror3 = 'File Upload Error Occured! Try Again.';
          this.imageloading3 = false;
        });
  }
  dosubmit(formval){
    if(this.dataForm.controls['type'].value == '2'){
      this.dataForm.controls['sponsor'].setValidators(Validators.required);
    }
    this.imageserror = false;
    this.is_error = '';
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

    if(this.image == '' && this.dataForm.controls['type'].value != ''){
      this.imageserror = true;
      return true;
    }

    if(this.image2 == '' && this.dataForm.controls['type'].value == '2'){
      this.imageserror2 = true;
      return true;
    }

    if(this.image3 == '' && this.dataForm.controls['type'].value == '2'){
      this.imageserror3 = true;
      return true;
    }

    if (this.dataForm.valid) {
      var link = this._commonservices.nodeurl1+'mediaupdate';
      var data = {
        _id:this._id,
        label: formval.label,
        type: formval.type,
        sponsor: formval.sponsor,
        image: this.image,
        origimage: this.origimage,
        image2: this.image2,
        origimage2: this.origimage2,
        image3: this.image3,
        origimage3: this.origimage3
      };

      console.log(data);
      this._http.post(link, data)
          .subscribe(res => {
            let result:any ;
           result = res;
            if(result.status=='success'){
              //this.router.navigate(['/media-list']);
              this.bannerlistpage.modalRef.hide();
              this.bannerlistpage.getBannerList();
            }
            else {
              this.is_error= result.msg;
            }
          }, error => {
            console.log("Oooops!");
          });
    }
  }

}
