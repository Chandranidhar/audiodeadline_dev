import { Component, OnInit,TemplateRef } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ImageCroppedEvent} from "ngx-image-cropper";
declare const FB: any;

@Component({
  selector: 'app-affiliatemediamarketing',
  templateUrl: './affiliatemediamarketing.component.html',
  styleUrls: ['./affiliatemediamarketing.component.css'],
  providers: [Commonservices]
})
export class AffiliatemediamarketingComponent implements OnInit {
  commonservices:Commonservices;
  private userdata: CookieService;
  public serverurl;
  public fileurl;
  public affiliatename:any;
  public username:any;
  public uploadfile;
  public usercookie;
  public FB_APP_ID:any;
  public FB_APP_SECRET:any;
  public LI_CLIENT_ID:any;
  public LI_CLIENT_SECRET:any;
  public ticketsalebanner:any = [];
  public merchbanner:any = [];
  public artistxpsignbanner:any = [];
    public selectedFile:any;
    public tempUploadFilename:any;
    public rawimage:any;
    public base64image:any;
    public errormsg:any='';
    public sponserimg:any="";
    public sponserurl:any="";
    public flag:any=0;
    modalRef: BsModalRef;
    modalRef1: BsModalRef;
    public userdetails:any;

  constructor(private _http: HttpClient, private router: Router, userdata: CookieService, private _commonservices: Commonservices, private activeRoute: ActivatedRoute,private modalService: BsModalService) {

    this.serverurl=_commonservices.url;
    this.fileurl = _commonservices.fileurl;
      this.usercookie = userdata;
      this.affiliatename = this.usercookie.get('username');
      this.username = this.usercookie.get('username');
      console.log(this.affiliatename);
      let userdata2: any;
      userdata2= userdata.get('userdetails');
      userdata2 = JSON.parse(userdata2);
      this.getUserDetails();
      if (typeof (userdata2) == 'undefined'){
          this.router.navigateByUrl('/login');
      }
      else {
          this.affiliatename = userdata2.username;
          /*this.sponserurl = userdata2.sponserurl;
          this.sponserimg = userdata2.sponserimage;*/

      }
    this.uploadfile = 'banner';
    // this.getticketsalebanner();
    this.getmechandisebanner();
    this.getartistxpsignupbanner();
      this.FB_APP_ID=_commonservices.FB_APP_ID;
      this.FB_APP_SECRET=_commonservices.FB_APP_SECRET;
      this.LI_CLIENT_ID=_commonservices.LI_CLIENT_ID;
      this.LI_CLIENT_SECRET=_commonservices.LI_CLIENT_SECRET;
  }
    getUserDetails(){
        var link =this.serverurl+'dashboard';
        var data = {_id: this.usercookie.get('user_id')};

        this._http.post(link, data)
            .subscribe(res => {

                let result:any;
                result = res;
                if (result.status == 'success' && typeof(result.item) != 'undefined'){
                    let userdet = result.item;
                    this.userdetails = userdet;
                    this.username = userdet.username;
                    this.sponserurl = userdet.sponserurl;
                    this.sponserimg = userdet.sponserimage;
                }
            },error => {
                console.log("Oooops!");
            });
    }


    ngOnInit() {
      this.activeRoute.data.forEach((data) => {
          //PRE LOAD DATA PRIOR
          /*console.log('route data for profile');
           console.log('json',data['results']);
           console.log(data['results'].item);*/
          // console.log('json',data['results']);
          let result=data['results'];
         console.log(result);
          this.ticketsalebanner = result.res;

         // console.log(this.ticketsalebanner);



      });
  }

  /*getticketsalebanner(){

    let link = this._commonservices.nodesslurl+'datalist';
    this._http.post(link,{source:'mediaview',condition:{"type":7,"status":1}})
        .subscribe(res=>{

          let result:any = {};
          result = res.json();
          this.ticketsalebanner = result.res;
            console.log(this.ticketsalebanner);

        });
  }*/

  getmechandisebanner(){

    let link = this._commonservices.nodesslurl+'datalist';
    this._http.post(link,{source:'mediaview',condition:{"type":8,"status":1}})
        .subscribe(res=>{

          let result:any;
          result = res;
          this.merchbanner = result.res;


        });
  }

  getartistxpsignupbanner(){

    let link = this._commonservices.nodesslurl+'datalist';
    this._http.post(link,{source:'mediaview',condition:{"type":9,"status":1}})
        .subscribe(res=>{

          let result:any;
          result = res;
          this.artistxpsignbanner = result.res;
        });
  }

    copyText(val: string){
        let selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }

    postinfb(username,media_id,image){
        var link = this._commonservices.phpurllive+'sharetool22.php?type=ticketsale&sponsorname=&media_id='+media_id+'&image='+image+'&affiliate='+username;

       /* console.log('link');
        console.log(link);*/
        FB.ui({
            method: 'feed',
            link: link,
            name: " ",
            caption:" ",
            description: " "
        },function(response){
            // console.log(response);
        });
    }

    postinfb2(username,media_id,image){
        var link = this._commonservices.phpurllive+'sharetool2.php?media_id='+media_id+'&username='+username+'&image='+image;
          FB.ui({
         method: 'feed',
         link: link,
         name: " ",
         caption:" ",
         description: " "
         },function(response){
         // console.log(response);
         });
    }
    postinfb3(username,media_id,image){
        let link = this._commonservices.phpurllive+'sharetool23.php?media_id='+media_id+'&username='+username+'&image='+image;
          FB.ui({
         method: 'feed',
         link: link,
         name: " ",
         caption:" ",
         description: " "
         },function(response){
         // console.log(response);
         });
    }
    openmodal(template:TemplateRef<any>){
        this.modalRef1=this.modalService.show(template);
    }
    updatesponserurl(){

        this.flag= 1-this.flag;
        let dataval:any ={sponserurl:this.sponserurl,id:this.usercookie.get('user_id')};
        let data:any = {data: dataval,source:'user'};
        console.log(data);
        if(this.sponserurl!='' && this.sponserurl!=null){
            let link = this._commonservices.nodesslurl+'addorupdatedata';
            this._http.post(link,data)
                .subscribe(res=>{
                    let result:any = {};
                    result = res;
                    console.log(result);
                });
            return this.sponserurl;
            this.getUserDetails();
        }else{
            this.errormsg = "You haven't updated your Sponser URL!";
        }

    }
    changesponserimage(event){
        this.selectedFile = event.target.files[0];

        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile);

        this._http.post(this._commonservices.uploadurl, uploadData)

            .subscribe(value =>{
                let res:any;
                res = value;
                console.log(res);
                if(res.error_code == 0){
                    this.sponserimg = res.filename;
                    /*this.tempimgpath = this._commonservices.fileurl;

                     this.image_pic = this.tempUploadFilename;
                     this.showLoader = 0;
                     this.addpicturearray.push({image_pic:this.image_pic,privacy:'public',title_pic:'',desc_pic:''});*/
                    /*for(let i in this.addpicturearray){
                     this.addmusicarray[i].murl = this.sanitizer.bypassSecurityTrustResourceUrl(this._commonservices.siteurl + 'nodeserver/uploads/audio/' + this.user_id + '/' + this.addmusicarray[i].music);
                     }*/

                }
            });
    }
    decline(): void {
        this.modalRef.hide();
    }
    decline1(): void {
        this.modalRef1.hide();
    }
    cropimg1(template: TemplateRef<any>){
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
        this.rawimage = '';
        let link = this._commonservices.phpurl+'getbase64image1.php';
        // let link = 'https://developmentapi.audiodeadline.com/getbase64image1.php';
        let data = {fileurl: this.sponserimg};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                console.log(result);
                console.log(result.data);
                this.rawimage = result.data;
            });
    }
    crop1(){
        this.rawimage = '';
        let link = this._commonservices.phpurl+'saveCropImage1.php';
        let data = {filename: this.sponserimg,base64image:this.base64image,cropwidth:1920,cropheight:401};

        this._http.post(link, data)
            .subscribe(res => {
                // var result = res.text();
                let result:any;
                result = res;
                console.log(result);
                this.sponserimg = '';
                this.sponserimg = result.data;
                this.modalRef.hide();
            }, error => {
                console.log("Oooops!");
            });
    }

    imageCropped(event: ImageCroppedEvent) {
        this.base64image = event.base64;
    }

    updatesponserimage(){
        let dataval:any ={sponserimage:this.sponserimg,id:this.usercookie.get('user_id')};
        let data:any = {data: dataval,source:'user'};
        console.log(data);
        if(this.sponserimg!='' && this.sponserimg!=null){
            let link = this._commonservices.nodesslurl+'addorupdatedata';
            this._http.post(link,data)
                .subscribe(res=>{
                    let result:any = {};
                    result = res;
                    console.log(result);
                    if(result.status == "success"){
                        this.modalRef1.hide();
                        return this.sponserimg;
                        this.getUserDetails();
                    }
                });

        }else{
            this.errormsg = "You haven't updated your Sponser Logo!";
        }

    }


}
