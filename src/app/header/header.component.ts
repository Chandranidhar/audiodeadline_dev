import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {CookieService} from 'ngx-cookie-service';
import {Router, NavigationEnd} from "@angular/router";
import {style} from "@angular/animations";
import {Commonservices} from "../app.commonservices";

declare  var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: [Commonservices]
})
export class HeaderComponent implements OnInit {
    modalRef: BsModalRef;
    public isLoggedIn:boolean;
    public url;
    public menubox:any = 0;
    public menubox1:any = 0;
    commonservices:Commonservices;
    public userdata:any;

    constructor(private modalService: BsModalService, private _commonservices: Commonservices , userdata: CookieService,private router: Router) {
        this.userdata = userdata;
        let userdata2: any;
        this.commonservices=_commonservices;
        userdata2= userdata.get('userdetails');

        if (typeof (userdata2) == 'undefined' || userdata2 == ''){
            this.isLoggedIn = false;
        }else{
            this.isLoggedIn = true;
        }

        this.router.events.subscribe(val=> {
            if (val instanceof NavigationEnd) {
                this.url = this.router.routerState.snapshot.root.firstChild.routeConfig.path;
            }
        });
    }

    ngOnInit() {
    }


    dropdownmenunew(){

        // $('#menu-box').find('ul').toggleClass('fadein fadeout');
        this.menubox = 1-this.menubox;
        this.menubox1 = 0;
    }

    dropdownmenunew1(){
        // $('#menu-box').find('ul').toggleClass('fadein fadeout');
        this.menubox1 = 1-this.menubox1;
        this.menubox = 0;
    }
    
    showvideo(template: TemplateRef<any>){
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});
    }

}
