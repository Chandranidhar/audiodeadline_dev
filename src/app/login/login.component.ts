import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {Commonservices} from "../app.commonservices";
import {TicketsaleComponent} from "../ticketsale/ticketsale.component";
declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
    providers: [Commonservices,TicketsaleComponent]
})

export class LoginComponent implements OnInit {
    public loginform: FormGroup;
    private fb;
    private userdata: CookieService;
    private userdetails;
    items:any;
    commonservices:Commonservices;
    public is_error;
    public serverurl;
    public ticketsale;

  constructor(fb: FormBuilder,private _http: HttpClient,private router: Router, userdata: CookieService, private _commonservices: Commonservices , ticketsale:TicketsaleComponent) {
      this.fb = fb;
      this.ticketsale = ticketsale;
      this.userdata = userdata;
      this.commonservices=_commonservices;
      this.items = _commonservices.getItems();
      this.serverurl=_commonservices.url;
  }

    ngOnInit() {
        this.loginform = this.fb.group({
            email: ["", LoginComponent.validateEmail],
            password: ["", Validators.required],
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


    dosubmit(formval) {
        let x: any;
        this.is_error = 0;
        for (x in this.loginform.controls) {
            console.log(this.loginform.controls[x]);
            this.loginform.controls[x].markAsTouched();
        }
        console.log(this.loginform.valid);
        var link = this.serverurl+'userlogin';

        // var link = 'http://localhost:3007/userlogin';
        if (this.loginform.valid) {
            var data = {
                email: formval.email,
                password: formval.password,
            };

            console.log(data);
            this._http.post(link, data)
                .subscribe(res => {
                    let result:any;
                    result = res;
                    console.log(result.msg);
                    if(result.status=='success'){
                        this.userdata.set('userdetails', JSON.stringify(result.msg));
                        this.userdata.set('user_id',result.msg._id);
                        this.userdata.set('user_email',result.msg.email);
                        this.userdata.set('username',result.msg.username);
                        let userdata2: any;
                        userdata2= result.msg;
                        console.log('userdata2');
                        console.log(userdata2);
                        console.log(this.router.url);
                        if(this.router.url=='/login'){

                            if (typeof (userdata2) == 'undefined' || userdata2 == '') {
                                this.router.navigateByUrl('/login');
                            } else {                                    //replace in login page
                                //userdata2 =JSON.parse(userdata2);
                                if(userdata2.admin == 0){
                                    if(userdata2.signupaffiliate == 1){
                                        if(userdata2.agreement == 0){
                                            this.router.navigateByUrl('/agreement/'+userdata2._id);
                                        }else{
                                            this.router.navigateByUrl('/affiliate-dashboard');
                                        }
                                    }else if(userdata2.ambassador == 1){
                                        if(userdata2.agreement == 0){
                                            this.router.navigateByUrl('/ambassador-agreement/'+userdata2._id);
                                        }else{
                                            this.router.navigateByUrl('/ambassador-dashboard');
                                        }
                                    }else {
                                        //this.router.navigateByUrl('/user-dashboard');
                                        this.router.navigateByUrl('/my-order');
                                    }
                                }else{
                                    this.router.navigateByUrl('/dashboard');
                                }
                            }
                        }
                        if(this.router.url.indexOf('/ticket-sale')>-1){
                            //this.ticketsale.closep();
                            //this.ticketsale.gettokens();
                            this.ticketsale.loginmodalold();
                        }

                    }
                    else {
                        this.is_error=result.msg;
                        console.log(this.is_error);
                        this.router.navigate(['/login']);
                    }
                }, error => {
                    console.log("Oooops!");

                    this.router.navigate(['/login']);
                });
        }
    }
}
