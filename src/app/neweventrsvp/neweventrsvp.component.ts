import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {Router, ActivatedRoute} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

declare var $ : any;

@Component({
  selector: 'app-neweventrsvp',
  templateUrl: './neweventrsvp.component.html',
  styleUrls: ['./neweventrsvp.component.css'],
  providers: [Commonservices]
})

export class NeweventrsvpComponent implements OnInit {
    modalRef: BsModalRef;
  public dataForm: FormGroup;
  private fb;
  items:any;
  public serverurl;
  public is_error;
  commonservices:Commonservices;
  public data: any = [];
  public state: any = [];
  public state2: any = [];
  public val;
  public mediaid;
  public chkerror;
  private userdata: CookieService;
  public imagearr = [];
  public zoomimg;
  public showleft;
  public showright;

  constructor(fb: FormBuilder,private _http: HttpClient,private router: Router, private _commonservices : Commonservices,private route:ActivatedRoute, userdata: CookieService,private modalService: BsModalService){
    this.chkerror = 0;
    this.userdata = userdata;
    this.fb = fb;
    this.commonservices=_commonservices;
    this.items = _commonservices.getItems();
    this.serverurl=_commonservices.url;

    let link=this.serverurl+'getusastates';

    this._http.get(link)
        .subscribe(res => {
          let result1:any;
          result1 = res;
          this.state2 = result1;
          for(let i in result1){
            this.state[i]= result1[i].name;
          }
        }, error => {
          console.log("Oooops!");
        });

    this.val = '';
    this.mediaid = '';
    this.route.params.subscribe(params=>{
      if(typeof (params.uname) != 'undefined'){
        this.val = params.uname;
        this.userdata.set('affiliatename', this.val);
        this.addNoOfClick();
      }else{
        let userdata2: any;
        userdata2= userdata.get('affiliatename');
        if (typeof (userdata2) != 'undefined' && userdata2 != ''){
          this.val = userdata2;
        }
        let userdata3: any;
        userdata3= userdata.get('mediaid');
        if (typeof (userdata3) != 'undefined' && userdata3 != ''){
          this.mediaid = userdata3;
        }
      }

      if(typeof (params.mediaid) != 'undefined'){
        this.mediaid = params.mediaid;
        this.userdata.set('mediaid', this.mediaid);
        this.addMediaNoOfClick();
      }else{
        let userdata3: any;
        userdata3= userdata.get('mediaid');
        if (typeof (userdata3) != 'undefined' && userdata3 != ''){
          this.mediaid = userdata3;
        }
      }
    });

    this.zoomimg = '';
    this.imagearr = ['venueimg1.jpg','venueimg2.jpg','venueimg3.jpg','venueimg4.jpg','venueimg5.jpg','venueimg6.jpg','venueimg7.jpg','venueimg8.jpg','venueimg9.jpg','venueimg10.jpg','venueimg11.jpg','venueimg12.jpg'];

  }

  ngOnInit(){
    this.dataForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      phone: ["", Validators.required],
      email: ["", NeweventrsvpComponent.validateEmail],
      username: ["", NeweventrsvpComponent.validateUsername],
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required],
      address: ["", Validators.required],
      address2: [""],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required],
    },{validator: this.matchingPasswords('password', 'confirmpassword')});
  }

  static validateUsername(control: FormControl){
    if(control.value==''){
      return { 'invalidusername': true };
    }

    if ( !control.value.match(/^\S*$/)){
      return { 'invalidusername': true };
    }
  }
  static validateEmail(control: FormControl){
    if(control.value==''){
      return { 'invalidemail': true };
    }

    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
      return { 'invalidemail': true };
    }
  }

  public matchingPasswords(passwordKey: string, confirmPasswordKey: string){
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value){
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  addMediaNoOfClick(){
    var link =this.serverurl+'addMediaNoOfClick';
    var data = {mediaid:this.mediaid};

    this._http.post(link, data)
        .subscribe(res => {
          console.log("Success!");
        },error => {
          console.log("Oooops!");
        });
  }
  addNoOfClick(){
    var link =this.serverurl+'addNoOfClick';
    var data = {username:this.val};

    this._http.post(link, data)
        .subscribe(res => {
          console.log("Success!");
        },error => {
          console.log("Oooops!");
        });
  }

  dosubmit(formval,template: TemplateRef<any>){
    this.chkerror = 0;
    let x: any;
    for (x in this.dataForm.controls){
      this.dataForm.controls[x].markAsTouched();
    }
    var link = this.serverurl+'signup';
    if (this.dataForm.valid){
      var data = {
          firstname: formval.firstname,
          lastname: formval.lastname,
          phone: formval.phone,
          email: formval.email,
          username: formval.username,
          password: formval.password,
          address: formval.address,
          address2: formval.address2,
          city: formval.city,
          state: formval.state,
          zip: formval.zip,
          rsvp: 1,
          signupaffiliate: 0,
          parent: this.val,
          mediaid: this.mediaid,
          laevent:1
        };

        this._http.post(link, data)
            .subscribe(res => {
              let result:any;
              result = res;
              if(result.status=='success'){
                this.userdata.delete('affiliatename');
                this.userdata.delete('mediaid');
                  this.modalRef = this.modalService.show(template);

                  this.dataForm.controls['firstname'].setValue('');
                  this.dataForm.controls['lastname'].setValue('');
                  this.dataForm.controls['phone'].setValue('');
                  this.dataForm.controls['email'].setValue('');
                  this.dataForm.controls['username'].setValue('');
                  this.dataForm.controls['password'].setValue('');
                  this.dataForm.controls['confirmpassword'].setValue('');
                  this.dataForm.controls['address'].setValue('');
                  this.dataForm.controls['address2'].setValue('');
                  this.dataForm.controls['city'].setValue('');
                  this.dataForm.controls['state'].setValue('');
                  this.dataForm.controls['zip'].setValue('');

                for (x in this.dataForm.controls) {
                  this.dataForm.controls[x].markAsUntouched();
                }

                setTimeout(()=>{
                      this.modalRef.hide();
                  }, 3000);

              }else{
                this.is_error= result.msg;
              }
            }, error => {
              console.log("Oooops!");
            });

    }
  }

  zoominage(item,template: TemplateRef<any>){
    this.zoomimg = item;
    this.chkindex();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closemodal(){
    this.modalRef.hide();
  }

  previmg(){
    let idx = this.imagearr.indexOf(this.zoomimg);
    if(idx > 0)
      idx = idx-1;
    this.zoomimg = this.imagearr[idx];
    this.chkindex();
  }

  nextimg(){
    let total = this.imagearr.length;
    let idx = this.imagearr.indexOf(this.zoomimg);
    if(idx < total)
      idx = idx+1;
    this.zoomimg = this.imagearr[idx];
    this.chkindex();
  }

  chkindex(){
    let total = this.imagearr.length;
    let idx = this.imagearr.indexOf(this.zoomimg);
    this.showleft=1;
    this.showright=1;
    if(idx==0){
      this.showleft=0;
    }
    if(idx==(total-1)){
      this.showright=0;
    }
  }

}