import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-febevent',
  templateUrl: './febevent.component.html',
  styleUrls: ['./febevent.component.css']
})
export class FebeventComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  gotop(){

    $('html,body').animate({
          scrollTop: $(".febevent_top_form").offset().top},
        'slow');

  }
}
