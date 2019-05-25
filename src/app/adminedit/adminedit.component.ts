import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Commonservices} from '../app.commonservices';
import {ActivatedRoute, Router} from '@angular/router';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-adminedit',
    templateUrl: './adminedit.component.html',
    styleUrls: ['./adminedit.component.css'],
    providers: [Commonservices]
})

export class AdmineditComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public is_error;
    public state2;
    public userid;
    public array:any=[];
    routes:any;
    userdetails:any;

    constructor(fb: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private route:ActivatedRoute){
        this.userid = '';
        this.fb = fb;
        this.serverurl=_commonservices.url;
        this.routes = router;
        console.log(this.routes.url);
        this.route.params.subscribe(params=>{
            this.userid = params['id'];
            this.getUserDetails();
        });

        let link=this.serverurl+'getusastates';
        this._http.get(link)
            .subscribe(res => {
                let result1:any;
               result1 = res;
                this.state2 = result1;
            }, error => {
                console.log("Oooops!");
            });
    }

    ngOnInit(){
        this.dataForm = this.fb.group({
            firstname: ["", Validators.required],
            lastname: ["", Validators.required],
            phone: ["", Validators.required],
            email: [""],
            role: ["", Validators.required],
            username: [""],
            address: ["", Validators.required],
            address2: [""],
            city: ["", Validators.required],
            state: ["", Validators.required],
            zip: ["", Validators.required],
            rsvp: [false],
            signupaffiliate: [false],
            musicians: 0,
            dancer: 0,
            model: 0,
            producer: 0,
            fan: 0,

        });
    }

    getUserDetails(){
        var link =this.serverurl+'dashboard';
        var data = {_id: this.userid};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if (result.status == 'success' && typeof(result.item) != 'undefined') {
                    let userdet = result.item;
                    this.userdetails=result.item;;
                    this.dataForm.controls['firstname'].setValue(userdet.firstname);
                    this.dataForm.controls['lastname'].setValue(userdet.lastname);
                    this.dataForm.controls['phone'].setValue(userdet.phone);
                    this.dataForm.controls['email'].setValue(userdet.email);
                    this.dataForm.controls['username'].setValue(userdet.username);
                    this.dataForm.controls['address'].setValue(userdet.address);
                    this.dataForm.controls['address2'].setValue(userdet.address2);
                    this.dataForm.controls['city'].setValue(userdet.city);
                    this.dataForm.controls['state'].setValue(userdet.state);
                    this.dataForm.controls['zip'].setValue(userdet.zip);
                    this.dataForm.controls['dancer'].setValue(userdet.dancer);
                    this.dataForm.controls['model'].setValue(userdet.model);
                    this.dataForm.controls['musicians'].setValue(userdet.musicians);
                    this.dataForm.controls['producer'].setValue(userdet.producer);
                    this.dataForm.controls['fan'].setValue(userdet.fan);
                    console.log(userdet);
                    if (userdet.admin == 1) {
                        this.array.push('admin');
                        this.dataForm.controls['role'].setValue(this.array);
                    }
                    else {
                        if (userdet.signupaffiliate == 1) {
                            this.array.push('affiliate');

                            // this.dataForm.controls['role'].setValue("affiliate");
                        }

                        if (userdet.ambassador == 1) {
                            this.array.push('ambassador');
                            /*this.dataForm.controls['role'].setValue(this.array);
                            this.dataForm.controls['role'].setValue("ambassador");*/
                        }

                        if (userdet.dancer == 1 || userdet.fan == 1 || userdet.model == 1 || userdet.musicians == 1 || userdet.producer == 1) {
                            this.array.push('user');
                        }

                   /*     if (userdet.fan == 1) {
                            this.array.push('fan');
                         }
                        if (userdet.model == 1) {
                            this.array.push('model');
                        }
                        if (userdet.musicians == 1) {
                            this.array.push('musicians');
                        }
                        if (userdet.producer == 1) {
                            this.array.push('producer');
                         }*/
                    }

                    this.dataForm.controls['role'].setValue(this.array);
                }

            },error => {
                console.log("Oooops!");
            });
    }
    checkval(event,type){
        if(event.target.checked){
            if(type=='fan'){
                this.dataForm.controls['fan'].setValue(1);
                this.dataForm.controls['model'].setValue(0);
                this.dataForm.controls['musicians'].setValue(0);
                this.dataForm.controls['producer'].setValue(0);
                this.dataForm.controls['dancer'].setValue(0);
            }
            //this.dataForm.controls[type].setValue(1);
        }else{
            this.dataForm.controls[type].setValue(0);
        }

    }
    dosubmit(formval){
       console.log(formval);
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if(this.dataForm.controls['role'].value.indexOf('admin')>-1){
            formval.admin=1;
        }
        if(this.dataForm.controls['role'].value.indexOf('affiliate')>-1){
            formval.signupaffiliate=1;
        }
        if(this.dataForm.controls['role'].value.indexOf('ambassador')>-1){
            formval.ambassador=1;
        }
       /* if(this.dataForm.controls['role'].value.indexOf('dancer')>-1){
            formval.dancer=1;
        }
        if(this.dataForm.controls['role'].value.indexOf('fan')>-1){
            formval.fan=1;
        }
        if(this.dataForm.controls['role'].value.indexOf('model')>-1){
            formval.model=1;
        }
        if(this.dataForm.controls['role'].value.indexOf('musicians')>-1){
            formval.musicians=1;
        }
        if(this.dataForm.controls['role'].value.indexOf('producer')>-1){
            formval.producer=1;
        }*/

        var link = this.serverurl + 'updateuser';
        if(this.dataForm.valid){
            var data = {
                _id: this.userid,
                firstname: formval.firstname,
                lastname: formval.lastname,
                phone: formval.phone,
                email: formval.email,
                username: formval.username,
                address: formval.address,
                address2: formval.address2,
                city: formval.city,
                state: formval.state,
                zip: formval.zip,
                admin: formval.admin,
                signupaffiliate: formval.signupaffiliate,
                ambassador: formval.ambassador,
                dancer: formval.dancer,
                fan: formval.fan,
                model: formval.model,
                musicians: formval.musicians,
                producer: formval.producer,
            };
            console.log('Data');
            console.log(data);
           // return;

            this._http.post(link, data)
                .subscribe(res => {
                    let result:any;
                    result = res;
                    if (result.status == 'success'){
                        console.log(this.routes.url);
                        if(this.routes.url.indexOf('edit-affiliate')>-1){
                            this.router.navigate(['/affiliate-list']);
                        }
                        if(this.routes.url.indexOf('edit-ambassador')>-1){
                            this.router.navigate(['/ambassador-list']);
                        }
                        if(this.routes.url.indexOf('/edit-admin')>-1){
                            this.router.navigate(['/admin-list']);
                        }
                        if(this.routes.url.indexOf('/edit-user')>-1){
                            this.router.navigate(['/user-list']);
                        }


                    }else{

                        this.is_error = result.msg;
                    }
                }, error => {
                    console.log("Oooops!");
                });
        }
    }
}