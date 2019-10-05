import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {ActivatedRoute, Router} from "@angular/router";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-blogdetails',
  templateUrl: './blogdetails.component.html',
  styleUrls: ['./blogdetails.component.css'],
  providers: [Commonservices]
})
export class BlogdetailsComponent implements OnInit {

  public blogid;
  public serverurl;
  public siteurl;
  public blogdet;

  constructor(private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private route:ActivatedRoute,private sanitizer: DomSanitizer) {
    this.serverurl=_commonservices.url;
    this.siteurl=_commonservices.siteurl;
    this.route.params.subscribe(params=>{
      this.blogid = params['id'];
      this.getBlogDetails();
    });

  }

  ngOnInit() {
  }

  getBlogDetails(){
    var link =this.serverurl+'frontblogdetails';
    var data = {_id: this.blogid};

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          if (result.status == 'success' && typeof(result.item) != 'undefined'){
            this.blogdet = result.item;
          }
        },error => {
          console.log("Oooops!");
        });

  }

  getDesc(item){
    return this.sanitizer.bypassSecurityTrustHtml(item.description);
  }


}
