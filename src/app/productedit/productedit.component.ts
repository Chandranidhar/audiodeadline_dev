import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";
import { HttpClient } from '@angular/common/http';
import { ContactusOldComponent } from 'app/contactus-old/contactus-old.component';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css'],
  providers: [Commonservices]
})
export class ProducteditComponent implements OnInit {

  public editProductForm: FormGroup;
  public formBuilder;
  public attributes: any = [];
  public is_error;
  public serverurl;
  public apiUrl: any;
  public productid;
  public categoryList: any;
  public showDiv = false;

  constructor(FormBuilder: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private route:ActivatedRoute) {
    this.formBuilder  = FormBuilder;
    this.serverurl    =_commonservices.url;
    this.apiUrl       = _commonservices.nodesslurl;

    /* get id from url */
    this.route.params.subscribe(params=>{
      this.productid = params['id'];
    });

  }

  ngOnInit() {
    /* form builder and validate rule */
    this.editProductForm = this.formBuilder.group({
      name:           [ null, [ Validators.required, Validators.maxLength(100) ] ],
      category:       [ "", [ Validators.required ] ],
      featuredImage:  [ null, [ Validators.required ] ],
      othersImage:    [ null, [ Validators.required ] ],
      description:    [ null, [ Validators.required, Validators.maxLength(1000) ] ],
      price:          [ null, [ Validators.required, Validators.max(10000000000) ] ],
      attribute:      [ "", null ],
      attributeValue: [ null, null ],
      autoComplete:   [ null, null ]
    });

    /* get category list for view category in dropdown */
    this.getCategoryData();
    /* get product details */
    this.getProductDetails();
  }

  /* function for validate */
  get editProductFormValidate() { return this.editProductForm.controls; }

  /* to get product details */
  getProductDetails(){
    /* set url and data to submit the form */
    var link = this.apiUrl + 'datalist';
    var data = {  
                  "source": "product",
                  "condition": { _id: this.productid }
                };

    this._http.post(link, data).subscribe(response => {
      let result:any;
      result = response;
      console.log(result);
      this.editProductForm.patchValue({ 
        name:         result.res[0].name,
        category:     result.res[0].category,
        description:  result.res[0].description,
        price:        result.res[0].price.toString(),
      });
      this.attributes = result.res[0].attribute;
    },error => {
      console.log("Oooops!");
    });
  }

  /* update product details form submit */
  updateProductFormSubmit() {
    let x: any;
    for (x in this.editProductForm.controls) {
      this.editProductForm.controls[x].markAsTouched();
    }

    if (this.editProductForm.valid) {
      var link = this.apiUrl + 'addorupdatedata';
      let formValue: any = this.editProductForm.value;
      var data = {
        "source": "product",
        "data": {
          "id":           this.productid,
          "name":         formValue.name,
          "category":     formValue.category,
          "description":  formValue.description,
          "price":        formValue.price,
          "attribute":    this.attributes,
          "status":       formValue.status,
        },
        "sourceobj":["category"]
      };

      this._http.post(link, data).subscribe(res => {
        let result:any;
        result = res;
        if(result.status=='success'){
          this.router.navigate(['/product-list']);
        }
        else {
          alert('An error occord.');
          this.is_error= result.msg;
        }
      }, error => {
        console.log("Oooops!");
      });
    }
  }

  /* getb all category */
  getCategoryData() {
    /* set api link and submited data */
    let link = this.apiUrl + 'datalist';
    let data = { "source": "categorylist_view" };

    /* process to hit the server and get data */
    this._http.post(link, data).subscribe( response => {
      let result:any = response;
      this.categoryList = result.res;
      console.log(this.categoryList);
    }, error => {
      this.categoryList = [];
    });
  }

  changeAttribute() {
    let val = this.editProductForm.value.attribute;
    switch(val) {
      case 'size':
          this.showDiv = true;
        break;
      case 'color':
          this.showDiv = true;
        break;
      default:
          this.showDiv = false;
        break;
    }
  }
  
  addAttribute() {
    if(this.editProductForm.value.attributeValue) {
      this.attributes.push({ "name": this.editProductForm.value.attribute, "value": this.editProductForm.value.attributeValue });
      this.editProductForm.value.attribute = "";
      this.editProductForm.value.attributeValue = null;
      this.editProductForm.patchValue({ 
        attribute:      "",
        attributeValue: null,
      });
      this.showDiv = false;
    } else {
      alert('Invalid value.');
    }
  }

  deleteAttribute(arrIndex) {
    let r = confirm('Are you sure?');
    if(r) {
      this.attributes.splice(arrIndex, 1);
    }
  }

}
