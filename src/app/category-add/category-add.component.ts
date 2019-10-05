import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from "@angular/forms";
import { Commonservices } from "../app.commonservices";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoryListComponent } from "../category-list/category-list.component";
import { SavedcardsComponent } from 'app/savedcards/savedcards.component';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css'],
  providers: [ Commonservices ]
})
export class CategoryAddComponent implements OnInit {
  
  formHeader: string = 'Add New Category';
  buttonTitle: string = 'Save';
  categoryId:any = null;
  categoryAddFormData:any = [{ "title": null }];
  @Input() set id(data: any) {
    if(data) {
      this.formHeader = 'Update category';
      this.buttonTitle = 'Update';
      this.categoryId = data;
    }
  }
  categoryDataForEdit:any = null;

  loadinglist = true;
  addCategoryForm: FormGroup;
  addCategoryFormSubmited = false;
  public categoryList: any;
  public serverUrl:any;
  apiUrl:any;
  serverurl: any;
  public is_error: any;
  modalRef:BsModalRef;

  constructor( private formBuilder: FormBuilder, private _commonservices : Commonservices, private _http: HttpClient, private router: Router, public categoryListPage: CategoryListComponent, private modalService: BsModalService ) {
    this.serverUrl  = _commonservices.url;
    this.apiUrl     = _commonservices.nodesslurl;
  }

  ngOnInit() {
    /* category form validation */
    this.addCategoryForm = this.formBuilder.group({
      title:          [ null, [ Validators.required, Validators.maxLength(60) ] ],
      visible:        [ null, null ],
      parentCategory: [ 0, null ],
      sortNumber:     [ null, [ Validators.required ] ],
      description:    [ null, [ Validators.maxLength(500) ] ]
    });

    /* get category listing data */
    this.getCategoryData();
  }

  get addCategoryFormValidate() { return this.addCategoryForm.controls; }

  getCategoryData() {
    this.loadinglist = true;
    /* set api link and submited data */
    let link = this.apiUrl + 'datalist';
    let data = { "source": "categorylist_view" };

    /* process to hit the server and get data */
    this._http.post(link, data).subscribe( response => {
      let result:any = response;
      this.categoryList = result.res;
      this.loadinglist = false;

      /* if get categoryId then get the category details and populate into the form */
      if(this.categoryId) {
        this.getCategoryDetails();
      }

    }, error => {
      this.categoryList = [];
    });
  }

  getCategoryDetails() {
    this.loadinglist = true;
    /* set api link and submited data */
    let link = this.apiUrl + 'datalist';
    let data = { "source": "category", "condition": { "_id": this.categoryId } };

    /* process to hit the server and get single cataegory details */
    this._http.post(link, data).subscribe( response => {
      let result:any = response;
      this.categoryDataForEdit = result.res;
      this.addCategoryForm.patchValue({ 
                            title:          this.categoryDataForEdit[0].title,
                            visible:        this.categoryDataForEdit[0].visible,
                            parentCategory: this.categoryDataForEdit[0].parentid,
                            description:    this.categoryDataForEdit[0].description,
                            sortNumber:     this.categoryDataForEdit[0].sort_order,
                          });
      this.loadinglist = false;
    }, error => {
      console.log('An error occord.');
    });
  }

  addCategoryProcess() {
    this.addCategoryFormSubmited = true;

    /* checking validation */
    if (this.addCategoryForm.valid) {
      /* process to submit data into the server */
      let formValue: any = this.addCategoryForm.value;
      var visible: any = 0;
      if(formValue.visible == true) {
        visible = 1;
      }

      let link = this.apiUrl + 'addorupdatedata';
      var data = {
        "source": "category",
        "data": {
            "visible":      visible,
            "title":        formValue.title,
            "description":  formValue.description,
            "parentid":     formValue.parentCategory,
            "sort_order":   formValue.sortNumber,
            "id":           this.categoryId
        },
        "sourceobj":["parentid"]
      }

      /* sending data to the server */
      this._http.post(link, data).subscribe( response => {
        let result:any;
        result = response;
        if(result.status == 'success') {
          this.getCategoryData();
          this.categoryListPage.modalRef.hide();
          this.router.navigate(['category-list']);
        } else {
          this.is_error= result.msg;
        }
      }, error => {
        console.log("Oooops!");
      });
    } else {
      return;
    }
  }

  addCategoryFormReset() {
    this.addCategoryForm.reset();
  }

  closeModal() {
    this.categoryListPage.modalRef.hide();
    this.router.navigate(['category-list']);
  }

}
