/**
 * Created by kta pc on 6/16/2017.
 */
import {Injectable} from '@angular/core';
// import {Http, Response, Headers} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from "@angular/router";
//import 'rxjs/add/operator/map';
@Injectable()
export class Commonservices{
    items:Array<any>;
    url:any;
    uploadurl:any;
    uploadncropurl:any;
    uploadncropurlnew:any;
    cookieData:CookieService;
    phpurl:any;
    fileurl:any;
    nodeurl:any;
    phpurllive:any;
    siteurl:any;
    nodeurl2:any;
    FB_APP_ID:any;
    url1:any;
    nodeurl1:any;
    FB_APP_SECRET:any;
    LI_CLIENT_ID:any;
    LI_CLIENT_SECRET:any;
    nodesslurl:any;
    artistxpurl:any;
    nodesslurl1:any;
    envflag:any;
    fileurl_new:any;
    constructor(private http: HttpClient,userdata: CookieService,private router: Router) {

        this.envflag='dev';

        this.cookieData= userdata;
        if(this.envflag=='dev'){
            this.siteurl = 'https://audiodeadline.com/';
            this.artistxpurl = 'https://development.artistxp.com/';
           // this.siteurl = 'http://api.audiodeadline.com/';
            //this.nodeurl = 'http://192.169.196.208:3009/';
            // this.nodeurl = 'http://192.169.196.208:3007/';
        this.nodeurl = 'https://developmentapi.audiodeadline.com:6090/';
        this.nodeurl1 = 'http://developmentapi.audiodeadline.com:3007/';
        this.nodeurl2 = 'http://developmentapi.audiodeadline.com:3090/';
        this.nodesslurl ='https://developmentapi.audiodeadline.com:6090/';
        this.nodesslurl1 ='https://developmentapi.audiodeadline.com:6004/';
        this.phpurl = 'https://developmentapi.audiodeadline.com/';
        this.phpurllive = 'https://developmentapi.audiodeadline.com/';
            //this.url = 'https://audiodeadline.com/serverlocal.php?q=';
            this.url = 'https://developmentapi.audiodeadline.com/server.php?q=';
            this.url1 = 'https://developmentapi.audiodeadline.com/server3.php?q=';
            // this.url = 'https://audiodeadline.com/server.php?q=';
            this.uploadurl = 'https://developmentapi.audiodeadline.com/fileupload.php';
            // this.uploadurl = 'https://audiodeadline.com/fileupload.php';
            this.uploadncropurl = 'https://developmentapi.audiodeadline.com/fileuploadandcrop.php';
            // this.uploadncropurl = 'https://audiodeadline.com/fileuploadandcrop.php';
            this.uploadncropurlnew = 'https://developmentapi.audiodeadline.com/fileuploadandcropnew.php';
            // this.uploadncropurlnew = 'https://audiodeadline.com/fileuploadandcropnew.php';
            this.fileurl = 'https://developmentapi.audiodeadline.com/nodeserver/uploads/';
            this.fileurl_new = 'https://developmentapi.audiodeadline.com/nodeserver/uploads/';
            // this.fileurl = 'https://audiodeadline.com/nodeserver/uploads/';
            this.FB_APP_ID = '906815096194208';
            this.FB_APP_SECRET = 'f569451eb41a239d2045ebf115a3bcc7';
            this.LI_CLIENT_ID = '81dhgq228xfquu';
            this.LI_CLIENT_SECRET = 'EjwBLpUq5683vifK';
        this.items = [
            { serverUrl: this.url },
            { name: 'Ipsita' }
        ];
        }
        if(this.envflag=='live'){
            this.siteurl = 'https://audiodeadline.com/';
            this.artistxpurl = 'https://artistxp.com/';
           // this.siteurl = 'http://api.audiodeadline.com/';
            //this.nodeurl = 'http://192.169.196.208:3009/';
            // this.nodeurl = 'http://192.169.196.208:3007/';
        this.nodeurl = 'https://api.audiodeadline.com:3008/';
        this.nodeurl1 = 'http://api.audiodeadline.com:3007/';
        this.nodeurl2 = 'http://api.audiodeadline.com:3008/';
        this.nodesslurl ='https://api.audiodeadline.com:6003/';
        this.nodesslurl1 ='https://api.audiodeadline.com:6004/';
        this.phpurl = 'https://api.audiodeadline.com/';
        this.phpurllive = 'https://api.audiodeadline.com/';
            //this.url = 'https://audiodeadline.com/serverlocal.php?q=';
            this.url = 'https://api.audiodeadline.com/server.php?q=';
            this.url1 = 'https://api.audiodeadline.com/server3.php?q=';
            // this.url = 'https://audiodeadline.com/server.php?q=';
            this.uploadurl = 'https://api.audiodeadline.com/fileupload.php';
            // this.uploadurl = 'https://audiodeadline.com/fileupload.php';
            this.uploadncropurl = 'https://api.audiodeadline.com/fileuploadandcrop.php';
            // this.uploadncropurl = 'https://audiodeadline.com/fileuploadandcrop.php';
            this.uploadncropurlnew = 'https://api.audiodeadline.com/fileuploadandcropnew.php';
            // this.uploadncropurlnew = 'https://audiodeadline.com/fileuploadandcropnew.php';
            this.fileurl = 'https://api.audiodeadline.com/nodeserver/uploads/';
            // this.fileurl = 'https://audiodeadline.com/nodeserver/uploads/';
            this.FB_APP_ID = '906815096194208';
            this.FB_APP_SECRET = 'f569451eb41a239d2045ebf115a3bcc7';
            this.LI_CLIENT_ID = '81dhgq228xfquu';
            this.LI_CLIENT_SECRET = 'EjwBLpUq5683vifK';
        this.items = [
            { serverUrl: this.url },
            { name: 'Ipsita' }
        ];
        }
    }

    getSponsorList(){
        var sponsorList = [
            {'name': 'nike', 'label': 'NIKE'},
            {'name': 'gibson-guitar', 'label': 'GIBSON GUITAR'},
            {'name': 'apogeeinvent', 'label': 'APOGEEINVENT'},
            {'name': 'beto-paredea', 'label': 'BETO PAREDES'},
            {'name': 'flii-stylz', 'label': 'FLII STYLZ'},
            {'name': 'geo-ai', 'label': 'GEO AI'},
        ];

        return sponsorList;
    }

    getBannerTypeList(){
        var bannerTypeList = [
            // {'val': 2, 'label': 'SPONSORED MEDIA FOR TICKET SALE PAGE'},
            {'val': 3, 'label': 'BANNER FOR AUDIODEADLINE'},
            {'val': 4, 'label': 'BANNER FOR ARTISTXP'},
            {'val': 5, 'label': 'INSTAGRAM BANNER FOR AUDIODEADLINE'},
            {'val': 6, 'label': 'INSTAGRAM BANNER FOR ARTISTXP'},
            {'val': 7, 'label': 'BANNER FOR TICKET SALE'},
            {'val': 8, 'label': 'BANNER FOR MERCHANDISE (AUDIODEADLINE)'},
            {'val': 9, 'label': 'BANNER FOR ARTISTXP SIGN UP'}
        ];

        return bannerTypeList;
    }

    unixtodatetimeConverter(flag,UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = (months[a.getMonth()]);
        // month='0'+month;
        var date = (a.getDate());
        if(date<10) var dates='0'+date.toString();
        else var dates=date.toString();
        var hours = (a.getHours());
        if(hours<10) var hour='0'+hours;
        else var hour=hours.toString();
        var min = (a.getMinutes());
        if(min.toString().length==1) var mins='0'+min;
        else var mins=min.toString();
        var sec = (a.getSeconds());
        if(sec.toString().length==1) var secs='0'+sec;
        else var secs=sec.toString();
        var ampm = ((hours) >= 12) ? "PM" : "AM";
        if( flag==0)var time = month + '-' + dates + '-'+year ;
        if( flag==1)var time  =  hour + ':' + mins + ':' + secs+ " "+ampm ;
        return time;
    }

    /*---------------------------------------------------START_URL-----------------------------------------------*/
    getItems() {
        return this.items;
    }

    /*---------------------------------------------------END_URL-----------------------------------------------*/
    /*isEmailRegisterd(email: string) {
        console.log(email);
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var data= {email};
        var link='http://localhost:3007/allemail';
        //return this.http.post('http://localhost:3007/allemail', JSON.stringify({ email: email }), { headers: headers })
         return this.http.post(link , data)
            .map(res => {
                var result = res.json();
                console.log("length "+result.res);
                //console.log(v);
                //return result.res;
            }, error => {
            console.log("Oooops!");
        });


    }*/
    /*---------------------------------------------------START_Addadmin-----------------------------------------------*/
    postUser(dataForm:any) {

        var link = this.url+'adduser';

        var data = {
            firstname: dataForm.value.firstname,
            lastname:  dataForm.value.lastname,
            telephone:  dataForm.value.phone,
            email:  dataForm.value.email,
            password:  dataForm.value.password,
            address:  dataForm.value.address,
            address2:  dataForm.value.address2,
            city:  dataForm.value.city,
            state:  dataForm.value.state,
            zip:  dataForm.value.zipcode,
            rsvp:  dataForm.value.rsvp,
            signupaffiliate:  dataForm.value.signupaffiliate,
        };
        //console.log("addadminservice");
        //console.log(data);
        //return this.http.post(link, data).map((res:Response) => res.json());
    }
    /*---------------------------------------------------END_Addadmin-----------------------------------------------*/

    logout(){
        this.cookieData.deleteAll();
        console.log('dfgdfjhu');
        this.router.navigateByUrl('/');
    }
    inputUntouch(form:any,val:any){
        //  console.log('on blur .....');
        form.controls[val].markAsUntouched();
    }
}