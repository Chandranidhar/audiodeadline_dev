import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-ambassadordashboard',
  templateUrl: './ambassadordashboard.component.html',
  styleUrls: ['./ambassadordashboard.component.css'],
    providers: [Commonservices]
})
export class AmbassadordashboardComponent implements OnInit {

    commonservices:Commonservices;
    public serverurl;
    public userid;
    public userdetails;
    public enrollerdetails;
    public username;
    public userlink;
    public defaultadmedia;
    public defaultadimage;
    public defaultxpmedia;
    public defaultxpimage;


    constructor(private _http: HttpClient, private router: Router, userdata: CookieService, private _commonservices: Commonservices) {
        this.commonservices=_commonservices;
        this.serverurl=_commonservices.url;
        this.defaultadmedia = '';
        this.defaultadimage = '';
        this.defaultxpmedia = '';
        this.defaultxpimage = '';

      let userdata2: any;
      userdata2= userdata.get('userdetails');
      userdata2 = JSON.parse(userdata2);
      if (typeof (userdata2) == 'undefined'){
          this.router.navigateByUrl('/login');
      }else{
          this.userid = userdata2._id;
          this.getUserDetails();
          this.getBannerList2();
      }

  }

  ngOnInit() {
  }
    getBannerList1(){
        var link =this.serverurl+'medialistbytype';
        var data = {type: 3};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if(result.res.length > 0){
                    this.defaultadmedia = result.res[0].name;
                    this.defaultadimage = result.res[0].image;
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
                if(result.res.length > 0){
                    this.defaultxpmedia = result.res[0].name;
                    this.defaultxpimage = result.res[0].image;
                }
            },error => {
                console.log("Oooops!");
            });
    }


    getUserDetails(){
        var link =this.serverurl+'dashboard';
        var data = {_id: this.userid};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if (result.status == 'success' && typeof(result.item) != 'undefined'){
                    let userdet = result.item;
                    this.userdetails = userdet;
                    this.username = userdet.username;
                    if(userdet.parent != 0 && userdet.parent != ''){
                        this.getEnrollerDetails(userdet.parent);
                    }
                }
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



}
