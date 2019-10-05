import { Component, OnInit } from '@angular/core';
import {SignupComponent} from '../signup/signup.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Commonservices} from '../app.commonservices';
import {UpdateprofileComponent} from '../updateprofile/updateprofile.component'
// import {Http} from '@angular/http';
import {CookieService} from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.css'],
    providers: [Commonservices]
})
export class ChangepasswordComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public routes;
    public serverurl;
    public is_error;
    public updateprofilepageval;
    public userid;
    commonservices:Commonservices;
    coockieData:CookieService;
    items:any;

    constructor(fb: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router, userdata: CookieService , updateprofilepage:UpdateprofileComponent) {
        this.fb = fb;
        this.updateprofilepageval = updateprofilepage;
        this.routes = router;
        this.coockieData= userdata;
        this.commonservices=_commonservices;
        this.items = _commonservices.getItems();
        this.serverurl=_commonservices.url;
        let userdata2: any;
        userdata2= userdata.get('userdetails');
        userdata2 = JSON.parse(userdata2);
        if (typeof (userdata2) == 'undefined'){
            this.router.navigateByUrl('/login');
        }else{
            this.userid = userdata2._id;
        }
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            oldpassword: ["", Validators.required],
            password: ["", Validators.required],
            confirmpassword: ["", Validators.required],
        }, {validator: this.matchingPasswords('password', 'confirmpassword')});
    }

    public matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
            let password = group.controls[passwordKey];
            let confirmPassword = group.controls[confirmPasswordKey];

            if (password.value !== confirmPassword.value) {
                return {
                    mismatchedPasswords: true
                };
            }
        }
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        var link = this.serverurl+'changepassword';
        if (this.dataForm.valid) {
            var data = {
                _id: this.userid,
                oldpassword: formval.oldpassword,
                password: formval.password,
            };

            this._http.post(link, data)
                .subscribe(res => {
                    let result:any;
                    result = res;
                    if(result.status=='success'){
                        this.updateprofilepageval.modalRef.hide();
                        // this.router.navigate(['/dashboard']);
                    }
                    else {
                        this.is_error= result.msg;
                    }
                }, error => {
                    console.log("Oooops!");
                });
        }
    }

}
