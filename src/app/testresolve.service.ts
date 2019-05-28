import { Injectable } from '@angular/core';
import {Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';
//import { ApiService } from './api_service/api.service';
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
//import {Commonservices} from "./app.commonservices";
import { CookieService } from 'ngx-cookie-service';
import { switchMap, map, takeWhile } from 'rxjs/operators';
import {promise} from "selenium-webdriver";

export interface EndpointComponent {
    endpoint: string;
}

@Injectable()
export class TestresolveService implements Resolve<EndpointComponent> {

    public limit:any = 10;
    public skip:any = 0;
    public user_id:any = '';
    public username:any = '';
    public url:any;
    public url1:any;

    constructor( private _http: HttpClient,private router: Router,public userdata: CookieService) {
        this.userdata=userdata;
        this.url = "https://developmentapi.audiodeadline.com:6090/";
        this.url1 = "https://developmentapi.audiodeadline.com:6004/";
        /*this.url1 = "https://api.audiodeadline.com:6004/";
        this.url = "https://api.audiodeadline.com:6003/";*/
    }
    resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        //let id = route.params['id'];
        // console.log('resolve route data');
        // console.log(route.data);

        let endpoint:any;
        if(route.data.object=='adminlistnew'){
            endpoint=route.data.object;
            console.log(endpoint);
            console.log(state);

            return new Promise((resolve)=>{this.adminlist().subscribe(api_object=>{
                if(api_object){
                    return resolve(api_object);
                }
                else{
                    return true;
                }
            });
            });
        }
        //let endpoint:any;
        if(route.data.object=='genrelistnew'){
            endpoint=route.data.object;
            console.log(endpoint);
            console.log(state);
            return new Promise((resolve)=>{this.getGenreList().subscribe(api_object=>{
                if(api_object){
                    return resolve(api_object);

                }
                else{
                    return true;
                }
            });
            });
        }
        if(route.data.object == 'mediamarketdata'){

            endpoint=route.data.object;

            console.log(endpoint);
            console.log(state);

            return new Promise((resolve) => { this.getmarketdata().subscribe(api_object => {
                if (api_object) {
                    return resolve(api_object);
                } else { // id not found
                    // this.router.navigateByUrl('/login');
                    return true;
                }
            });
            });
        }
        if(route.data.object == 'managecompsign'){

            endpoint=route.data.object;

            console.log(endpoint);
            console.log(state);

            return new Promise((resolve) => { this.getmanageCompList().subscribe(api_object => {
                if (api_object) {
                    return resolve(api_object);
                } else { // id not found
                    // this.router.navigateByUrl('/login');
                    return true;
                }
            });
            });
        }
        if(route.data.object == 'complist'){

            endpoint=route.data.object;

            console.log(endpoint);
            console.log(state);

            return new Promise((resolve) => { this.getCompList().subscribe(api_object => {
                if (api_object) {
                    return resolve(api_object);
                } else { // id not found
                    // this.router.navigateByUrl('/login');
                    return true;
                }
            });
            });
        }
        if(route.data.object == 'blogsresolve'){

            endpoint=route.data.object;

            console.log(endpoint);
            console.log(state);

            return new Promise((resolve) => { this.getblogsList().subscribe(api_object => {
                if (api_object) {
                    return resolve(api_object);
                } else { // id not found
                    // this.router.navigateByUrl('/login');
                    return true;
                }
            });
            });
        }
        if(route.data.object == 'orderlistaff'){

            endpoint=route.data.object;

            console.log(endpoint);
            console.log(state);
            this.user_id = this.userdata.get('user_id');

            return new Promise((resolve) => { this.getOrderListForAffiliate().subscribe(api_object => {
                if (api_object) {
                    return resolve(api_object);
                } else { // id not found
                    // this.router.navigateByUrl('/login');
                    return true;
                }
            });
            });
        }
        if(route.data.object=='ambassadorresolve'){
            endpoint=route.data.object;
            console.log(endpoint);
            console.log(state);
            return new Promise((resolve)=>{this.ambassadorlist().subscribe(api_object=>{
                if(api_object){
                    return resolve(api_object);

                }
                else{
                    return true;
                }
            })})
        }
        if(route.data.object=='affiliateresolve'){
            endpoint=route.data.object;
            console.log(endpoint);
            console.log(state);
            return new Promise((resolve)=>{this.affiliatelist().subscribe(api_object=>{
                if(api_object){
                    return resolve(api_object);

                }
                else{
                    return true;
                }
            })})
        }

        if(route.data.object == 'commisionlist'){
            endpoint=route.data.object;


    if(route.data.condition.typeval == 'true'){
    let userdata2 =JSON.parse(this.userdata.get('userdetails'));
    let signupaffiliate = userdata2.signupaffiliate;
    let admin = userdata2.admin;

    if(signupaffiliate==1){
        let username = userdata2.username;
        return new Promise((resolve) => { this.getCommisionlist(username).subscribe(api_object => {
            if (api_object) {
                return resolve(api_object);
            } else { // id not found
                // this.router.navigateByUrl('/login');
                return true;
            }
        });
        });

    }
    if(admin==1){
        let username = '';
        return new Promise((resolve) => { this.getCommisionlist(username).subscribe(api_object => {
            if (api_object) {
                return resolve(api_object);
            } else { // id not found
                // this.router.navigateByUrl('/login');
                return true;
            }
        });
        });

    }
}
        }
        if(route.data.object=='sponserlistresolve'){
            endpoint=route.data.object;
            console.log(endpoint);
            console.log(state);
            return new Promise((resolve)=>{this.sponserlist().subscribe(api_object=>{
                if(api_object){
                    return resolve(api_object);
                }
                else{
                    return true;
                }
            })})
        }
        if(route.data.object=='userlistresolve'){
            endpoint=route.data.object;
            console.log(endpoint);
            console.log(state);
            return new Promise((resolve)=>{this.userlist().subscribe(api_object=>{
                if(api_object){
                    return resolve(api_object);
                }
                else{
                    return true;
                }
            })})
        }

    }

    getmarketdata(){

        let link2= this.url+'datalist';
        //alert(this.user_id);
        //alert(this.userdata.get('user_id'));
        //if(this.user_id=='' || this.user_id==null || this.user_id.length<5) return true;
        // console.log(data);

        let result =this._http.post(link2,({source:'mediaview',condition:{"type":7,"status":1}})).pipe(map(res => res));
        return result;

    }
    getOrderListForAffiliate(){

        let link2= this.url+'datalist';
        //alert(this.user_id);
        //alert(this.userdata.get('user_id'));
        //if(this.user_id=='' || this.user_id==null || this.user_id.length<5) return true;
        // console.log(data);

        let result =this._http.post(link2,({"source": "order_view","condition":{"userid_object":this.user_id},"sort":"-time"})).pipe(map(res => res));
        return result;

    }

    getCommisionlist(val){
        let link2= this.url+'datalist';
        if(val == ''){

            let result =this._http.post(link2,({"source": "newcommision"})).pipe(map(res => res));
            return result;
        }
        if(val!=''){
            let result =this._http.post(link2,({"source": "newcommision","condition":{"username":val}})).pipe(map(res => res));
            return result;
        }
    }

    adminlist(){
        let link = this.url + 'datalist';
        let result =this._http.post(link,({'source':'all_admin'})).pipe(map(res => res));
         return result;
    }
    getGenreList(){
        let link =this.url+'datalist';
        let result=this._http.post(link,({'source':'allgenre'})).pipe(map(res=>res));
        return result;
    }
    getmanageCompList(){
        let link =this.url1+'getcompetitionsignuplist';
        let result=this._http.post(link,({})).pipe(map(res=>res));
        return result;
    }
    getCompList(){
        let link =this.url1+'competitionlist';
        let result=this._http.post(link,({})).pipe(map(res=>res));
        return result;
    }
    ambassadorlist(){
        let link=this.url+'datalist';
        let result=this._http.post(link,({'source':'user_ambassador'})).pipe(map(res=>res));
        return result;
    }
    affiliatelist(){
        let link=this.url+'datalist';
        // let result=this._http.post(link,({'source':'user_affiliate'})).pipe(map(res=>res));
        let result=this._http.post(link,({'source':'user_affiliate'})).pipe(map(res=>res));
        return result;
    }
    getblogsList(){
        let link:any = this.url+'datalist';
        // let link=serverurl+'bloglist';
        let result=this._http.post(link,({'source':'blogview'})).pipe(map(res=>res));
        return result;
    }
    sponserlist(){
        let link=this.url+'datalist';
        let result=this._http.post(link,({'source':'sponser'})).pipe(map(res=>res));
        return result;
    }
    userlist(){
        let link=this.url+'datalist';
        let result=this._http.post(link,({'source':'all_users'})).pipe(map(res=>res));
        return result;
    }
// {"condition":{"parent": "banetest"},"source": "newcommision"}

}

