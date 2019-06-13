import { Component, OnInit,TemplateRef,ViewChild,ElementRef ,AfterViewInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, NgForm} from '@angular/forms';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {ImageCroppedEvent} from "ngx-image-cropper";
import {Validators} from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';             /*for comma , and enter key codes from keyboard*/
import {MatChipInputEvent} from '@angular/material/chips';
declare const FB: any;
declare var $:any;
declare var gapi:any;
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}


@Component({
    selector: 'app-affiliatemediamarketing',
    templateUrl: './affiliatemediamarketing.component.html',
    styleUrls: ['./affiliatemediamarketing.component.css'],
    providers: [Commonservices]
})
export class AffiliatemediamarketingComponent implements OnInit,AfterViewInit {
    @ViewChild('gsharelink1') gsharelink1: ElementRef;
    @ViewChild('gsharelink2') gsharelink2: ElementRef;
    @ViewChild('gsharelink3') gsharelink3: ElementRef;
    @ViewChild('gsharelink4') gsharelink4: ElementRef;
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
    public auth2 :any;
    public admsg :any = 0;
    public axmsg :any = 0;
    public socialmediaerror:any = 0;
    public dataForm: FormGroup;
    private fb;
    /*  public clientId:any = '1036664457460-9o9ihhnjrnb3vqhklo72nu5mu7gbp84r.apps.googleusercontent.com';
    public apiKey:any = 'H1qzKV7Q8iUciTn8arwZPcti';
    public scopes:any = 'https://www.googleapis.com/auth/contacts.readonly';*/
    /*mat chip initialisation starts here*/
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    contactarray: any= [];
    public userContacts: any=[];
    public checkemail: any = 0;
    /*mat chip initialisation ends here*/


    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    matcher = new MyErrorStateMatcher();
    constructor(private _http: HttpClient, private router: Router, userdata: CookieService, public _commonservices: Commonservices, private activeRoute: ActivatedRoute,private modalService: BsModalService, fb: FormBuilder) {
        this.fb = fb;

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
    /*-------------------mat chip functions-----------------*/
    /*function to add chip*/
    add(event: MatChipInputEvent): void {
        if(this.emailFormControl.valid || (this.contactarray!=null && this.contactarray.length>0)){
            const input = event.input;
            const value = event.value;

            // Add our input email
            if ((value || '').trim()) {
                this.contactarray.push(value.trim());
            }

            // Reset the input value
            if (input) {
                input.value = '';
            }
        }

    }

    /*function to add chip*/
    remove(fruit: any): void {
        const index = this.contactarray.indexOf(fruit);
        if (index >= 0) {
            this.contactarray.splice(index, 1);
        }
    }
    /*-------------------mat chip functions-----------------*/
    sendaudiodeadlinemsg(){
         let link :any = this._commonservices.nodesslurl+'audiodeadlineemailsend';
         let data = {'fullname':this.userdetails.firstname+" "+this.userdetails.lastname,'audiodeadlinemsg':this.dataForm.controls['audiodeadlinemsg'].value,emails:this.contactarray};
         console.log(data);
        this._http.post(link,data)
             .subscribe(res=>{
                 let result:any;
                 result = res;
                 if(result.status == "success"){
                     this.contactarray = [];
                 }
             });
    }
    sendartistxpmsg(){
         let link :any = this._commonservices.nodesslurl+'artistxpemailsend';
         let data = {'fullname':this.userdetails.firstname+" "+this.userdetails.lastname,'artistxpmsg':this.dataForm.controls['artistxpmsg'].value,emails:this.contactarray};
         console.log(data);
        this._http.post(link,data)
             .subscribe(res=>{
                 let result:any;
                 result = res;
                 if(result.status == "success"){
                     this.contactarray = [];
                 }
             });
    }
    getUserDetails(){
        // var link =this.serverurl+'dashboard';
        var link =this._commonservices.nodesslurl+'dashboardpost';
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
        this.dataForm = this.fb.group({
            /*fullname: ["", Validators.required],*/
            socialinvite: [""],
            socialcontact: [""],
            emailcontact: ["", AffiliatemediamarketingComponent.validateEmail],
            /* emailcontact:  ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],*/
            /*phoneno: ["", Validators.required],*/
            audiodeadlinemsg: ["I just found an awesome online streaming show that I think you would be interested in! It is based on a quarterly live streamed show that will showcase artists of all kinds such as, musicians, dancers, producers, and rappers. The artists go head to head in a competition where they show their best work and we get to vote on our favorite artist! When the best of the best is picked by the community, we get to watch them go head to head and collaborate on an original song that they will have only 8-hours to complete! This is a chance to see artists in live action in a real time studio making their creativity come to life. Don’t miss out and check it out now!"],
            artistxpmsg: ["Come join ArtistXP with me! I just joined this new social media that is full of fun and exciting features that I think you would enjoy too! They are all about a tight knit artist community where independent artists are even closer to their fans than ever before. As an artist you will be able to consolidate where all your work is located no matter what social media you use the most. They can do artist exchanges where it promotes all artists to work together by sharing each other’s artistry! As a fan we have front row seats to watch their creativity bloom. There is so much more it has to offer; all you need to do is come join me in this amazing community. Check it out now!"],
        });


    }
    static validateEmail(control: FormControl){
        if(control.value==''){
            return { 'invalidemail': true };
        }
        if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return { 'invalidemail': true };
        }
    }

    sendsocialinvite(){
        console.log("this.dataForm.controls['socialinvite'].value");
        console.log(this.dataForm.controls['socialinvite'].value);
        this.socialmediaerror = 0;
        if(this.dataForm.controls['socialinvite'].value==""){
            this.socialmediaerror = 1;
        }
        if(this.dataForm.controls['socialinvite'].value=="twitter"){
            setTimeout(()=> {
                this.gsharelink1.nativeElement.click();
            }, 500);
        }
        if(this.dataForm.controls['socialinvite'].value=="linkedin"){
            setTimeout(()=> {
                this.gsharelink3.nativeElement.click();
            }, 500);
        }
        if(this.dataForm.controls['socialinvite'].value=="tumblr"){
            setTimeout(()=> {
                this.gsharelink4.nativeElement.click();
            }, 500);
        }
        if(this.dataForm.controls['socialinvite'].value=="facebook"){
            setTimeout(()=> {
                this.gsharelink2.nativeElement.click();
            }, 500);
        }
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
        var link = this._commonservices.phpurlforshare+'sharetool2.php?media_id='+media_id+'&username='+username+'&image='+image;
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

    ngAfterViewInit(): void {
        setTimeout(() => this.signIn(), 1000);
    }
    signIn() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '1036664457460-9o9ihhnjrnb3vqhklo72nu5mu7gbp84r.apps.googleusercontent.com',
                cookie_policy: 'single_host_origin',
                scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
                // scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
            });
            this.auth2.attachClickHandler(document.getElementById('googleres'), {}, this.onSignIn, this.onFailure);
        })
    }
    onFailure(data:any){
        console.log('onFailure called');
        console.log(data);
    }
    onSignIn = (data: any) => {

       // setTimeout(() => this.fetchmail(), 1000);
        this.handleAuthorization(data.Zi);
        console.log('onSignIn');
        console.log(data);
        console.log(data.Zi);
        //console.log(data.WE.Zi);
    }

    handleAuthorization(authorizationResult) {
        if (authorizationResult && !authorizationResult.error) {
            let link:any = "https://www.google.com/m8/feeds/contacts/default/thin?alt=json&access_token=" + authorizationResult.access_token + "&max-results=500&v=3.0";
            this._http.get(link)
                .subscribe(res=>{
                    this.contactarray=[];
                    //process the response here
                    let response:any={};
                    response = res;
                    console.log('response.gd$email');
                   /* console.log(response.feed.gd$email);
                    console.log(response.feed.entry);
                    console.log(response.feed);*/
                    for(let v in response.feed.entry){
                        console.log('response.feed.entry.gd$email');
                        if(typeof (response.feed.entry[v].gd$email)!='undefined'){
                            //console.log(response.feed.entry[v].gd$email[0].address);
                            this.contactarray.push(response.feed.entry[v].gd$email[0].address);
                        }
                    }
                    console.log('contactarray');
                    console.log(this.contactarray);
                    console.log(this.contactarray.length);
                });
                /*function(response){
                    var contactarray=[];
                    //process the response here
                    console.log(response);
                    console.log('response.gd$email');
                    console.log(response.feed.gd$email);
                    console.log(response.feed.entry);
                    console.log(response.feed);
                    for(var v in response.feed.entry){
                        console.log('response.feed.entry.gd$email');
                        if(typeof (response.feed.entry[v].gd$email)!='undefined'){
                            //console.log(response.feed.entry[v].gd$email[0].address);
                            contactarray.push(response.feed.entry[v].gd$email[0].address);
                        }
                    }
                    console.log('contactarray');
                    console.log(contactarray);
                    console.log(contactarray.length);
                });*/
        }
    }
    fetchmail() {
        console.log('fetchmail');
        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: 'H1qzKV7Q8iUciTn8arwZPcti',
                discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
                clientId: '1036664457460-9o9ihhnjrnb3vqhklo72nu5mu7gbp84r.apps.googleusercontent.com',
                scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
            }).then(() => {
                return gapi.client.people.people.connections.list({
                    resourceName:'people/me',
                    personFields: 'emailAddresses,names'
                });
            }).then(
                (res) => {
                    console.log("Res: " + JSON.stringify(res));         // to debug
                    this.userContacts.emit(this.transformToMailListModel(res.result));
                },
                error => console.log("ERROR " + JSON.stringify(error))
            );
        });
    }
    transformToMailListModel(item:any){
        return item;
    }



    /*for google contacts api service*/

    getcontacts(){
        if(this.dataForm.controls['socialcontact'].value == 'gmail'){
            console.log('gapi-------------------------');
            console.log(gapi);
            setTimeout(()=>{
                this.signIn();

            },2000);
            if(this.contactarray == null || this.contactarray.length == 0){
                this.checkemail = 1;
            }

        }
    }
    /*functions to access google contacts*/




}

