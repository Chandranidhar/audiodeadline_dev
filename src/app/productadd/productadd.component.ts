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
  public attributes = { color: [], size: []};
  public is_error;
  public serverurl;
  public apiUrl: any;
  public categoryList:any;
  public showDiv: any = false;
  public featuredImage: any = { imageUrl: null, progressBar: 0 };
  public othersImage: any = [];
  public imageName: any = [];
  public otherImageCount: number = -1;
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
          "featured_image": this.featuredImage.imageUrl,
          "others_image":    this.imageName,
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
          this.featuredImage.progressBar = 0;
          this.featuredImage.imageUrl = this.imageUploadPath + result.data.filename;
          break;
        default:
          console.log("An error occord.");
          break;
        }
    }, error => {
      console.log("An error occord.");
    });
  }

  /* upload others image */
  onOthersChange(event) {
    var imageData: any = [];
    
    if (event.target.files.length > 0) {
      imageData = event.target.files[0];
      this.otherImageCount++;

      this.othersImage[this.otherImageCount] = { progressBar: 0, imageUrl: null };
      const formData = new FormData();
      formData.append('file', imageData);

      this.uploadService.upload(formData).subscribe(res => {
        let result:any;
        result = res;
        switch(result.status) {
          case 'progress':
            this.othersImage[this.otherImageCount].progressBar = result.data;
            break;
          case 'complete':
            this.othersImage[this.otherImageCount].progressBar = 100;
            imageData = null;
            this.othersImage[this.otherImageCount].imageUrl = this.imageUploadPath + result.data.filename;
            this.imageName[this.otherImageCount] = this.imageUploadPath + result.data.filename;
            break;
          default:
            console.log("An error occord.");
            break;
        }
      }, error => {
        console.log("An error occord.");
      });
    }
  }

  /* delete others image */
  deleteOthersImage(arrayIndex) {
    let r = confirm('do you want to delete this image ?');
    if(r){
      this.imageName.splice(arrayIndex, 1);
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
    let val = this.createProductForm.value.attribute;
    if(this.createProductForm.value.attributeValue) {
      switch(val) {
        case 'size':
          this.attributes.size.push({ "value": this.createProductForm.value.attributeValue });
          this.createProductForm.value.attribute = "";
          this.createProductForm.value.attributeValue = null;
          this.createProductForm.patchValue({ 
            attribute:      "",
            attributeValue: null,
          });
          this.showDiv = false;
          break;
        case 'color':
          //this.attributes.color.push({ "value": this.createProductForm.value.attributeValue });
          this.createProductForm.value.attribute = "";
          this.createProductForm.value.attributeValue = null;
          this.createProductForm.patchValue({ 
            attribute:      "",
            attributeValue: null,
          });
          this.showDiv = false;
          break;
      }
    } else {
      alert('Invalid value.');
    }
  }

  deleteAttribute(arr, arrIndex) {
    let r = confirm('Are you sure?');
    if(r) {
      switch(arr) {
        case 'color':
          this.attributes.color.splice(arrIndex, 1);
          break;
        case 'size':
            this.attributes.size.splice(arrIndex, 1);
            break;
      }
    }
  }

}
