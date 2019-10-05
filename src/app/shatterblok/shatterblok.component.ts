import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-shatterblok',
  templateUrl: './shatterblok.component.html',
  styleUrls: ['./shatterblok.component.css']
})
export class ShatterblokComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  gotop(){

    $('html,body').animate({
          scrollTop: $(".febevent_top_form").offset().top},
        'slow');

  }

}


