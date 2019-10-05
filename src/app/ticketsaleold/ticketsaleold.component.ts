import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ticketsaleold',
  templateUrl: './ticketsaleold.component.html',
  styleUrls: ['./ticketsaleold.component.css'],
  providers: [Commonservices]
})
export class TicketsaleoldComponent implements OnInit {
  modalRef: BsModalRef;
  public dataForm: FormGroup;
  private fb;
  public serverurl;
  public state;
  public montharr;
  public yeararr;
  public affiliate1;
  public affiliate2;
  public affiliate3;
  public media;
  public sponsor;
  public banner1;
  public banner2;
  public promoerror;
  public promosuccess;
  public promomsg;
  public is_error;
  public chkerror;
  public productid;
  public productprice;
  public amount;
  public disamount;
  public promocode;
  public siteurl;
  public paymenterror;
  public uploadfolder;
  public fileurl;

  constructor(fb: FormBuilder,private _http: HttpClient, private _commonservices : Commonservices,private route:ActivatedRoute,private router: Router,private modalService: BsModalService) {
    this.paymenterror = '';
    this.amount = 0;
    this.disamount = 0;
    this.promocode = '';
    this.is_error = 0;
    this.chkerror = 0;
    this.promoerror=0;
    this.promosuccess=0;
    this.promomsg='';
    this.productid='5bb2163c785e0c0f2926c3fa';
    this.fb = fb;
    this.serverurl=_commonservices.url;
    this.siteurl=_commonservices.siteurl;
    this.uploadfolder = 'banner/';
    this.fileurl=_commonservices.fileurl;
    this.yeararr= [];
    this.montharr= [
      {'val': '01','label':'Jan'},
      {'val': '02','label':'Feb'},
      {'val': '03','label':'Mar'},
      {'val': '04','label':'Apr'},
      {'val': '05','label':'May'},
      {'val': '06','label':'Jun'},
      {'val': '07','label':'Jul'},
      {'val': '08','label':'Aug'},
      {'val': '09','label':'Sep'},
      {'val': '10','label':'Oct'},
      {'val': '11','label':'Nov'},
      {'val': '12','label':'Dec'}
    ];

    let cdate = new Date();
    let currentYear = cdate.getFullYear();

    for(let i=currentYear; i<=(currentYear+20);i++){
      this.yeararr.push({'val': i,'label':i});
    }

    var link=this.serverurl+'getusastates';
    this._http.get(link)
        .subscribe(res => {
          let result1:any;
          result1 = res;
          this.state = result1;
        }, error => {
          console.log("Oooops!");
        });

    var link = this.serverurl+'productdetails';
    var data = { _id: '5bb2163c785e0c0f2926c3fa'};

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
           result = res;
          if(result.status=='success') {
            this.productprice = result.item.price;
            this.amount = result.item.price;
          }
        }, error => {
          console.log("Oooops!");
        });


    this.affiliate1 = '';
    this.affiliate2 = '';
    this.affiliate3 = '';
    this.media = '';
    this.sponsor = '';
    this.banner1 = '';
    this.banner2 = '';

    this.route.params.subscribe(params=>{
      if(typeof (params.param1) != 'undefined'){
        let param1 = params.param1;
        if( param1.substring(0,7) == 'sponsor'){
          this.sponsor = param1.substring(8);
        }
        if( param1.substring(0,5) == 'media'){
          this.media = param1.substring(6);
        }
        if( param1.substring(0,9) == 'affiliate'){
          this.affiliate1 = param1.substring(10);
        }
      }
      if(typeof (params.param2) != 'undefined'){
        let param2 = params.param2;
        if( param2.substring(0,7) == 'sponsor'){
          this.sponsor = param2.substring(8);
        }
        if( param2.substring(0,5) == 'media'){
          this.media = param2.substring(6);
        }
        if( param2.substring(0,9) == 'affiliate'){
          this.affiliate1 = param2.substring(10);
        }
      }
      if(typeof (params.param3) != 'undefined'){
        let param3 = params.param3;
        if( param3.substring(0,7) == 'sponsor'){
          this.sponsor = param3.substring(8);
        }
        if( param3.substring(0,5) == 'media'){
          this.media = param3.substring(6);
        }
        if( param3.substring(0,9) == 'affiliate'){
          this.affiliate1 = param3.substring(10);
        }
      }

      if(this.media != ''){
        this.addMediaNoOfClick();
      }

      if(this.sponsor != '' && this.media != ''){
        console.log(this.sponsor);
        console.log(this.media);


        let link1=this.serverurl+'getsponsormedianew';
        var data1 = {
          media: this.media
        };

        this._http.post(link1,data1)
            .subscribe(res => {
              let result1:any;
               result1 = res;
              if(result1.status == 'success'){
                for(let n in result1.item){
                  let item = result1.item[n];
                  if(item.name.slice(-1) == 1){
                    this.banner1 = item.image;
                  }
                  if(item.name.slice(-1) == 2){
                    this.banner2 = item.image;
                  }
                }
              }
            }, error => {
              console.log("Oooops!");
            });
      }

      if(this.affiliate1 != ''){
        this.getAffParent();
      }

    });
  }

  addMediaNoOfClick(){
    var link =this.serverurl+'addMediaNoOfClick';
    var data = {mediaid:this.media};

    this._http.post(link, data)
        .subscribe(res => {
          console.log("Success!");
        },error => {
          console.log("Oooops!");
        });
  }

  getAffParent(){
    var link = this.serverurl+'getaffparent';
    var data = {
      affiliate: this.affiliate1
    };

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          if(result.status=='success') {
            this.affiliate2 = result.parent;
            if(this.affiliate2 != '' && result.ambassador == 1){
              this.getAffParent2();
            }
          }
        }, error => {
          console.log("Oooops!");
        });
  }

  getAffParent2(){
    var link = this.serverurl+'getaffparent';
    var data = {
      affiliate: this.affiliate2
    };

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          if(result.status=='success') {
            this.affiliate3 = result.parent;
          }
        }, error => {
          console.log("Oooops!");
        });
  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zip: ["", Validators.required],
      email: ["", TicketsaleoldComponent.validateEmail],
      phone: ["", Validators.required],
      cardnumber: ["", Validators.required],
      expmon: ["", Validators.required],
      expyear: ["", Validators.required],
      cvv: ["", Validators.required],
      promocode: [""],
      accepttermscond: [false],
    });
  }


  static validateEmail(control: FormControl){
    if(control.value==''){
      return { 'blankemail': true };
    }

    if ( !control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)){
      return { 'invalidemail': true };
    }
  }


  chkPromocode(){
    this.amount = this.productprice.toFixed(2);
    this.promoerror=0;
    this.promosuccess=0;
    this.promomsg='';

    let promoval = this.dataForm.controls['promocode'].value;
    if(promoval != ''){
      var link = this.serverurl+'chkpromocode1';
      var data = {
        promocode: promoval
      };

      this._http.post(link, data)
          .subscribe(res => {
            let result:any;
            result = res;
            if(result.status=='success') {
              this.promosuccess = 1;
              this.promocode = promoval;
              if(result.item.type == 'flat'){
                this.promomsg = 'Flat $'+result.item.amount+' discount.';
                this.disamount = result.item.amount;
                this.disamount = this.disamount.toFixed(2);
                this.amount = (this.productprice - this.disamount);
                this.amount = this.amount.toFixed(2);
              }
              if(result.item.type == 'percentage'){
                this.promomsg = result.item.amount+'% discount.';
                this.disamount = result.item.amount;
                this.disamount = ((this.productprice*this.disamount)/100);
                this.disamount = this.disamount.toFixed(2);
                this.amount = (this.productprice - this.disamount);
                this.amount = this.amount.toFixed(2);
              }
            }else{
              this.promoerror = 1;
              this.promomsg= result.msg;
              this.promocode = '';
            }
          }, error => {
            console.log("Oooops!");
          });
    }
  }

  dosubmit(formval,template: TemplateRef<any>,loadtemplate: TemplateRef<any>){
    this.paymenterror = '';
    this.is_error = 0;
    this.chkerror = 0;
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

    if (this.dataForm.valid) {
      if ((formval.accepttermscond == false || formval.accepttermscond == 0)) {
        this.chkerror = 1;
        this.dataForm.controls['accepttermscond'].setErrors({'incorrect': true});
        return false;
      } else {
        this.modalRef = this.modalService.show(loadtemplate);

        var link1 = this.siteurl+'payment.php';
        var data1 = {firstname: formval.firstname,lastname: formval.lastname,state: formval.state,zip: formval.zip,address: formval.address,city: formval.city,phone: formval.phone,email: formval.email,amount:this.amount,cardnumber: formval.cardnumber,expmon: formval.expmon,expyear: formval.expyear,cvv: formval.cvv};

        this._http.post(link1, data1)
            .subscribe(res1 => {
              let result1:any;
              result1 = res1;
              if(result1.status == 'Approved'){

                let cardnumber = formval.cardnumber.slice(-4);
                let transactionId = result1.transactionId;
                let token = result1.token;

                var link = this.serverurl+'ticketsale';
                var data = {
                  firstname: formval.firstname,
                  lastname: formval.lastname,
                  address: formval.address,
                  city: formval.city,
                  state: formval.state,
                  zip: formval.zip,
                  email: formval.email,
                  phone: formval.phone,
                  cardnumber: cardnumber,
                  promocode: this.promocode,
                  affiliate1: this.affiliate1,
                  affiliate2: this.affiliate2,
                  affiliate3: this.affiliate3,
                  media: this.media,
                  sponsor: this.sponsor,
                  productid: this.productid,
                  subamount: this.productprice,
                  amount: this.amount,
                  disamount: this.disamount,
                  transactionId: transactionId,
                  token: token
                };

                this._http.post(link, data)
                    .subscribe(res => {
                      let result:any;
                      result = res;
                      if(result.status == 'success'){
                        this.modalRef.hide();
                        this.modalRef = this.modalService.show(template);

                        this.dataForm.controls['firstname'].setValue('');
                        this.dataForm.controls['lastname'].setValue('');
                        this.dataForm.controls['address'].setValue('');
                        this.dataForm.controls['city'].setValue('');
                        this.dataForm.controls['state'].setValue('');
                        this.dataForm.controls['zip'].setValue('');
                        this.dataForm.controls['email'].setValue('');
                        this.dataForm.controls['phone'].setValue('');
                        this.dataForm.controls['cardnumber'].setValue('');
                        this.dataForm.controls['expmon'].setValue('');
                        this.dataForm.controls['expyear'].setValue('');
                        this.dataForm.controls['cvv'].setValue('');
                        this.dataForm.controls['promocode'].setValue('');
                        this.dataForm.controls['accepttermscond'].setValue(false);
                        this.promocode = '';
                        this.promosuccess = 0;
                        this.promoerror = 0;

                        for (x in this.dataForm.controls) {
                          this.dataForm.controls[x].markAsUntouched();
                        }
                      }else{
                        this.is_error= result.msg;
                      }
                    }, error => {
                      console.log("Oooops!");
                      this.modalRef.hide();
                    });



              }else{
                this.paymenterror = result1.msg;
                this.modalRef.hide();
              }
              console.log(result1);
            }, error => {
              console.log("Oooops!");
              this.modalRef.hide();
            });
      }
    }
  }

  closep(){
    this.modalRef.hide();
  }
}
