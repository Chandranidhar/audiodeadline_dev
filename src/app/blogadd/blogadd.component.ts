import { Component, OnInit, TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Commonservices} from '../app.commonservices';

import {Router} from '@angular/router';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {CookieService} from 'ngx-cookie-service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {BloglistComponent} from "../bloglist/bloglist.component";

@Component({
    selector: 'app-blogadd',
    templateUrl: './blogadd.component.html',
    styleUrls: ['./blogadd.component.css'],
    providers: [Commonservices]
})

export class BlogaddComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public siteurl;
    public nodeurl;
    private uploadurl;
    private showimageurl;
    public userid;
    public is_error;
    public videolink;
    public searchText3;
    public videolinkerror:boolean;
    public imageserror:boolean;
    public videos:any;
    public images:any;
    public selectedFile:File;
    modalRef:BsModalRef;

    constructor(fb: FormBuilder,public _commonservices : Commonservices,private _http: HttpClient,private router: Router,private sanitizer: DomSanitizer, userdata: CookieService,public bloglistpage:BloglistComponent) {
        this.fb = fb;
        this.videos = [];
        this.images = [];
        this.searchText3='';
        this.videolinkerror = false;
        this.imageserror = false;
        this.serverurl=_commonservices.url;
        this.siteurl=_commonservices.siteurl;
        this.nodeurl=_commonservices.nodeurl;
        this.uploadurl=_commonservices.uploadurl;
        this.showimageurl=_commonservices.fileurl_new;
        this.bloglistpage=bloglistpage;
console.log(this.showimageurl);
        let userdata2: any;
        userdata2= userdata.get('userdetails');

        if (typeof (userdata2) == 'undefined' || userdata2 == ''){
            this.router.navigateByUrl('/login');
        }else{
            userdata2 =JSON.parse(userdata2);
            this.userid = userdata2._id;
        }
    }

    ngOnInit(){
    this.dataForm = this.fb.group({
        type: ["", Validators.required],
        title: ["", Validators.required],
        description: ["", Validators.required],
        startdate: ["", Validators.required],
        enddate: ["", Validators.required],
        user: [false],
        musicians: [false],
        dancer: [false],
        model: [false],
        producer: [false],
        fan: [false],
        ambassadors: [false],
        signupaffiliate: [false],
        videolink: [""]
    });
  }

  getYTURL(item){
      return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+item+'?rel=0&amp;showinfo=0');
  }

  addYTvideo(){
      this.videolinkerror = false;
      var yt_regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      var ytsaerch = this.dataForm.controls['videolink'].value;
      if(ytsaerch != ''){
          if(typeof (ytsaerch.match(yt_regex)) != 'undefined' &&  (ytsaerch.match(yt_regex)) && typeof (ytsaerch.match(yt_regex)[1]) != 'undefined'){
              var videoId =ytsaerch.match(yt_regex)[1];
              this.videos.push(videoId);
              this.dataForm.controls['videolink'].setValue('');
          }else{
              this.videolinkerror = true;
          }
      }else{
          this.videolinkerror = true;
      }
  }
    allcheck(){
        /*this.dataForm.patchValue(
            {
                musicians:true,
                user:true
            }
        );*/
        console.log(this.dataForm.controls['user'].value);
        if(this.dataForm.controls['user']){
            this.dataForm.controls['musicians'].setValue(true);
            this.dataForm.controls['dancer'].setValue(true);
            this.dataForm.controls['model'].setValue(true);
            this.dataForm.controls['producer'].setValue(true);
            this.dataForm.controls['fan'].setValue(true);
        }
        if(!this.dataForm.controls['user'].value){
            this.dataForm.controls['musicians'].setValue(false);
            this.dataForm.controls['dancer'].setValue(false);
            this.dataForm.controls['model'].setValue(false);
            this.dataForm.controls['producer'].setValue(false);
            this.dataForm.controls['fan'].setValue(false);

        }
        /*if(!this.dataForm.controls['ambassadors'].value){
            this.dataForm.controls['musicians'].setValue(false);
            this.dataForm.controls['dancer'].setValue(false);
            this.dataForm.controls['model'].setValue(false);
            this.dataForm.controls['producer'].setValue(false);
            this.dataForm.controls['fan'].setValue(false);
            this.dataForm.controls['user'].setValue(false);
        }*/

       /* if(this.dataForm.controls['musicians'].value || this.dataForm.controls['dancer'].value || this.dataForm.controls['model'].value || this.dataForm.controls['producer'].value){
            this.dataForm.controls['fan'].setValue(false);
        }
        if(!this.dataForm.controls['musicians'].value && !this.dataForm.controls['dancer'].value && !this.dataForm.controls['model'].value && !this.dataForm.controls['producer'].value){
            this.dataForm.controls['fan'].setValue(true);
        }*/
    }
    onFileChanged(event) {
        this.imageserror = false;
        this.selectedFile = event.target.files[0];

        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile);

        this._http.post(this.uploadurl, uploadData)
            .subscribe(event => {
                let res:any;
                res = event;
                if(res.error_code == 0){
                    this.images.push(res.filename);
                    console.log(this.images);
                }else{
                    this.imageserror = true;
                }
            });
    }

  dosubmit(formval){

    let x: any;
    for (x in this.dataForm.controls){
      this.dataForm.controls[x].markAsTouched();
    }

    if (this.dataForm.valid){
        var link = this.serverurl+'addblog';
        var data = {
            type: formval.type,
            title: formval.title,
            description: formval.description,
            startdate: formval.startdate,
            enddate: formval.enddate,
            videos: this.videos,
            images: this.images,
            userid: this.userid,
            dancer: 0,
            producer: 0,
            model: 0,
            musicians: 0,
            fan: 0,
            signupaffiliate: 0,
            ambassadors: 0,
        };
        if(formval.dancer){
            data.dancer = 1;
        }
        if(formval.model){
            data.model = 1;
        }
        if(formval.musicians){
            data.musicians = 1;
        }
        if(formval.producer){
            data.producer = 1;
        }
        if(formval.fan){
            data.fan = 1;
        }
        if(formval.signupaffiliate){
            data.signupaffiliate = 1;
        }
        if(formval.ambassadors){
            data.ambassadors = 1;
        }
       // console.log(data);return;
        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.status=='success'){
                    this.bloglistpage.modalRef.hide();
                    this.bloglistpage.getBlogList();
                   // this.router.navigate(['/blog-list']);
                }
            }, error => {
                console.log("Oooops!");
            });
    }
  }
}
