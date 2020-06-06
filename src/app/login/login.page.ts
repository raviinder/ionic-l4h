import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  pages =[
    {
      title:'Main',
      url:'/menu/main',
      icon:'home'
    },
    {
      title:'Cool Frameworks',
      children:[
        {
          title:'Ionic',
          url:'/menu/ionic',
          icon:'logo-ionic'
        },
        {
          title:'Flutter',
          url:'/menu/flutter',
          icon:'logo-google'
        }
      ]
    }
  ]
}
