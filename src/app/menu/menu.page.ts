import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserFormService } from '../services/user-form.service';
import { AuthenticateService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  isLoggedUser: boolean;
  isLgdUser$: Observable<boolean>;
  
  constructor(
    private authService: AuthenticateService,
    private userForm:UserFormService
  ) { }

  ngOnInit() {
    this.isLgdUser$ = this.userForm.isLoggedUser$.pipe(
      tap(value => {
        this.isLoggedUser = value
        })
    );

  }
  pages =[
    { title:'Home', url:'/menu/home', icon:'home' },
    { title:'Events', url:'/menu/events', icon:'calendar' },
    { title:'Contact Us', url:'/menu/contactus', icon:'call'},
    { title:'Donate', url:'/menu/donate', icon:'cash-outline'},
    { title:'Admin', url:'/menu/admin', icon:'cash-outline'},
    { title:'Login', url:'/menu/login', icon:'person'},   
   ]
   /*
   code is not used but please dont delete this code it is refrence code for many things in code. 
   pageswithoutLogin =[
    { title:'Home', url:'/menu/home', icon:'home' },
    { title:'Events', url:'/menu/events', icon:'calendar' },
    { title:'Contact Us', url:'/menu/contactus', icon:'call'},
    { title:'Donate', url:'/menu/donate', icon:'cash-outline'},
   ]
   
  filterpages()
  {
    this.userForm.isLoggedUser$.subscribe(isLoggedUser=>
      {
        this.isLoggedUser = isLoggedUser
      })
    console.log('Is user logged in ',this.isLoggedUser)
    if (!this.isLoggedUser)
      return this.pages
    else 
     return this.pageswithoutLogin
  
   return this.pages  
  }
*/
}
