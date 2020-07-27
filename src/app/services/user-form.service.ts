import {  Role ,User} from './../models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
//import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
  
  _BS = new BehaviorSubject({ user: {},isLogged:false});
  _BS1 = new BehaviorSubject<User[]>([])
  _val:any
  constructor() { 
    const user_=JSON.parse(localStorage.getItem('user'))
    console.log('Constructor of BS',user_)
    this._BS.next({user:user_,isLogged:false})
   }

  edit(user) {
    console.log('EDIT called in userform service');
    this._BS.next({user, isLogged:true });
  }

  create() {
    console.log('CREATE called in userform service');
    this._BS.next({user: null,isLogged:false });
  }
  logout() {
    console.log('LOGOUT called in userform service');
    this._BS.next({ user: null,isLogged:false });
  }
  get isLoggedUser$()
  {
    return this._BS.asObservable().pipe(
      map(uf => uf.isLogged)
    );
  }
  get user$() {
    return this._BS.asObservable().pipe(
      map(uf => uf.user)
    );
  }
   get currentUserRole(): any {
     let user:any = this._BS.value.user 
     if (user == null)
        return 'user'
     return user.role
}
  get isUserAdmin$() : boolean  
  {
    let str:String = this.currentUserRole
    if (str === 'Admin' || str =='superadmin')
        return true
    else
        return false
    
  }
}
