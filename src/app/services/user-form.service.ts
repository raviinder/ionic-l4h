import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  _BS = new BehaviorSubject({ title: 'RaviTest', user: {},isLogged:false});

  constructor() { }

  edit(user) {
    this._BS.next({ title: 'Edit User', user, isLogged:true });
  }

  create() {
    this._BS.next({ title: 'Create User', user: null,isLogged:false });
  }
  logout() {
    this._BS.next({ title: 'Logout User', user: null,isLogged:false });
  }

  get title$() {
    return this._BS.asObservable().pipe(
      map(uf => uf.title)
    );
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
}
