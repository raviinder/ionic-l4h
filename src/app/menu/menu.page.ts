import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  pages =[
    { title:'Home', url:'/menu/home', icon:'home' },
    { title:'Events', url:'/menu/events', icon:'calendar' },
    { title:'Contact Us', url:'/menu/contactus', icon:'call'},
    { title:'My Account',
      children:[
        { title:'Login', url:'/menu/login', icon:'person'},
        { title:'Register', url:'/menu/register', icon:'logo-google'},
      ]
    }
  ]
}
