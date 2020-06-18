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
    {
      title:'Home',
      url:'/menu/home',
      icon:'home-outline'
    },
    {
      title:'Login',
      url:'/menu/login',
      icon:'person-outline'
    },
    {
      title:'Events',
      url:'/menu/events',
      icon:'calendar-outline'
    },
    {
      title:'SubChildTest',
      children:[
        {
          title:'Login-Ravi',
          url:'/menu/login',
          icon:'logo-ionic'
        },
        {
          title:'Events',
          url:'/menu/events',
          icon:'logo-google'
        }
      ]
    }
  ]
}
