import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { BooleanValueAccessor, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserFormService } from './user-form.service';

@Injectable({providedIn : 'root'})

export class AuthGuard implements CanActivate{

    isLoggedUser: boolean;
    isLgdUser$: Observable<boolean>;
    
    ngOnInit() {
        this.isLgdUser$ = this.userForm.isLoggedUser$.pipe(
          tap(value => {
            this.isLoggedUser = value
            })
        );
    }

    constructor( 
        private userForm:UserFormService,
        private router: Router,
        private navCtrl: NavController,
        ){}
    
      
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> {
        this.userForm.isLoggedUser$.subscribe(isLoggedUser=>
            {
              this.isLoggedUser = isLoggedUser
            })
        if(this.isLoggedUser){
           return true;
        }
        return this.router.createUrlTree(['/menu/login']);
    }
}