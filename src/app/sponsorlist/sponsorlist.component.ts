import {Component, OnInit, TemplateRef} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Commonservices} from "../app.commonservices";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';

declare const FB: any;

@Component({
    selector: 'app-sponsorlist',
    templateUrl: './sponsorlist.component.html',
    styleUrls: ['./sponsorlist.component.css'],
    providers: [Commonservices]
})

export class SponsorlistComponent implements OnInit {
    modalRef: BsModalRef;
    coockieData:CookieService;
    public username;
    public userroles;
    public selsponsor;
    public mailbody;
    public mailsubject;
    public serverurl;
    public affiliatename;
    public sponsorList;
    public uploadfolder;
    public fileurl;
    public bannerlist;

    constructor( private _commonservices: Commonservices,userdata: CookieService,private router: Router,private modalService: BsModalService,private _http: HttpClient) {
        this.serverurl=_commonservices.url;
        this.uploadfolder = 'banner/';
        this.fileurl=_commonservices.fileurl;
        this.sponsorList=_commonservices.getSponsorList();
        this.coockieData= userdata;
        this.username = '';
        this.affiliatename = '';
        this.userroles = [];
        this.bannerlist = [];
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

        this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
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

}
