import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices';
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

  constructor(private _http: HttpClient, private router: Router, userdata: CookieService, private _commonservices: Commonservices, private activeRoute: ActivatedRoute) {

    this.serverurl=_commonservices.url;
    this.fileurl = _commonservices.fileurl;
      this.usercookie = userdata;
      this.affiliatename = this.usercookie.get('username');
      this.username = this.usercookie.get('username');
      console.log(this.affiliatename);
    this.uploadfile = 'banner';
    // this.getticketsalebanner();
    this.getmechandisebanner();
    this.getartistxpsignupbanner();
      this.FB_APP_ID=_commonservices.FB_APP_ID;
      this.FB_APP_SECRET=_commonservices.FB_APP_SECRET;
      this.LI_CLIENT_ID=_commonservices.LI_CLIENT_ID;
      this.LI_CLIENT_SECRET=_commonservices.LI_CLIENT_SECRET;
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


}
