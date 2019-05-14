import {Component, OnInit, TemplateRef} from '@angular/core';
import {CommunitysignupComponent} from '../communitysignup/communitysignup.component';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {Commonservices} from '../app.commonservices';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import { CookieService } from 'ngx-cookie-service';
declare var $:any;
@Component({
    selector: 'app-ticketsale',
    templateUrl: './ticketsale.component.html',
    styleUrls: ['./ticketsale.component.css'],
    providers: [Commonservices]
})

export class TicketsaleComponent implements OnInit {
    public modalRef: BsModalRef;
    public dataForm: FormGroup;
    private userdata: CookieService;
    private fb;
    public serverurl;
    public state;
    public flg:any=0;
    public montharr;
    public yeararr;
    public affiliate1;
    public affiliate2;
    public affiliate3;
    public media;
    public sponsor;
    public banner1;
    public banner2;
    public banner3;
    public promoerror;
    public promosuccess;
    public promomsg;
    public is_error;
    public chkerror;
    public productid;
    public productprice;
    public amount:any;
    public disamount;
    public promocode;
    public siteurl;
    public paymenterror;
    public uploadfolder;
    public fileurl;
    public guestcheckoutflag:any = 0;
    public testmode:boolean;
    public tokens:any=[];
    public intval:any;
    public tokenflag=0;
    public qty:any = 1;
    public price:any = 9.95;
    public subtotal:any = 9.95;
    public subtotal_after_promo:any = 9.95;
    public promotype:any = '';
    public disamount1:any=0;

    constructor(fb: FormBuilder,private _http: HttpClient, public _commonservices : Commonservices,private route:ActivatedRoute,private router: Router,private modalService: BsModalService, userdata: CookieService) {

        this.userdata =userdata;
        /*console.log("this.userdata.get('userdetails')");
         console.log(this.userdata.get('userdetails'));
         console.log("this.userdata.get('user_id')");
         console.log(this.userdata.get('user_id'));*/
        console.log(this.userdata.get('user_id'));


        this.paymenterror = '';
        this.testmode = false;
        this.guestcheckoutflag = 0;
        var reg = /[^/\\]+/;
        var routname = this.router.url.match(reg);
        if(typeof (routname[0]) != 'undefined' && routname[0] == 'ticket-sale-test'){
            this.testmode = true;
        }
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
        // this.siteurl=_commonservices.siteurl;
        this.siteurl=_commonservices.phpurl;
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
        this.gettokens();

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
        this.banner3 = '';

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
                        if(result1.status == 'success' && typeof (result1.item[0]) != 'undefined'){
                            this.banner1 = result1.item[0].image;
                            this.banner2 = result1.item[0].image2;
                            this.banner3 = result1.item[0].image3;
                        }
                    }, error => {
                        console.log("Oooops!");
                    });
            }

            if(this.affiliate1 != ''){
                this.getAffParent();
            }
            console.log(this.route.snapshot.url[0].path);
            if(params.param1==null || typeof (params.param1)=='undefined'){     //for grab url link, where parent is in url
if(this.route.snapshot.url[0].path!='ticket-sale' && this.route.snapshot.url[0].path!= 'ticket-sale-test'){

    this.affiliate1 = this.route.snapshot.url[0].path;
    this.getAffParent();
    console.log('params blank');
}


            }

        });
    }

    /*for checking if parent exists for email id, if exists, then it will modify the parent (priority wise ;it is original parent)*/

    getaffdetailsbyemail(email:any){

        let link = this._commonservices.nodeurl2+'datalist';
        //let link = 'http://developmentapi.audiodeadline.com:3008/datalist';
        // let emailstring = email.toString();
        let emailstring = email;
        console.log(emailstring);
        this._http.post(link,{"source": "user","condition":{email:emailstring}})
            .subscribe(val=>{

                let result:any ;
                result = val;
                console.log('frhduyi');
                 console.log(result.res);

                if(result.res == null || result.res.length==0 ){
                    this.getAffParent();
                }
                if(result.res!=null && result.res.length>0){
                    let p_init = result.res[0].parent;
                    this.affiliate1=p_init;
                    this.getAffParent();
                }
            });


    }

    increseqty(){
        let tval=this.dataForm.controls['qty'].value;
        this.dataForm.controls['qty'].patchValue(tval+1);
        this.qty = this.dataForm.controls['qty'].value;
        this.subtotal = (this.productprice*this.qty).toFixed(2);
        this.subtotal_after_promo = this.subtotal;


        if(this.promotype == 'flat'){

            this.disamount = this.disamount1.toFixed(2);
            // this.amount = (this.productprice - this.disamount);
            this.subtotal_after_promo = (this.subtotal - this.disamount);
            this.subtotal_after_promo = this.subtotal_after_promo.toFixed(2);
            this.amount = this.subtotal_after_promo;
            // this.disamount = result.item.amount;

        }
        if(this.promotype == 'percentage'){

            this.disamount = ((this.subtotal*this.disamount1)/100);
            this.disamount = this.disamount.toFixed(2);
            this.subtotal_after_promo = (this.subtotal_after_promo - this.disamount);
            this.subtotal_after_promo = this.subtotal_after_promo.toFixed(2);
            this.amount = this.subtotal_after_promo;
        }


    }
    decreseqty(){
        let tval=this.dataForm.controls['qty'].value;
        if(tval>1)this.dataForm.controls['qty'].patchValue(tval-1);
        this.qty = this.dataForm.controls['qty'].value;
        this.subtotal = (this.productprice*this.qty).toFixed(2);
        this.subtotal_after_promo = this.subtotal;


        if(this.promotype == 'flat'){

            this.disamount = this.disamount1.toFixed(2);
            // this.amount = (this.productprice - this.disamount);
            this.subtotal_after_promo = (this.subtotal - this.disamount);
            this.subtotal_after_promo = this.subtotal_after_promo.toFixed(2);
            this.amount = this.subtotal_after_promo;
            // this.disamount = result.item.amount;

        }
        if(this.promotype == 'percentage'){

            this.disamount = ((this.subtotal*this.disamount1)/100);
            this.disamount = this.disamount.toFixed(2);
            this.subtotal_after_promo = (this.subtotal_after_promo - this.disamount);
            this.subtotal_after_promo = this.subtotal_after_promo.toFixed(2);
            this.amount = this.subtotal_after_promo;
        }
    }

    gettokens(){
        let link2=this._commonservices.url+'mytoken';
        if(this.userdata.get('user_id')!=null && this.userdata.get('user_id')!='') {
            this._http.post(link2, {_id: this.userdata.get('user_id')})
                .subscribe(res => {
                    let result1:any;
                    result1 = res;
                    //console.log('mytokens ..');
                   // console.log(result1.item);
                    let resval:any = [];
                    let resvalarr:any = [];
                    for (let v in result1.item) {
                        if (resval.indexOf(result1.item[v].token) == -1) resvalarr.push(result1.item[v]);
                        resval.push(result1.item[v].token);
                    }
                    this.tokens = [];
                    //console.log('resvalarr');
                   // console.log(resvalarr);
                    this.tokens = resvalarr;
                }, error => {
                    console.log("Oooops!");
                });
        }
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
            email: ["", TicketsaleComponent.validateEmail],
            phone: ["", Validators.required],
            cardnumber: [""],
            expmon: [""],
            expyear: [""],
            cvv: [""],
            qty: [1],
            promocode: [""],
            accepttermscond: [false],
        });

        if(!this.testmode){
            this.dataForm.controls['cardnumber'].setValidators(Validators.required);
            this.dataForm.controls['expmon'].setValidators(Validators.required);
            this.dataForm.controls['expyear'].setValidators(Validators.required);
            this.dataForm.controls['cvv'].setValidators(Validators.required);
        }

        /*for checking if parent exists in cookie*/
        let userdetails:any;
        userdetails=JSON.parse(this.userdata.get('userdetails'));
        let parent = userdetails.parent;
        if(parent!=''){
           // console.log('in cookie');
            this.affiliate1=parent;
            //console.log(this.affiliate1);
            this.getAffParent();

        }
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
        this.amount = (this.productprice*this.qty).toFixed(2);
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
                        this.promotype=result.item.type;
                        if(result.item.type == 'flat'){
                            this.promomsg = 'Flat $'+result.item.amount+' discount.';
                            this.disamount1 = result.item.amount;
                            this.disamount = this.disamount1.toFixed(2);
                            // this.amount = (this.productprice - this.disamount);
                            this.amount = (this.amount - this.disamount);
                            this.amount = this.amount.toFixed(2);
                            this.subtotal_after_promo= this.amount;

                        }
                        if(result.item.type == 'percentage'){
                            this.promomsg = result.item.amount+'% discount.';
                            this.disamount1 = result.item.amount;
                            this.disamount = ((this.amount*this.disamount1)/100);
                            this.disamount = this.disamount.toFixed(2);
                            this.amount = (this.amount - this.disamount);
                            this.amount = this.amount.toFixed(2);
                            this.subtotal_after_promo= this.amount;

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
        else {

            this.disamount = 0.00;
        }
    }

    loginmodalold(){
        if(this.tokens.length<1)this.gettokens();
        this.flg=0;
        let ld:any=document.querySelector('.logmodal');
        let ld1:any=document.querySelector('.modal');
        let ld2:any=document.querySelector('.modal-backdrop');
        //let ld1:any=document.querySelector('.modal');
        ld.style.visibility = 'hidden';
        ld1.style.visibility = 'hidden';
        ld2.style.visibility = 'hidden';
        //alert(4);
    }

    continueasguest(formval,temp1,temp2,ques1){
        this.guestcheckoutflag=1;
        this.modalRef.hide();
        this.dosubmit(formval,temp1,temp2,ques1);
    }
    setcardval(val:any){
        //console.log('val');
        //console.log(val);
        let cvvcls:any=document.querySelectorAll('.cvvcls');
        //cvvcls.style.visibility='hidden';
        if(val.type==null) {
            this.dataForm.controls['cardnumber'].patchValue(val.token);
            this.dataForm.controls['cvv'].patchValue('123');
            $('.cvvcls').hide();
            this.tokenflag=1;
        }else{
            this.tokenflag=0;
            this.dataForm.controls['cardnumber'].patchValue('');
            this.dataForm.controls['cvv'].patchValue('');
            $('.cvvcls').show();
        }
    }
    loginmodal(temp1){

        this.closep();
        this.flg=1;

        this.intval = setInterval(() => {
            if(this.tokens.length<1)this.gettokens();
            //console.log(this.userdata.get('userdetails'));
            if(this.userdata.get('userdetails')!=null && this.userdata.get('userdetails')!=''){
            //    console.log(JSON.parse(this.userdata.get('userdetails')));
                let vdata=(this.userdata.get('userdata'));
                //console.log(vdata);
                //console.log(vdata.email);
                this.dataForm.controls['email'].patchValue(this.userdata.get('user_email'));
            }
            if(this.tokens.length>0) clearInterval(this.intval);
        }, 2000);
        //this.modalRef = this.modalService.show(temp1);
    }

    dosubmit(formval,template: TemplateRef<any>,loadtemplate: TemplateRef<any>,guestcheckout: TemplateRef<any>){
        /*if(this.testmode){

            console.log(111);
            this.dosubmit1(formval,template,loadtemplate,guestcheckout);
        }else {
            this.dosubmit2(formval,template,loadtemplate,guestcheckout);
        }*/
      this.dosubmit1(formval,template,loadtemplate,guestcheckout);
    }
    dosubmit1(formval,template: TemplateRef<any>,loadtemplate: TemplateRef<any>,guestcheckout: TemplateRef<any>) {
        console.log(333);
        this.paymenterror = '';
        this.is_error = 0;
        this.chkerror = 0;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
       // console.log('this.dataForm.valid');
        // console.log(this.dataForm.valid);
        // console.log(this.dataForm.value);
        if (this.dataForm.valid) {
            if ((formval.accepttermscond == false || formval.accepttermscond == 0)) {
                this.chkerror = 1;
                this.dataForm.controls['accepttermscond'].setErrors({'incorrect': true});
                return false;
            }else{
                this.modalRef = this.modalService.show(loadtemplate);
               // console.log('valid');


                let cardnumber = 'XXXX';
                let transactionId = '';
                let token = '';
                //console.log(this.amount);

                 let qty:any=this.dataForm.controls['qty'].value;
               // let qty:any=this.qty;
                this.amount=((this.amount)*(Number(qty)));
                var link = this.serverurl+'ticketsale';
                var data = {
                    firstname: formval.firstname,
                    lastname: formval.lastname,
                    address: formval.address,
                    city: formval.city,
                    qty: formval.qty,
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
                    amount: this.amount.toFixed(2),
                    disamount: this.disamount,
                    transactionId: transactionId,
                    token: token,
                    mode:'Test'
                };
                let p=0;
                if (p==0) {
                    this._http.post(link, data)
                        .subscribe(res => {
                            let result:any;
                            result = res;
                            if(result.status == 'success'){
                                this.modalRef.hide();
                                this.amount=0;
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
                                this.amount=0;
                                this.disamount=0;
                                this.qty=1;
                                this.subtotal=this.productprice;
                                this.subtotal_after_promo=this.productprice;

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
                }

            }
        }
    }
    dosubmit2(formval,template: TemplateRef<any>,loadtemplate: TemplateRef<any>,guestcheckout: TemplateRef<any>){
        let p=0;
        console.log(444);
        this.paymenterror = '';
        this.is_error = 0;
        this.chkerror = 0;
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }

       /* console.log('formval');
        console.log(formval);
        console.log(this.dataForm.valid);*/

        if (this.dataForm.valid) {
            // console.log('this.userdata.get('user_id')');
            // console.log(this.userdata.get('userdetails'));
            if((this.userdata.get('user_id')!=null && this.userdata.get('user_id')!='') || this.guestcheckoutflag==1){

                if ((formval.accepttermscond == false || formval.accepttermscond == 0)) {
                    this.chkerror = 1;
                    this.dataForm.controls['accepttermscond'].setErrors({'incorrect': true});
                    return false;
                } else {


                    this.modalRef = this.modalService.show(loadtemplate);
                    let link1:any='';
                    if(this.tokenflag==0)link1 = this.siteurl+'payment.php';
                    if(this.tokenflag==1)link1 = this.siteurl+'tokenpayment.php';
                    let qty=this.dataForm.controls['qty'].value;


                   // let qty=this.qty;
                    //this.amount=((this.amount)*Number(qty));

                    var data1:any = {firstname: formval.firstname,lastname: formval.lastname,state: formval.state,zip: formval.zip,address: formval.address,city: formval.city,phone: formval.phone,email: formval.email,amount:this.amount,cardnumber: formval.cardnumber,expmon: formval.expmon,expyear: formval.expyear,cvv: formval.cvv};
                    /*console.log('data1.firstname');
                    console.log(data1.firstname);
                    console.log(data1);*/

                    if (p==0 && data1.firstname!=null) {
                        this._http.post(link1, data1)
                            .subscribe(res1 => {
                                let result1:any;
                                result1 = res1;
                                if (result1.status == 'Approved') {

                                    let cardnumber = formval.cardnumber.slice(-4);
                                    let transactionId = result1.transactionId;
                                    let token = result1.token;

                                    var link = this.serverurl + 'ticketsale';
                                    var data = {
                                        firstname: formval.firstname,
                                        lastname: formval.lastname,
                                        address: formval.address,
                                        city: formval.city,
                                        state: formval.state,
                                        qty: formval.qty,
                                        zip: formval.zip,
                                        email: formval.email,
                                        phone: formval.phone,
                                        cardtype: this.GetCardType(formval.cardnumber),
                                        cardnumber: cardnumber,
                                        promocode: this.promocode,
                                        affiliate1: this.affiliate1,
                                        affiliate2: this.affiliate2,
                                        affiliate3: this.affiliate3,
                                        media: this.media,
                                        sponsor: this.sponsor,
                                        productid: this.productid,
                                        subamount: this.productprice.toFixed(2),
                                        amount: this.amount,
                                        disamount: this.disamount,
                                        transactionId: transactionId,
                                        token: token,
                                        mode: 'Live'
                                    };
                                    /*console.log('data');
                                    console.log(data);*/

                                    if (p==0) {

                                        this._http.post(link, data)
                                            .subscribe(res => {
                                                let result:any;
                                                result = res;
                                                if (result.status == 'success') {
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
                                                    this.amount=0;
                                                    this.disamount=0;
                                                    this.qty=1;
                                                    this.subtotal=this.productprice;
                                                    this.subtotal_after_promo=this.productprice;

                                                    for (x in this.dataForm.controls) {
                                                        this.dataForm.controls[x].markAsUntouched();
                                                    }
                                                } else {
                                                    this.is_error = result.msg;
                                                }
                                            }, error => {
                                                console.log("Oooops!");
                                                this.modalRef.hide();
                                            });
                                    }

                                } else {
                                    this.paymenterror = result1.msg;
                                    this.modalRef.hide();
                                }
                                //console.log(result1);
                            }, error => {
                                console.log("Oooops!");
                                this.modalRef.hide();
                            });
                    }
                }
            }
            else {
                this.modalRef = this.modalService.show(guestcheckout);
            }
        }
    }

    closep(){
        this.modalRef.hide();
    }
    closemodal(guestcheckout){
        //this.modalService.hide(guestcheckout);
        this.modalRef = this.modalService.show(guestcheckout);
        this.modalRef.hide();
    }
    GetCardType(number)
    {
        // visa
        var re = new RegExp("^4");
        if (number.match(re) != null)
            return "Visa";

        // Mastercard
        // Updated for Mastercard 2017 BINs expansion
        if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
            return "Mastercard";

        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null)
            return "AMEX";

        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null)
            return "Discover";

        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null)
            return "Diners";

        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null)
            return "Diners - Carte Blanche";

        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null)
            return "JCB";

        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null)
            return "Visa Electron";

        return "";
    }
    scrolltop(){

        $('html, body').animate({
            scrollTop: $(".ticket_sale_block2form_block1").offset().top
        }, 1000);
    }
}
