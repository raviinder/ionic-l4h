import { AuthenticateService } from './authentication.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';	

import { Injectable } from '@angular/core';	
import { BooleanValueAccessor, NavController } from '@ionic/angular';	
import { Observable } from 'rxjs';	
import { map, tap } from 'rxjs/operators';	
import { UserFormService } from './user-form.service';	
import { User } from '../models/user';

@Injectable({providedIn : 'root'})	

export class AuthGuard implements CanActivate{	

    isLoggedUser: boolean;
    user_:User 	
    isLgdUser$: Observable<boolean>;	
    user$:Observable<User>
    ngOnInit() {	
        this.isLgdUser$ = this.userForm.isLoggedUser$.pipe(	
          tap(value => {	
            this.isLoggedUser = value	
            })	
        );	
    }	

    constructor(
        private authService:AuthenticateService,
        private userForm:UserFormService,	
        private router: Router,	
        private navCtrl: NavController,	
        ){}	


    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {	
       /* this.userForm.isLoggedUser$.subscribe(isLoggedUser=>	
            {	
       
              this.isLoggedUser = isLoggedUser	
              console.log('Logged User in last emit value ' ,isLoggedUser)
            })	
            console.log('Logged User in CanActivate ' ,this.isLoggedUser)
        if(this.isLoggedUser){	
           return true;	
        }else{
            alert("User not authenticated, Please sign in or register first")
            return this.router.createUrlTree(['/menu/login']);	

        }	
        return this.router.createUrlTree(['/menu/login']);	
        */
       this.userForm.user$.subscribe(user=>	
        {
            this.user_ = user
           if (user != null)
             console.log(' User Value in last emit value ' ,user)
        })	
        console.log('Logged User in CanActivate ' ,this.isLoggedUser)
    if(this.user_ != null){	
       return true;	
    }	
    return this.router.createUrlTree(['/menu/login']);	


    }	
} 