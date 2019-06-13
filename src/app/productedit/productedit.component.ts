import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Commonservices} from "../app.commonservices";
import { HttpClient } from '@angular/common/http';
import { ContactusOldComponent } from 'app/contactus-old/contactus-old.component';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css'],
  providers: [Commonservices]
})
export class ProducteditComponent implements OnInit {

  public editProductForm: FormGroup;
  public formBuilder;
  public attributes = { color: [], size: []};
  public is_error;
  public serverurl;
  public apiUrl: any;
  public productid;
  public categoryList: any;
  public showDiv = false;
  public featuredImage: any = { imageUrl: null, progressBar: 0 };
  public othersImage: any = [];
  public imageName: any;
  public otherImageCount: number = -1;
  public imageUploadPath = 'http://developmentapi.audiodeadline.com/nodeserver/uploads/test/';

  constructor(FormBuilder: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private route:ActivatedRoute, private uploadService: UploadService) {
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
      featuredImage:  [ null, null ],
      othersImage:    [ null, null ],
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
      this.editProductForm.patchValue({ 
        name:         result.res[0].name,
        category:     result.res[0].category,
        description:  result.res[0].description,
        price:        result.res[0].price.toString(),
      });
      this.attributes = result.res[0].attribute;
      this.featuredImage.imageUrl = result.res[0].featured_image;
      
      this.imageName = result.res[0].others_image;
      for(let loop = 0; loop < this.imageName.length; loop++) {
        this.othersImage.push({ imageUrl: this.imageName[loop], progressBar: 100 });
      }
      this.otherImageCount = this.imageName.length - 1;
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
          "id":             this.productid,
          "name":           formValue.name,
          "category":       formValue.category,
          "featured_image": this.featuredImage.imageUrl,
          "others_image":   this.imageName,
          "description":    formValue.description,
          "price":          formValue.price,
          "attribute":      this.attributes,
          "status":         formValue.status,
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
            console.log("Uploading...");
            break;
        }
      }, error => {
        console.log("An error occord.2");
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

  /* getb all category */
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
    let val = this.editProductForm.value.attribute;
    if(this.editProductForm.value.attributeValue) {
      switch(val) {
        case 'size':
          this.attributes.size.push({ "value": this.editProductForm.value.attributeValue });
          this.editProductForm.value.attribute = "";
          this.editProductForm.value.attributeValue = null;
          this.editProductForm.patchValue({ 
            attribute:      "",
            attributeValue: null,
          });
          this.showDiv = false;
          break;
        case 'color':
          // this.attributes.color.push({ "value": this.editProductForm.value.attributeValue });
          this.editProductForm.value.attribute = "";
          this.editProductForm.value.attributeValue = null;
          this.editProductForm.patchValue({ 
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
