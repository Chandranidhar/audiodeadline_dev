import {Component, OnInit, TemplateRef} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
/*import {Router} from '@angular/router';*/
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Commonservices} from "../app.commonservices";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ImageCroppedEvent} from "ngx-image-cropper";

declare const FB: any;

@Component({
    selector: 'app-sponsorlist',
    templateUrl: './sponsorlist.component.html',
    styleUrls: ['./sponsorlist.component.css'],
    providers: [Commonservices]
})

export class SponsorlistComponent implements OnInit {
    public dataForm: FormGroup;
    modalRef: BsModalRef;
    modalRef1: BsModalRef;
    coockieData:CookieService;
    public username;
    public userroles;
    public selsponsor;
    public mailbody;
    public mailsubject;
    public serverurl;
    public affiliatename;
    public sponsorList:any=[];
    public uploadfolder;
    public fileurl;
    public bannerlist;
    public searchText;
    public idx;
   public id;
    public inlineerror;

    public fb;
    public selectedFile:any;
    public tempUploadFilename:any;
    public rawimage:any;
    public base64image:any;
    public errormsg:any='';
    public sponserimg:any="";
    public sponserurl:any="";
   sponsertablename:'sponser';
    public images:any;

    constructor( public _commonservices: Commonservices,userdata: CookieService,private router: Router,private modalService: BsModalService,private _http: HttpClient,public activeRoute:ActivatedRoute,fb: FormBuilder) {
        this.serverurl=_commonservices.url;
        this.uploadfolder = 'banner/';
        this.fileurl=_commonservices.fileurl;
        // this.sponsorList=_commonservices.getSponsorList();
        this.coockieData= userdata;
        this.username = '';
        this.searchText = '';
        this.affiliatename = '';
        this.userroles = [];
        this.bannerlist = [];
        this.fb = fb;
        this.getBannerList();
        let userdata2: any;
        userdata2= userdata.get('userdetails');

        if (typeof (userdata2) == 'undefined' || userdata2 == ''){
            this.router.navigateByUrl('/login');
        }else{
            userdata2 = JSON.parse(userdata2);
            this.affiliatename = userdata2.username;
            if (userdata2.admin == 1){
                this.userroles.push('admin');
            }
            if (userdata2.signupaffiliate == 1){
                this.userroles.push('affiliate');
                this.username = 'affiliate-'+userdata2.username;
                this.affiliatename = userdata2.username;
            }
            if (userdata2.ambassador == 1){
                this.userroles.push('ambassador');
            }
            if (userdata2.dancer == 1){
                this.userroles.push('dancer');
            }
            if (userdata2.model == 1){
                this.userroles.push('model');
            }
            if (userdata2.musicians == 1){
                this.userroles.push('musicians');
            }
            if (userdata2.fan == 1){
                this.userroles.push('fan');
            }
        }
    }

    ngOnInit(){
        this.activeRoute.data.forEach((data)=>{
            console.log('json',data['results']);
            console.log(data);
            console.log(data['results']);
            let result=data['results'];
            console.log(result);
            this.sponsorList=result.res;
            console.log('Data');
            console.log(this.sponsorList);
        });
        this.dataForm = this.fb.group({
            sponser:["",Validators.required ],
            type_of_sponser:["",Validators.required],
            // banner:["",Validators.required],
            status:["",Validators.required],
        });

    }

    getBannerList(){
        var link =this.serverurl+'medialistbytype';
        var data = {type:2};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                var bannerlist = result.res;
                for(let n in bannerlist){
                    var banners = bannerlist[n];
                    var obj1 = {
                        "label":banners.label,
                        "name":banners.name,
                        "image":"",
                        "type":2,
                        "sponsor":banners.sponsor
                    };
                    var obj2 = {
                        "label":banners.label,
                        "name":banners.name,
                        "image":"",
                        "type":2,
                        "sponsor":banners.sponsor
                    };
                    var obj3 = {
                        "label":banners.label,
                        "name":banners.name,
                        "image":"",
                        "type":2,
                        "sponsor":banners.sponsor
                    };

                    obj1.image = banners.image;
                    obj2.image = banners.image2;
                    obj3.image = banners.image3;

                    this.bannerlist.push(obj1);
                    this.bannerlist.push(obj2);
                    this.bannerlist.push(obj3);
                }
                console.log(this.bannerlist);
            },error => {
                console.log("Oooops!");
            });

    }
    /*openDelModal(template:TemplateRef<any>,item){
        this.idx=this.sponsorList.indexOf(item);
        this.modalRef=this.modalService.show(template,{class:'modal-md'})
    }*/


    postinfb(sponsorname,media_id,image,affiliate){
        var link = 'http://audiodeadline.com/sharetool22.php?type=ticketsale&media_id='+media_id+'&sponsorname='+sponsorname+'&image='+image+'&affiliate='+affiliate;

        FB.ui({
            method: 'feed',
            link: link,
            name: " ",
            caption:" ",
            description: " "
        },function(response){
            console.log(response);
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

    openmailbody(template: TemplateRef<any>,sponsor) {
        this.mailbody = '';
        this.mailsubject = '';
        this.selsponsor = sponsor;
        var link =this.serverurl+'getsponsormailbody';
        var data = {sponsor:this.selsponsor};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.status == 'success'){
                    this.mailbody = result.item.mailbody;
                    this.mailsubject = result.item.mailsubject;
                }
            },error => {
                console.log("Oooops!");
            });

        this.modalRef = this.modalService.show(template,{class: 'modal-lg'});
    }

    confirm(): void {
        var link =this.serverurl+'addsponsormailbody';
        var data = {sponsor:this.selsponsor,mailbody:this.mailbody,mailsubject:this.mailsubject};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                this.modalRef.hide();
            },error => {
                console.log("Oooops!");
                this.modalRef.hide();
            });
    }

    decline(): void {
        this.modalRef.hide();
    }
    openAddModal(template: TemplateRef<any>){
        //noinspection TypeScriptValidateTypes
        this.modalRef1 = this.modalService.show(template, {class: 'modal-md sponser'});
    }
    dosubmit(formval){
        let x:any;
        for(x in this.dataForm.controls){
            this.dataForm.controls[x].markAsTouched();
        }
        console.log(this.dataForm.valid);
        if(this.dataForm.valid){
            let link = this._commonservices.nodesslurl+'addorupdatedata';
            let dataval:any={
                sponser:formval.sponser,
                type_of_sponser:formval.type_of_sponser,
                banner:this.sponserimg,
                status:formval.status

            };
            let data:any= {data:dataval,source:'sponser'}
            //console.log(data);
            this._http.post(link,data)
                .subscribe(res=>{
                    let result:any;
                    result=res;
                    console.log(result);
                    console.log(result.status);
                    if(result.status=='success'){
                        this.modalRef1.hide();
                    }
                })
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
                    console.log(this.sponserimg);
                }
            });
    }
    openDelModal(template: TemplateRef<any>,item) {
        this.idx = this.sponsorList.indexOf(item);
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    }
    confirm1():void{
        var link =this.serverurl+'commondeleteget';
        var data={_id:this.sponsorList[this.idx]._id};
        this._http.post(link,data)
            .subscribe(res=>{
                let result:any;
                result=res;
                if(result.status == 'success'){
                    this.sponsorList.splice(this.idx, 1);
                }
                this.modalRef.hide();
            },error=>{
                console.log('Ooops');
                this.modalRef.hide();
            });

    }
    decline1():void{
        this.modalRef.hide();
    }
    selectblur(e,item){
        console.log(e.target.value);
        console.log(item);
       // return ;
        var link =this.serverurl+'commonstatuschange';

        var data =  {
            "source": "sponser",
            "_id": item._id,
            "status": e.target.value
        }

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;

            },error => {
                console.log("Oooops!");
            });

    }
   getstatusname(status){
       /*var statusname='';
        if(status==1){
            statusname='Active';
        }
        if(status==2){
            statusname='Inactive';
        }
        return statusname;*/

   }
   clickedfunction(item,field) {
       this.inlineerror='';
       if(field==status){
           item.isStatusClicked=true;
       }
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
    imageCropped(event: ImageCroppedEvent) {
        this.base64image = event.base64;
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

    openEditModal(template: TemplateRef<any>,item){
        this.id = item;
        this.modalRef = this.modalService.show(template, {class: 'modal-lg editblog'});
    }


}
