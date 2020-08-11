import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.page.html',
  styleUrls: ['./eventdetails.page.scss'],
})
export class EventdetailsPage implements OnInit {

  slideOpts = { 
    autoplay:true,
    initialSlide: 1, 
    speed: 350, 
    effect: 'flip', 
    }; 
    
  constructor() { }

  ngOnInit() {
  }

}
