import { Role } from './../models/user';
// authentication.service.ts
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';
import { UserFormService } from './user-form.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  userData: any;
  constructor(
    private afAuth: AngularFireAuth,
    private userForm: UserFormService
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        user.getIdTokenResult().then(idTokenResult => {
            console.log('My role is  =>',idTokenResult.claims.role)
            // I will get my role and then store it in local storage
            let user1:any = JSON.parse(localStorage.getItem('user'));
            user1.role=idTokenResult.claims.role
            localStorage.setItem('user', JSON.stringify(user1));
            this.userForm.edit(user1)
            console.log('Printing User so setting user is done ............1  ',user1)
        }
        )
      } else {
        // Didn't got any info of user so we are not saving it 
        localStorage.setItem('user', null);
        //JSON.parse(localStorage.getItem('user'));
        //this.userForm.edit(JSON.parse(localStorage.getItem('user')))
      }
    })


  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          user => { 
            user
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('Printing User so setting user is done .............2 ',user)
            localStorage.setItem('user', JSON.stringify(user));
            this.userForm.edit(JSON.parse(localStorage.getItem('user')))
            resolve(user)},
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log("Log Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.afAuth.user
  }
   userRole(){
     return this.afAuth;
   }
  async loginWithGoogle() {
    return await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  }
}
