import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserFormService } from '../services/user-form.service';
import { AuthenticateService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  isLoggedUser: boolean;
  isLgdUser$: Observable<boolean>;
  isAdmin:boolean = false;
  user_:User ={uid:'',displayName:'', role:'user', email:''};
  constructor(
    private authService: AuthenticateService,
    private userForm:UserFormService
  ) { }

  ngOnInit() {
    this.isLgdUser$ = this.userForm.isLoggedUser$.pipe(
      tap(value => {
       // this.isLoggedUser = value
        })
    );
   // this.isAdmin = this.userForm.isUserAdmin$;
    this.userForm.user$.subscribe(user=>	
      {
          this.user_= user
         if (user != null){
           console.log(' User Value in last emit value ' ,user)
           if (this.user_.role == 'admin' || this.user_.role =='superadmin'){
             this.isAdmin = true
             this.isLoggedUser = true
           //  console.log('Inside if',this.isLoggedUser)
           
           }
           else if (this.user_.role == 'user'){
            //console.log('Inside else  if',this.isLoggedUser)
            this.isLoggedUser = true 
           }
          }else{
            //console.log('Inside else ',this.isLoggedUser)
            this.isLoggedUser = false
          }
          
      })	  



  }
  pages =[
    { title:'Home', url:'/menu/home', icon:'home' },
    { title:'Events', url:'/menu/events', icon:'calendar' },
    { title:'Contact Us', url:'/menu/contactus', icon:'call'},
    { title:'Donate', url:'/menu/donate', icon:'cash-outline'},
    { title:'Admin', url:'/menu/admin', icon:'cash-outline'},
    { title:'Dashboard', url:'/menu/dashboard', icon:'person'},  
    { title:'Login', url:'/menu/login', icon:'person'},
   ]

//   code is not used but please dont delete this code it is refrence code for many things in code. 
   pageswithoutAdmin =[
    { title:'Home', url:'/menu/home', icon:'home' },
    { title:'Events', url:'/menu/events', icon:'calendar' },
    { title:'Contact Us', url:'/menu/contactus', icon:'call'},
    { title:'Donate', url:'/menu/donate', icon:'cash-outline'},
    { title:'Login', url:'/menu/login', icon:'person'},
    { title:'Dashboard', url:'/menu/dashboard', icon:'person'},    
   ]
   
  filterpages()
  {
    /*
    this.userForm.isLoggedUser$.subscribe(isLoggedUser=>
      {
        this.isLoggedUser = isLoggedUser
      })
    console.log('Is user logged in ',this.isLoggedUser)
    */
   //console.log( 'Logged User state ',this.isLoggedUser)
   //console.log( 'ADMIN  User state ',this.isAdmin)
    if (!this.isAdmin)
      return this.pageswithoutAdmin
    else 
     return this.pages
  
  // return this.pages  
  }

}
