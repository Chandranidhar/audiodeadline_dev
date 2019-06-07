import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Commonservices } from "../app.commonservices";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { UploadService } from '../upload.service';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css'],
  providers: [Commonservices]
})

export class ProductaddComponent implements OnInit {

  public createProductForm: FormGroup;
  public formBuilder;
  public attributes: any = [];
  public is_error;
  public serverurl;
  public apiUrl: any;
  public categoryList:any;
  public showDiv: any = false;
  public featuredImage: any = { featuredImageProgress: false, featuredImageView: false, featuredImageName: null, progressBar: 0 };
  public othersImage: any = [];
  public imageUploadPath = 'http://developmentapi.audiodeadline.com/nodeserver/uploads/test/';

  constructor( FormBuilder: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router, private uploadService: UploadService ) {
    this.formBuilder  = FormBuilder;
    this.serverurl    = _commonservices.url;
    this.apiUrl       = _commonservices.nodesslurl;
  }

  ngOnInit() {
    /* form builder and validate rule */
    this.createProductForm = this.formBuilder.group({
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
  }

  /* function for validate */
  get createProductFormValidate() { return this.createProductForm.controls; }

  /* submit create product form */
  createProductFormSubmit() {
    let x: any;
    for (x in this.createProductForm.controls) {
      this.createProductForm.controls[x].markAsTouched();
    }

    if (this.createProductForm.valid) {
      /* if form valid then set data and url to submited the form */
      var link = this.apiUrl + 'addorupdatedata';
      let formValue: any = this.createProductForm.value;
      var data = {
        "source": "product",
        "data": {
          "name":           formValue.name,
          "category":       formValue.category,
          "featured_image": this.imageUploadPath + this.featuredImage.featuredImageName,
          "others_image":    this.othersImage[0].othersImageName,
          "description":    formValue.description,
          "price":          formValue.price,
          "attribute":      this.attributes,
          "sort_order":     0,
          "status":         1,
        },
        "sourceobj":["category"]
      };

      this._http.post(link, data).subscribe(res => {
        let result:any;
        result = res;
        if(result.status == 'success'){
          this.router.navigate(['/product-list']);
        } else {
          this.is_error = result.msg;
        }
      }, error => {
        console.log("Oooops!");
      });
    }
  }

  /* for upload image file */
  onImageChange(event) {
    var imageData: any = null;
    this.featuredImage.featuredImageProgress = true;

    if (event.target.files.length > 0) {
      imageData = event.target.files[0];
    }

    const formData = new FormData();
    formData.append('file', imageData);

    this.uploadService.upload(formData).subscribe(res => {
      let result:any;
      result = res;
      switch(result.status) {
        case 'progress':
          this.featuredImage.progressBar = result.data;
          break;
        case 'complete':
          this.featuredImage.progressBar = 100;
          this.featuredImage.featuredImageName = result.data.filename;
          this.featuredImage.featuredImageView = true;
          this.featuredImage.featuredImageProgress = false;
          break;
        default:
            console.log(result.data);
          break;
      }
    }, error => {
      console.log("AN error occord.");
    });
  }

  /* upload others image */
  onOthersChange(event) {
    var imageData: any = [];
    
    if (event.target.files.length > 0) {
      for(let loop = 0; loop < event.target.files.length; loop++) {
        imageData = event.target.files[loop];

        this.othersImage[loop] = { progressBar: 0, othersImageName: null, };
        const formData = new FormData();
        formData.append('file', imageData);

        this.uploadService.upload(formData).subscribe(res => {
          let result:any;
          result = res;
          switch(result.status) {
            case 'progress':
              this.othersImage[loop].progressBar = result.data;
              break;
            case 'complete':
              this.othersImage.progressBar = 100;
              imageData = null;
              this.othersImage[loop].othersImageName = this.imageUploadPath + result.data.filename;
              break;
            default:
                console.log(result.data);
              break;
          }
        }, error => {
          console.log("AN error occord.");
        });
      }
    }
  }

  /* delete others image */
  deleteOthersImage(arrayIndex) {
    let r = confirm('do you want to delete this image ?');
    if(r){
      this.othersImage.splice(arrayIndex, 1);
    }
  }

  getCategoryData() {
    /* set api link and submited data */
    let link = this.apiUrl + 'datalist';
    let data = { "source": "categorylist_view" };

    /* process to hit the server and get data */
    this._http.post(link, data).subscribe( response => {
      let result:any = response;
      this.categoryList = result.res;
    }, error => {
      this.categoryList = [];
    });
  }

  changeAttribute() {
    let val = this.createProductForm.value.attribute;
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
    if(this.createProductForm.value.attributeValue) {
      this.attributes.push({ "name": this.createProductForm.value.attribute, "value": this.createProductForm.value.attributeValue });
      this.createProductForm.value.attribute = "";
      this.createProductForm.value.attributeValue = null;
      this.createProductForm.patchValue({ 
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
