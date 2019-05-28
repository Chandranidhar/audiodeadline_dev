import { Component, OnInit } from '@angular/core';
import {Commonservices} from '../app.commonservices';
@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css'],
  providers:[Commonservices]
})
export class UserdashboardComponent implements OnInit {
  public commonservice:any;

  constructor(private _commonservice:Commonservices) {
    this.commonservice=_commonservice;
  }

  ngOnInit() {
  }

}
