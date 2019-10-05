import { Component } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {environment} from '../environments/environment';
import {Title} from '@angular/platform-browser';
declare  var $: any;

declare const FB: any;

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 // title = 'app works!';
  public url;
  constructor(private router: Router,private titleService: Title) {}

  ngOnInit() {

    this.router.events.subscribe(val=> {
      if (val instanceof NavigationEnd) {
        let curUrlTree = this.router.parseUrl(this.router.url);
        this.url=this.router.url;
        /*$('.ssd ').removeClass('active');
          if (this.url=='/'){
              $('.ssd ').eq(0).addClass('active');
          }
          if (this.url=='/host-flii-stylz'){
              $('.ssd ').eq(1).addClass('active');
          }
          if (this.url=='/ticket-sale' || this.router.routerState.snapshot.root.firstChild.routeConfig.path == 'ticket-sale/:param1' || this.router.routerState.snapshot.root.firstChild.routeConfig.path == 'ticket-sale/:param1/:param2' || this.router.routerState.snapshot.root.firstChild.routeConfig.path == 'ticket-sale/:param1/:param2/:param3'){
          //if (this.url=='/signup' || this.router.routerState.snapshot.root.firstChild.routeConfig.path == 'signup/:uname'){
              $('.ssd ').eq(2).addClass('active');
          }
          if (this.url=='/dates'){
              $('.ssd ').eq(3).addClass('active');
          }
          if (this.url=='/team'){
              $('.ssd ').eq(4).addClass('active');
          }
          if (this.url=='/community-signup' || this.router.routerState.snapshot.root.firstChild.routeConfig.path == 'community-signup/:uname' || this.router.routerState.snapshot.root.firstChild.routeConfig.path == 'community-signup/:uname/:mediaid'){
              $('.ssd ').eq(6).addClass('active');
          }
          if (this.url=='/contactus'){
              $('.ssd ').eq(6).addClass('active');
          }

          if (!!val.url && val.url.match(/^\/#/)) {
              this.router.navigate([val.url.replace('/#', '')]);
          }*/

      }
    });

      FB.init({
          appId      : '906815096194208',
          cookie     : false,
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.5' // use graph api version 2.5
      });

      /*if (environment.production) {
          if (location.protocol === 'http:') {
              window.location.href = location.href.replace('http', 'https');
          }
      }*/

  }
}
