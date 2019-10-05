import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie/core';
import {Commonservices} from "../app.commonservices";
declare var $: any;
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css'],
  providers: [Commonservices]
})
export class ContactusComponent implements OnInit {
  public dataForm: FormGroup;
  private fb;
  commonservices:Commonservices;
  public serverurl;
  public contactsuccess1:any =false;
  items:any;

  constructor(fb: FormBuilder,private _http: HttpClient,private router: Router, public _commonservices: Commonservices) {
    this.fb = fb;
    this.commonservices=_commonservices;
    this.items = _commonservices.getItems();
    this.serverurl=_commonservices.url;
    console.log(this.serverurl);

  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      /*fullname: ["", Validators.required],*/
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      // email: ["", ContactusComponent.validateEmail],
      email:  ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
      /*phoneno: ["", Validators.required],*/
      message: ["", Validators.required],
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
    for (x in this.dataForm.controls) {
      console.log(this.dataForm.controls[x]);
      this.dataForm.controls[x].markAsTouched();
    }
    var link = this.serverurl+'contactus';
    if (this.dataForm.valid) {
      var data = {
        /*fullname: formval.fullname,*/
        firstname: formval.firstname,
        lastname: formval.lastname,
        email: formval.email,
        /*phoneno: formval.phoneno,*/
        message: formval.message
      };

      this._http.post(link,data)
          .subscribe(res => {
            let result:any;
            result = res;

            console.log(result.status);
            if(result.status=="success"){
            //  this.dataForm.reset();
              this.contactsuccess1 = true;
            }
              // this.contactsuccess = true;
           // this.router.navigate(['/']);

          }, error => {
            console.log("Oooops!");
          });
       this.dataForm.reset();
    }
  }

  close(){
    this.contactsuccess1= false;
  }

}






