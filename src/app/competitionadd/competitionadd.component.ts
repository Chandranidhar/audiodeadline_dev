import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {moment} from "ngx-bootstrap/chronos/test/chain";
// import {Http} from "@angular/http";
import {Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {CompetitionlistComponent} from "../competitionlist/competitionlist.component";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-competitionadd',
  templateUrl: './competitionadd.component.html',
  styleUrls: ['./competitionadd.component.css'],
  providers: [Commonservices]
})
export class CompetitionaddComponent implements OnInit {
  public dataForm: FormGroup;
  public fb;
  public is_error;
  public siteurl;
  public serverurl;
  public fileurl;
  public uploadurl;
  public formval;
  public formvalstartdate;
  public formvalenddate;
  public formvalendbgimage;
  public base64image;
  public rawimage;
  public image;
  public image1;
  public image2;
  public imageloading;
  public imageserror:boolean;
  public selectedFile:File;
  public competitionlistpage;
  modalRef: BsModalRef;
  constructor(fb: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private modalService: BsModalService,private sanitizer:DomSanitizer,public competitionlist:CompetitionlistComponent
  ) {
    this.fb = fb;
    this.image = '';
    this.image1 = '';
    // this.siteurl=_commonservices.siteurl;
    this.siteurl=_commonservices.phpurl;
    this.serverurl=_commonservices.url;
    this.fileurl=_commonservices.fileurl;
    this.uploadurl=_commonservices.uploadncropurl;
    this.imageserror = false;
    this.competitionlistpage = competitionlist;
  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      competitionname: ["", Validators.required],
      description: ["", Validators.required],
      startdate: ["", CompetitionaddComponent.validateDate],
      enddate: ["", CompetitionaddComponent.validateDate],
    });
  }

  static validateDate(control: FormControl) {
    if (control.value === '') {
      return { blankdate: true };
    }
    if (!moment(control.value).isValid()) {
      return { invaliddate: true };
    }
  }

  onFileChanged(event) {
    this.imageloading = 'line-loader.gif';
    this.image = '';
    this.image1 = '';
    this.image2 = '';
    this.imageserror = false;
    this.selectedFile = event.target.files[0];

    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile);

    this._http.post(this.uploadurl, uploadData)
        .subscribe(event => {
          this.imageloading = '';
          let res:any;
          res = event;
          if(res.error_code == 0){
            this.image = res.filename;
            this.image1 = res.filename1;
            this.image2 = res.filename2;
          }else{
            this.imageserror = true;
          }
        }, error => {
          this.imageserror = true;
          this.imageloading = '';
        });
  }

  dosubmit(formval){
    this.imageserror = false;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if(this.image1 == ''){
      this.imageserror = true;
      return true;
    }
    if (this.dataForm.valid) {
      var link = this.serverurl+'addcompetition';
      var data = {
        competitionname: formval.competitionname,
        description: formval.description,
        startdate: moment(formval.startdate).unix(),
        enddate: moment(formval.enddate).unix(),
        image: this.image,
        image1: this.image1,
        image2: this.image2,
      };

      this._http.post(link, data)
          .subscribe(res => {
            let result:any;
            result = res;
            if(result.status=='success'){
              // this.router.navigate(['/competition-list']);
              this.competitionlistpage.modalRef.hide();
              this.competitionlistpage.getCompetitionList();
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
    let data = {fileurl: this.image};

    this._http.post(link, data)
        .subscribe(res => {
            let result:any;
            result = res;
            console.log(result);
            console.log(result.data);
            this.rawimage = result.data;
        });
  }

  cropimg2(template: TemplateRef<any>){
    //noinspection TypeScriptValidateTypes
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    this.rawimage = '';
    let link = this.siteurl+'getbase64image1.php';
    let data = {fileurl: this.image};

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          // result = res.text();
          result = res;
          // this.rawimage = result;
            this.rawimage = result.data;
        }, error => {
          console.log("Oooops!");
        });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.base64image = event.base64;
  }

  crop1(){
    this.rawimage = '';
    let link = this.siteurl+'saveCropImage1.php';
    let data = {filename: this.image,base64image:this.base64image,cropwidth:1920,cropheight:401};

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

  crop2(){
    this.rawimage = '';
    let link = this.siteurl+'saveCropImage1.php';
    let data = {filename: this.image,base64image:this.base64image,cropwidth:295,cropheight:196};

    this._http.post(link, data)
        .subscribe(res => {
          // var result = res.text();
          let result:any;
          result = res;
          this.image2 = '';
          this.image2 = result.data;
          this.modalRef.hide();
        }, error => {
          console.log("Oooops!");
        });
  }

  previewcomp(template: TemplateRef<any>,formval){
    this.formval = formval;
    this.formvalstartdate = moment(formval.startdate).format('Do MMM YYYY');
    this.formvalenddate = moment(formval.enddate).format('Do MMM YYYY');
    this.formvalendbgimage = this.sanitizer.bypassSecurityTrustStyle('url('+this.fileurl+this.image1+')  no-repeat left 7% bottom');
    this.imageserror = false;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }
    if(this.image1 == ''){
      this.imageserror = true;
      return true;
    }
    if (this.dataForm.valid) {
      //noinspection TypeScriptValidateTypes
      this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
    }
  }
  close(): void {
    this.modalRef.hide();
  }
}
