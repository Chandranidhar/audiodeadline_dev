import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalService, BsModalRef} from "ngx-bootstrap";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';
import {Commonservices} from "../app.commonservices";

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css'],
  providers: [Commonservices]
})
export class ProductlistComponent implements OnInit {

  public loadinglist:boolean;
  public p: number = 1;
  modalRef: BsModalRef;
  public serverurl;
  public apiUrl:any;
  public productlist;
  public idx;

  /************** lib list setup start here *************/
  public libList:any = {
    datasource: "",
    productTableName: "product",
    productListArray_skip: [ "attribute", "created_at", "sort_order8", "_id" ],
    productListArray_modify_header: { "name": "Title", "description": "Description", "price": "price", "status": "Status" },
    admintablenameTableName: "user",
    updateurl: "addorupdatedata",
    editUrl: "edit-product",
    jwtToken: "",
    deleteval: "deletesingledata",
    productStatusArray: [{ val: 1, name: 'Active' }, { val: 0, name: 'Deactive' }],
    
    /* lib list search setting */
    date_search_source: "product_list_view",
    date_search_endpoint: "datalist",
    search_settings: { selectsearch: [{ label:'Search By Status', field:'status', values: [{ val: 1, name: 'Active'}, { val: 0, name: 'Deactive' }] }], textsearch: [{ label:"Search", field:'name' }]}
  }
  /************** lib list setup end here *************/

  constructor(private _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService) {
    this.serverurl = _commonservices.url;
    this.apiUrl = _commonservices.nodesslurl;
    this.getProductList();
  }

  ngOnInit() {
  }

  /* function for get product list */
  getProductList(){
    this.loadinglist = true;
    let link = this.apiUrl + 'datalist';
    let data = { "source": "product_list_view" };

    this._http.post(link, data).subscribe(res => {
      this.loadinglist = false;
      let result:any;
      result = res;
      this.productlist = result.res;
    },error => {
      this.loadinglist = false;
      console.log("Oooops!");
    });
  }

  /* delete modal */
  openDelModal(template: TemplateRef<any>,item) {
    this.idx = this.productlist.indexOf(item);
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  /* delete conformation */
  confirm(): void {
    var link =this.apiUrl + 'deleteproduct';
    var data = { _id:this.productlist[this.idx]._id };

    this._http.post(link, data).subscribe(res => {
      let result:any;
      result = res;
      if(result.status == 'success') {
        this.productlist.splice(this.idx, 1);
      }
      this.modalRef.hide();
    },error => {
      console.log("Oooops!");
      this.modalRef.hide();
    });
  }

  /* close modal */
  decline(): void {
    this.modalRef.hide();
  }

}
