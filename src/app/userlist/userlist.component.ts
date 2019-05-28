import {Component, OnInit, TemplateRef} from '@angular/core';
import {Commonservices} from '../app.commonservices';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
    selector: 'app-userlist',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.css'],
    providers: [Commonservices]
})
export class UserlistComponent implements OnInit {
    public loadinglist: boolean;
    public p: number = 1;
    modalRef: BsModalRef;
    public serverurl;
    public userlist:any=[];
    public affiliateuserlist:any=[];
    public idx;
    public searchText;
    public searchByRole;
    public searchText2 = '';
    public username;
    public isadmin;
    public roles;
    public searchText3:any;


    public dataForm: FormGroup;
    public fb;


    constructor(fb: FormBuilder, private _commonservices: Commonservices, private _http: HttpClient, private modalService: BsModalService, userdata: CookieService, private router: Router,public activeRoute:ActivatedRoute) {
        this.searchText3='';
        this.fb = fb;
        this.serverurl = _commonservices.url;
        this.username = '';
        this.searchByRole = '';
        this.roles = [
            {
                key: 'musicians',
                val: 'Musician'
            },
            {
                key: 'dancer',
                val: 'Dancer'
            },
            {
                key: 'model',
                val: 'Model'
            },
            {
                key: 'signupaffiliate',
                val: 'Affiliate'
            },
            {
                key: 'fan',
                val: 'Fan'
            },
        ];

        let userdata2: any;
        userdata2 = userdata.get('userdetails');

        if (typeof (userdata2) == 'undefined' || userdata2 == '') {
            this.router.navigateByUrl('/login');
        } else {
            userdata2 = JSON.parse(userdata2);
            this.isadmin = userdata2.admin;
            if (this.isadmin == 0) {
                this.username = userdata2.username;
            }

           /* if(userdata2.signupaffiliate == 1){
                this.getaffiliateuserlist();

            }else {

                this.getUserList();
            }
*/
        }

    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            firstname: [""],
            lastname: [""],
            phone: [""],
            email: [""],
            username: [""],
            role: [""],
            address: [""],
            address2: [""],
            city: [""],
            state: [""],
            zip: [""],
            cardonfile: [""],
            expirydate: [""],
            csv: [""],
            currentpassword: [""],
            password: [""],
            confirmpassword: [""],
        });
        this.activeRoute.data.forEach((data)=>{
            console.log('json',data['results']);
            console.log(data);
            console.log(data['results']);
            let result=data['results'];
            console.log(result);
            this.userlist=result.res;
            console.log('Data');
            console.log(this.userlist);
        });


    }

    getUserList() {
        this.loadinglist = true;
        var link = this.serverurl + 'communityuserlist';
        //http://developmentapi.audiodeadline.com:3007/getaffileate
            var data = {type: 'user', isadmin: this.isadmin, username: this.username};

        this._http.post(link, data)
            .subscribe(res => {
                this.loadinglist = false;
                let result:any;
                result = res;
                this.userlist = result.res;
            }, error => {
                this.loadinglist = false;
                console.log("Oooops!");
            });
    }

    getaffiliateuserlist() {
        this.loadinglist = true;
        var link = this._commonservices.nodeurl1 + 'getaffileate';
        //http://developmentapi.audiodeadline.com:3007/getaffileate
            var data = {username: this.username};

        this._http.post(link, data)
            .subscribe(res => {
                this.loadinglist = false;
                let result:any;
                result = res;
                console.log(result);
                this.affiliateuserlist = result.data;
                //  this.userlist = result.res;
            }, error => {
                this.loadinglist = false;
                console.log("Oooops!");
            });
    }


    cngstatus(item) {
        var status = 1;
        if (typeof (item.status) != 'undefined')
            status = 1 - parseInt(item.status);
        var link = this.serverurl + 'cngstatus';
        var data = {_id: item._id, status: status};

        this._http.post(link, data)
            .subscribe(res => {
                item.status = status;
            }, error => {
                console.log("Oooops!");
            });
    }

    openDelModal(template: TemplateRef<any>, item) {
        this.idx = this.userlist.indexOf(item);
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: "modal-md"});
    }

    confirm(): void {
        var link = this.serverurl + 'deleteuser';
        var data = {_id: this.userlist[this.idx]._id};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if (result.status == 'success') {
                    this.userlist.splice(this.idx, 1);
                }
                this.modalRef.hide();
            }, error => {
                console.log("Oooops!");
                this.modalRef.hide();
            });
    }

    decline(): void {
        this.modalRef.hide();
    }

    cngChk(ev, item, type) {
        var tval = 0;
        var utype = type;
        if (ev.target.checked) {
            tval = 1;
        }

        var link = this.serverurl + 'changerole';
        var data = {_id: item._id, type: utype, tval: tval};
        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if (result.status == 'success') {
                    if (utype == 'musicians')
                        item.musicians = tval;
                    if (utype == 'dancer')
                        item.dancer = tval;
                    if (utype == 'model')
                        item.model = tval;
                    if (utype == 'signupaffiliate')
                        item.signupaffiliate = tval;

                    if (item.musicians == 1 || item.dancer == 1 || item.model == 1) {
                        this.cngChk2(item, 0);
                    }
                    if (item.musicians == 0 && item.dancer == 0 && item.model == 0) {
                        this.cngChk2(item, 1);
                    }


                }
            }, error => {
                console.log("Oooops!");
            });
    }

    cngChk2(item, tval) {
        var link = this.serverurl + 'changerole';
        var data = {_id: item._id, type: 'fan', tval: tval};
        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if (result.status == 'success') {
                    item.fan = tval;
                    console.log('success');
                }
            }, error => {
                console.log("Oooops!");
            });
    }


    openEditModal(template: TemplateRef<any>) {
        //noinspection TypeScriptValidateTypes
        this.modalRef = this.modalService.show(template, {class: 'modal-md edituser'});
    }
}


