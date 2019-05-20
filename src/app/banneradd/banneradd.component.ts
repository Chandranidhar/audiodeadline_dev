import { Component, OnInit , TemplateRef} from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {FormControl, Validators, FormBuilder, FormGroup} from "@angular/forms";
// import {Http} from "@angular/http";

import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {BsModalService, BsModalRef} from "ngx-bootstrap";
import {CookieService} from "ngx-cookie-service";
import {BannerlistComponent} from "../bannerlist/bannerlist.component";
import {ImageCroppedEvent} from "ngx-image-cropper";
@Component({
  selector: 'app-banneradd',
  templateUrl: './banneradd.component.html',
  styleUrls: ['./banneradd.component.css'],
  providers: [Commonservices]
})
export class BanneraddComponent implements OnInit {
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
  public image1;
  public origimage;
  public imageloading;
  public imageserror;
  public selectedFile;
  public uploaderror;
  public image2;
  public origimage2;
  public imageloading2;
  public imageserror2;
  public selectedFile2;
  public uploaderror2;
  public image3;
  public origimage3;
  public imageloading3;
  public imageserror3;
  public selectedFile3;
  public uploaderror3;
  public bannerTypeList;
  public origimages;
  public images;
  public userid;
  public isadmin;
  public bannerlistpage;
  modalRef: BsModalRef;
  public base64image;
  public rawimage;

  constructor(fb: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private modalService: BsModalService, userdata: CookieService, public bannerlist:BannerlistComponent) {
    this.fb = fb;
    this.origimages = [];
    this.images = [];
    this.origimage = '';
    this.userid = '';
    this.image1 = '';
    this.origimage2 = '';
    this.image2 = '';
    this.origimage3 = '';
    this.image3 = '';
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

    let userdata2: any;
    userdata2= userdata.get('userdetails');
    if (typeof (userdata2) == 'undefined' || userdata2 == ''){
      this.router.navigateByUrl('/login');
    }else{
      userdata2 =JSON.parse(userdata2);
      this.userid = userdata2._id;
      this.isadmin = userdata2.admin;
    }
  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      label: ["", BanneraddComponent.validateLabel],
      type: ["", Validators.required],
      displayfor: ["", Validators.required],
      startdate: ["", Validators.required],
      enddate: ["", Validators.required],
      sponsor: [""],
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
    if(ev == '3' || ev == '4' || ev == '7' || ev == '8' || ev == '9'){
      this.imagewidth = 515;
      this.imageheight = 270;
    }
    if(ev == '5' || ev == '6'){
      this.imagewidth = 1080;
      this.imageheight = 1080;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.base64image = event.base64;
  }

  crop1(){
    this.rawimage = '';
    let link = this.siteurl+'saveCropImage1.php';
    let data = {filename: this.image1,base64image:this.base64image,cropwidth:1920,cropheight:401};

    this._http.post(link, data)
        .subscribe(res => {
          // var result = res.text();
          let result:any;
          result = res;
          this.image1 = '';
          this.image1 = result.data;
          this.modalRef.hide();
        }, error => {
          console.log("Oooops!");
        });
  }

  onFileChanged(event) {
    this.uploaderror = '';
    this.imageloading = true;
    this.image1 = '';
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
            this.image1 = res.filename2;
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

    if(this.image1 == '' && this.dataForm.controls['type'].value != ''){
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
    if(this.dataForm.controls['displayfor'].value !='' || this.dataForm.controls['displayfor'].value !=null){
      console.log(this.dataForm.controls['displayfor'].value);
      if(this.dataForm.controls['displayfor'].value.indexOf("Dancer")>-1){
        formval.dancer = 1;
      }
      if(this.dataForm.controls['displayfor'].value.indexOf("Model")>-1){
        formval.model = 1;
      }
      if(this.dataForm.controls['displayfor'].value.indexOf("Producer")>-1){
        formval.producer = 1;
      }
      if(this.dataForm.controls['displayfor'].value.indexOf("Musician")>-1){
        formval.musician = 1;
      }
      if(this.dataForm.controls['displayfor'].value.indexOf("Fan")>-1){
        formval.fan = 1;
      }
      if(this.dataForm.controls['displayfor'].value.indexOf("Ambassador")>-1){
        formval.ambassador = 1;
        console.log(formval.ambassador);
      }
      if(this.dataForm.controls['displayfor'].value.indexOf("Affiliate")>-1){
        formval.affiliate = 1;
      }
    }
    console.log(formval);
    if (this.dataForm.valid) {
      // var link = this.serverurl+'addmedia';
      var link = this._commonservices.nodesslurl1+'addmedia';
      var data = {
        label: formval.label,
        type: formval.type,
        dancer: formval.dancer,
        model: formval.model,
        producer: formval.producer,
        musician: formval.musician,
        fan: formval.fan,
        ambassador: formval.ambassador,
        affiliate: formval.affiliate,
        sponsor: formval.sponsor,
        image: this.image1,
        origimage: this.origimage,
        image2: this.image2,
        origimage2: this.origimage2,
        image3: this.image3,
        origimage3: this.origimage3,
        userid: this.userid,
        isadmin: this.isadmin,
        startdate: formval.startdate,
        enddate: formval.enddate,

      };

      this._http.post(link, data)
          .subscribe(res => {
            let result:any;
            result = res;
            if(result.status=='success'){
              // this.router.navigate(['/media-list']);
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
  cropimg1(template: TemplateRef<any>){
    //noinspection TypeScriptValidateTypes
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.rawimage = '';
    let link = this.siteurl+'getbase64image1.php';
    // let link = 'https://developmentapi.audiodeadline.com/getbase64image1.php';
    let data = {fileurl: this.image1};

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          console.log(result);
          console.log(result.data);
          this.rawimage = result.data;
        });
  }

}
