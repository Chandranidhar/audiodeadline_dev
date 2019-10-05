import { Component, OnInit, TemplateRef, ViewChild, ElementRef, Input } from '@angular/core';
import { BsModalService, BsModalRef} from "ngx-bootstrap";
import { HttpClient } from '@angular/common/http';
import { Commonservices } from "../app.commonservices";
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [ Commonservices ]
})

export class CategoryListComponent implements OnInit {
  @ViewChild('addOrEditCategory') elementView: ElementRef;
  categoryId:any = null; /* for edit category */

  loadinglist = true;
  public p: number = 1;
  public modalRef: BsModalRef;
  public userData:CookieService;
  public serverUrl:any;
  public commonservices:any;
  public idx;

  /* set data for lib listing */
  categoryListArray:any = [];
  datasource:any;
  categoryTableName:any='category'
  categoryListArray_skip:any = [ "visible", "created_at", "sort_order8", "_id" ];  
  categoryListArray_modify_header:any = { "title": "Title", "description": "Description", "visibility": "Visibility", "sort_order": "Order", "parent": "Parent" };
  admintablenameTableName:any = 'user';
  updateurl:any = 'addorupdatedata';
  editUrl: any = 'category-edit';
  apiUrl:any;
  jwtToken:any;
  deleteval:any = 'deletesingledata';
  categoryVisibleArray:any = [{ val: 1, name: 'Visible' }, { val: 0, name: 'Not Visible' }];

  
  /* lib list search setting */
  date_search_source: any='categorylist_view';
  date_search_endpoint: any='datalist';
  emailarray: any = [
    { val: 'Yes', name: 'Visible'},
    { val: 'No', name: 'Not Visible'},
  ];
  search_settings:any = { 
                          selectsearch: [{ label:'Search By Visibility', field:'visibility', values:this.emailarray }],
                          textsearch:   [{ label:"Search", field:'title' }]
                        };


  constructor( public Router: Router, public _commonservices: Commonservices, private _http: HttpClient, private modalService: BsModalService, public activeRoute: ActivatedRoute, userdata: CookieService ) {
    this.userData   = userdata;
    this.commonservices = _commonservices;
    this.serverUrl  = _commonservices.url;
    this.apiUrl     = this.commonservices.nodesslurl;
    this.jwtToken   = this.userData.get('jwttoken');
  }

  ngOnInit() {
    this.categoryId = this.activeRoute.snapshot.params.id;
    if(this.categoryId) {
      this.modalRef = this.modalService.show(this.elementView, { class: 'modal-md addCategory', backdrop: 'static' }); 
    }
    this.getCategoryData();
  }

  getCategoryData() {
    this.loadinglist = true;
    /* set api link and submited data */
    let link = this.apiUrl + 'datalist';
    let data = { "source": "categorylist_view" };
    this.categoryListArray = [];

    /* process to hit the server and get data */
    this._http.post(link, data).subscribe( response => {
      this.loadinglist = false;
      let result:any = response;
      this.categoryListArray = result.res;
    }, error => {
      this.loadinglist = false;
      console.log("An error occurred.");
    });
  }

  /* for add new category */
  openAddModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, { class: 'modal-md addCategory' });
  }

}
