import { Component, OnInit, Inject, HostListener } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { DOCUMENT } from "@angular/platform-browser";
/*declare  var $: any;*/

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    public isLoggedIn:boolean;

    windowScrolled: boolean;

    constructor(userdata: CookieService, @Inject(DOCUMENT) public document: Document) {
        this.document = document;
        let userdata2: any;
        userdata2= userdata.get('userdetails');

        if (typeof (userdata2) == 'undefined' || userdata2 == ''){
            this.isLoggedIn = false;
        }else{
            this.isLoggedIn = true;
        }
    }


    @HostListener("window:scroll", [])

    onWindowScroll() {
        if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
            this.windowScrolled = true;
        }
        else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
            this.windowScrolled = false;
        }
    }
    scrollToTop() {
        (function smoothscroll() {

            var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - (currentScroll / 8));
            }

        })();
    }

    ngOnInit() {
    }

}



