import { Component, OnInit, TemplateRef } from '@angular/core';
import {Commonservices} from "../app.commonservices";
import {BsModalRef, BsModalService} from "ngx-bootstrap";

@Component({
  selector: 'app-pastevent',
  templateUrl: './pastevent.component.html',
  styleUrls: ['./pastevent.component.css'],
  providers: [Commonservices]
})
export class PasteventComponent implements OnInit {
  modalRef: BsModalRef;
  public imagearr = [];
  public fileurl;
  public uploadfolder;
  public zoomimg;
  public showleft;
  public showright;


  constructor(private _commonservices : Commonservices, private modalService: BsModalService,) {

    this.fileurl=_commonservices.fileurl;
    this.uploadfolder = 'laevenimg/'

    this.zoomimg = '';

    for(let i=1;i<=49;i++){
      this.imagearr.push('eventimg'+i+'.jpg');
    }
  }

  ngOnInit() {

  }



  zoominage(item,template: TemplateRef<any>){
    this.zoomimg = item;
    this.chkindex();
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  closemodal(){
    this.modalRef.hide();
  }

  previmg(){
    let idx = this.imagearr.indexOf(this.zoomimg);
    if(idx > 0)
      idx = idx-1;
    this.zoomimg = this.imagearr[idx];
    this.chkindex();
  }

  nextimg(){
    let total = this.imagearr.length;
    let idx = this.imagearr.indexOf(this.zoomimg);
    if(idx < total)
      idx = idx+1;
    this.zoomimg = this.imagearr[idx];
    this.chkindex();
  }

  chkindex(){
    let total = this.imagearr.length;
    let idx = this.imagearr.indexOf(this.zoomimg);
    this.showleft=1;
    this.showright=1;
    if(idx==0){
      this.showleft=0;
    }
    if(idx==(total-1)){
      this.showright=0;
    }
  }

}
