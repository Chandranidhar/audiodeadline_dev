import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.css'],
  providers:[Commonservices]
})
export class InviteFriendsComponent implements OnInit {
  public commonservice:any;

  constructor(private _commonservice:Commonservices) {
    this.commonservice=_commonservice;
  }

  ngOnInit() {
  }

}
