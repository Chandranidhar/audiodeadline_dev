import {Compiler, Component, OnInit, TemplateRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices';
import {throwErrorIfNoChangesMode} from "@angular/core/src/render3/errors";
import {template} from "@angular/core/src/render3";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ImageCroppedEvent} from "ngx-image-cropper";
declare const FB: any;

@Component({
    selector: 'app-affiliatedashboard',
    templateUrl: './affiliatedashboard.component.html',
    styleUrls: ['./affiliatedashboard.component.css'],
    providers: [Commonservices]
})

export class AffiliatedashboardComponent implements OnInit {
    commonservices:Commonservices;
    private userdata: CookieService;
    items:any;
    public serverurl;
    public userid;
    public userdetails;
    public enrollerdetails;
    public accessToken;
    public FB_APP_ID;
    public FB_APP_SECRET;
    public LI_CLIENT_ID;
    public LI_CLIENT_SECRET;

    public randomstr;
    public fb_access_token;
    public fbimg;
    public fbname;
    public username;
    public userlink;
    public bannerlist1;
    public bannerlist2;
    public instabannerlist1;
    public instabannerlist2;
    public uploadfolder;
    public fileurl;

    public defaultadmedia;
    public defaultadimage;
    public defaultxpmedia;
    public defaultxpimage;
    public sponsorList;
    public bannerlist;

    public affiliatename;
    public afforderlist:any = [];
    public affunderme:any = [];
    public commisionlist:any = [];
    public commisiontablename:any='commission_details';

        public commisionlist_skip:any=['_id','added_time','amount','commission','firstname','lastname',''];
    public commision_modify_header:any={'orderid':' Order ID','username':'Name','tier':'Commision Tier','total':'Total($)'};

    public afforderlist_skip:any=["address","affiliate","city","discount","firstname","lastname","media","orderdetails","phone","productid","productname","shipping","sponsor","state","subtotal","tax","useremail","userid","userphone","zip","_id"];
    public afforderlist_modify_header:any={'added_time':"Date/Time ",'fullname':"Name",'email':'Email','mode':'Mode','productname':'Product','promocode':'Promo','quantity':'Quantity','total':'Total'};
    public ordertablename:any="order_view";
    public tablename:any="user";
    public affunderme_skip:any=["_id", "phone", "username", "password", "address", "address2", "city", "state", "zip", "rsvp", "signupaffiliate", "parent", "admin", "status", "agreement", "noofclick", "mediaid", "gender", "ambassador", "dancer", "model", "musicians", "fan", "accesscode", "lastactivetime", "agreement_time", "sign", "commission"];
    public affunderme_modify_header:any={'added time':"Date Added",'firstname':"First Name",'email':'Email','lastname':'Last Name'};
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



    constructor(private _http: HttpClient, private router: Router, userdata: CookieService, private _commonservices: Commonservices, public activeRoute:ActivatedRoute,private modalService: BsModalService){
        this.userlink = '';
        this.fbimg = '../../assets/images/profileimg.png';
        this.fbname = '';
        this.defaultadmedia = '';
        this.defaultadimage = '';
        this.defaultxpmedia = '';
        this.defaultxpimage = '';
        this.userdata = userdata;
        this.randomstr = makeid();
        this.commonservices=_commonservices;
        this.items = _commonservices.getItems();
        this.serverurl=_commonservices.url;
        this.sponsorList=_commonservices.getSponsorList();
        this.fileurl=_commonservices.fileurl;
        this.uploadfolder = 'banner/';
        this.FB_APP_ID=_commonservices.FB_APP_ID;
        this.FB_APP_SECRET=_commonservices.FB_APP_SECRET;
        this.LI_CLIENT_ID=_commonservices.LI_CLIENT_ID;
        this.LI_CLIENT_SECRET=_commonservices.LI_CLIENT_SECRET;

        let userdata2: any;
        userdata2= userdata.get('userdetails');
        userdata2 = JSON.parse(userdata2);
        if (typeof (userdata2) == 'undefined'){
            this.router.navigateByUrl('/login');
        }
        else{
            this.userid = userdata2._id;
            this.affiliatename = userdata2.username;
            this.getUserDetails();
            //this.sponserurl = userdata2.sponserurl;
            //this.sponserimg = userdata2.sponserimage;
            console.log(this.sponserurl);
           /* this.getUserDetails();
            this.getBannerList1();
            this.getBannerList2();
            this.getInstaBannerList1();
            this.getInstaBannerList2();
            this.bannerlist = [];
            this.getBannerList();*/
           this.getafflist();
           this.getCommisionList();
        }
    }

    ngOnInit() {
        this.activeRoute.data.forEach((data) => {
            //PRE LOAD DATA PRIOR
            /*console.log('route data for profile');
             console.log('json',data['results']);
             console.log(data['results'].item);*/
            console.log('json',data['results']);
            console.log(data);
            let result=data['results'];
            console.log(result);
            /*for(let i in result.res){
                if(result.res[i].orderdetails!=null && result.res[i].orderdetails.length>0)
                this.afforderlist.push(result.res[i]);
            }*/
           this.afforderlist = result.res;

            console.log(this.afforderlist);



        });
    }
    decline(): void {
        this.modalRef.hide();
    }
    decline1(): void {
        this.modalRef1.hide();
    }
    getafflist(){
        let link = this._commonservices.nodesslurl+'datalist';
        this._http.post(link,({"source": "user","condition":{"parent":this.affiliatename,"signupaffiliate":1}}))
            .subscribe(res=>{
                let result:any ;
                result = res;
                this.affunderme = result.res;

            });
    }

    getCommisionList(){
        let link = this._commonservices.nodesslurl+'datalist';
        this._http.post(link,{source:'commission_details',condition:{"username":this.affiliatename}})
            .subscribe(res => {
                // this.loadinglist = false;
                let result:any ;
                 result = res;
                this.commisionlist = result.res;
            },error => {
                // this.loadinglist = false;
                console.log("Oooops!");
            });
    }

    getUserDetails(){
        // var link =this.serverurl+'dashboard';
        var link =this._commonservices.nodesslurl+'dashboardpost';
        var data = {_id: this.userid};

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
                    this.userlink = 'https://audiodeadline.com/signup/'+this.username;
                    if(userdet.parent != 0 && userdet.parent != ''){
                        this.getEnrollerDetails(userdet.parent);
                    }
                    this.fb_access_token = userdet.fb_access_token;
                    if(this.fb_access_token != ''){
                        this.getFBDetails();
                    }
                }
            },error => {
                console.log("Oooops!");
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
            },error => {
                console.log("Oooops!");
            });
    }

    getBannerList1(){
        var link =this.serverurl+'medialistbytype';
        var data = {type: 3};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any ;
                    result = res;
                this.bannerlist1 = result.res;
                if(this.bannerlist1.length > 0){
                    this.defaultadmedia = this.bannerlist1[0].name;
                    this.defaultadimage = this.bannerlist1[0].image;
                }
            },error => {
                console.log("Oooops!");
            });
    }

    getBannerList2(){
        var link =this.serverurl+'medialistbytype';
        var data = {type: 4};

        this._http.post(link, data)
            .subscribe(res => {

                let result:any;
                result = res;
                this.bannerlist2 = result.res;
                if(this.bannerlist2.length > 0){
                    this.defaultxpmedia = this.bannerlist2[0].name;
                    this.defaultxpimage = this.bannerlist2[0].image;
                }
            },error => {
                console.log("Oooops!");
            });
    }

    getInstaBannerList1(){
        var link =this.serverurl+'medialistbytype';
        var data = {type: 5};

        this._http.post(link, data)
            .subscribe(res => {

                let result:any;
                result = res;
                this.instabannerlist1 = result.res;
            },error => {
                console.log("Oooops!");
            });
    }

    getInstaBannerList2(){
        var link =this.serverurl+'medialistbytype';
        var data = {type: 6};

        this._http.post(link, data)
            .subscribe(res => {

                let result:any;
                 result = res;
                this.instabannerlist2 = result.res;
            },error => {
                console.log("Oooops!");
            });
    }

    getEnrollerDetails(enrollerID){
        var link =this.serverurl+'getDetailsByUsername';
        var data = {username: enrollerID};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if (result.status == 'success' && typeof(result.item) != 'undefined'){
                    let userdet = result.item;
                    this.enrollerdetails = userdet;
                }
            },error => {
                console.log("Oooops!");
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

    getLongLivedToken(){
        var link = 'https://graph.facebook.com/oauth/access_token?client_id='+this.FB_APP_ID+'&client_secret='+this.FB_APP_SECRET+'&grant_type=fb_exchange_token&fb_exchange_token='+this.accessToken;
        var data = {};

        this._http.get(link, data)
            .subscribe(res => {
                let result:any;
                 result = res;
                this.updateAccesstoken(result.access_token,result.expires_in);
            },error => {
                console.log("Oooops!");
            });
    }

    updateAccesstoken(access_token,expires_in){
        var link =this.serverurl+'updateAccesstoken';
        var data = {_id: this.userid,access_token:access_token,expires_in:expires_in};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                 result = res;
                if(result.status=='success'){
                    this.userdata.set('userdetails', JSON.stringify(result.msg));
                }
                this.fb_access_token = access_token;
                this.getFBDetails();
            },error => {
                console.log("Oooops!");
            });
    }

    addfbaccount(){
        var ll = this;
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                var uid = response.authResponse.userID;
                ll.accessToken = response.authResponse.accessToken;
                ll.getLongLivedToken();
            } else {
                FB.login((result: any) => {
                    ll.accessToken = result.authResponse.accessToken;
                    ll.getLongLivedToken();
                }, { scope: 'email' });
            }
        });
    }

    getFBDetails(){
        var link = 'https://graph.facebook.com/me?fields=name,id,picture&access_token='+this.fb_access_token;
        var data = {};

        this._http.get(link, data)
            .subscribe(res => {
                let result:any;
                 result = res;
                this.fbname = result.name;
                this.fbimg = result.picture.data.url;
                console.log(result);
            },error => {
                console.log("Oooops!");
            });
    }

    removefbaccount(){
        var link =this.serverurl+'updateAccesstoken';
        var data = {_id: this.userid,access_token:'',expires_in:''};

        this._http.post(link, data)
            .subscribe(res => {
                this.fbimg = '../../assets/images/profileimg.png';
                this.fbname = '';
                this.fb_access_token = '';
                let result:any;
                 result = res;
                if(result.status=='success'){
                    this.userdata.set('userdetails', JSON.stringify(result.msg));
                }
            },error => {
                console.log("Oooops!");
            });
    }

    postinfb(username,media_id,image){
        var link = 'http://audiodeadline.com/sharetool22.php?type=ticketsale&sponsorname=&media_id='+media_id+'&image='+image+'&affiliate='+username;

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

    postinfb2(username,media_id,image){
        var link = 'https://artistxp.com/sharetool2.php?media_id='+media_id+'&username='+username+'&image='+image;

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

    postintw(ind){
        window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(this.userlink));
    }

    postinli(ind){
        window.open('https://www.linkedin.com/shareArticle?url='+encodeURIComponent(this.userlink));
    }

    postintm(ind){
        window.open('https://www.tumblr.com/widgets/share/tool?canonicalUrl='+encodeURIComponent(this.userlink)+'&title=Audio Deadline&caption=');
    }
    openmodal(template:TemplateRef<any>){
        this.modalRef1=this.modalService.show(template);
    }
    updatesponserurl(){

        this.flag= 1-this.flag;
        let dataval:any ={sponserurl:this.sponserurl,id:this.userdata.get('user_id')};
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
        let dataval:any ={sponserimage:this.sponserimg,id:this.userdata.get('user_id')};
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

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
