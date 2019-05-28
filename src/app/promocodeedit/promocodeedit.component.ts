import { Component, OnInit,Input } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {PromocodelistComponent} from '../../app/promocodelist/promocodelist.component';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
// import {Http} from "@angular/http";
import {Router, ActivatedRoute} from "@angular/router";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-promocodeedit',
  templateUrl: './promocodeedit.component.html',
  styleUrls: ['./promocodeedit.component.css'],
  providers: [Commonservices]
})
export class PromocodeeditComponent implements OnInit {
  public dataForm: FormGroup;
  public fb;
  public is_error;
  public serverurl;
  public promocodeid;
  public promolistpage;
  @Input()
  set obj(data: any) {
    this.promocodeid = (data) || '<no name set>';
    this.promocodeid = data;
    console.log(this.promocodeid);
    this.getPromoDetails();



    /*  console.log(this.postarr);
     console.log(postarr1);*/
  }
  constructor(fb: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private route:ActivatedRoute, public promocodelist:PromocodelistComponent) {
    this.fb = fb;
    this.serverurl=_commonservices.url;
    this.promolistpage = promocodelist;
/*
    this.route.params.subscribe(params=>{
      this.promocodeid = params['id'];
      this.getPromoDetails();
    });*/

  }

  ngOnInit() {
    this.dataForm = this.fb.group({
      promocode: ["", PromocodeeditComponent.validateUsername],
      description: ["", Validators.required],
      type: ["", Validators.required],
      amount: ["", PromocodeeditComponent.validateAmount],
      startdate: ["", Validators.required],
      enddate: ["", Validators.required]

    });
  }

  getPromoDetails(){
    // var link =this.serverurl+'promocodedetails';
    var link =this._commonservices.nodesslurl1+'promocodedetails';
    var data = {_id: this.promocodeid};

    this._http.post(link, data)
        .subscribe(res => {
          let result:any;
          result = res;
          if (result.status == 'success' && typeof(result.item) != 'undefined'){
            let userdet = result.item;
            this.dataForm.controls['promocode'].setValue(userdet.promocode);
            this.dataForm.controls['description'].setValue(userdet.description);
            this.dataForm.controls['type'].setValue(userdet.type);
            this.dataForm.controls['startdate'].setValue(userdet.startdate);
            this.dataForm.controls['enddate'].setValue(userdet.enddate);
            this.dataForm.controls['amount'].setValue(userdet.amount.toString());
          }
        },error => {
          console.log("Oooops!");
        });
  }


  static validateUsername(control: FormControl){
    if(control.value==''){
      return { 'blankprocode': true };
    }

    if ( !control.value.match(/^[A-Za-z0-9]*$/)){
      return { 'invalidprocode': true };
    }
  }

  static validateAmount(control: FormControl){
    if(control.value==''){
      return { 'blankamount': true };
    }


    /*  if(parseFloat(control.value) >= 100){
     return { 'maxamount': true };
     }*/

    if ( !control.value.match(/^[0-9\.]*$/)){
      return { 'invalidamount': true };
    }
  }

  dosubmit(formval) {
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
    }

    if (this.dataForm.valid) {
      // var link = this.serverurl+'updatepromocode';
      var link = this._commonservices.nodesslurl1+'updatepromocode';
      var data = {
        _id: this.promocodeid,
        promocode: formval.promocode,
        description: formval.description,
        type: formval.type,
        amount: formval.amount,
        startdate: formval.startdate,
        enddate: formval.enddate,
      };

      this._http.post(link, data)
          .subscribe(res => {
            let result:any;
            result = res;
            if(result.status=='success'){
              this.promolistpage.modalRef.hide();
              this.promolistpage.getPromocodeList();
              // this.router.navigate(['/promocode-list']);
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
