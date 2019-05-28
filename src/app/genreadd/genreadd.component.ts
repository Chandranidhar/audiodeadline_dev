import { Component, OnInit,TemplateRef } from '@angular/core';
import {SignupComponent} from '../signup/signup.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Commonservices} from '../app.commonservices';
// import {Http} from '@angular/http';
import {GenrelistComponent} from "../genrelist/genrelist.component";
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-genreadd',
  templateUrl: './genreadd.component.html',
  styleUrls: ['./genreadd.component.css'],
    providers: [Commonservices]
})
export class GenreaddComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public is_error;
    public serverurl;
    modalRef:BsModalRef;
    public idx;
    public genrelist;
    public generelistpage;
    public genrelistarray:any=[];

  constructor(fb: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private modalService:BsModalService,public genrelistpage:GenrelistComponent) {
      this.fb = fb;
      this.serverurl=_commonservices.url;
      this.generelistpage=genrelistpage;
  }

  ngOnInit() {
      this.dataForm = this.fb.group({
          genrename: ["", Validators.required],
          type: ["", Validators.required],
      });
  }


    dosubmit(formval){
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }

        if (this.dataForm.valid) {
            var link = this.serverurl+'addgenre';
            var data = {
                genrename: formval.genrename,
                type: formval.type,
            };

            this._http.post(link, data)
                .subscribe(res => {
                    let result:any;
                    result = res;
                    if(result.status=='success'){
                        this.generelistpage.modalRef.hide();
                        this.generelistpage.getgenrelist();
                        // this.router.navigate(['/genre-list']);
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
