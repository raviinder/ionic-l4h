import { Role,User } from './../models/user';
// authentication.service.ts
import { Injectable } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import 'firebase/auth';
import { UserFormService } from './user-form.service';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  userData: any;
  private setcustomclaimURL = 'https://us-central1-fir-test-a8277.cloudfunctions.net/api/setcustomclaim'
  currentUser:User ={uid:'',displayName:'', role:'user', email:'',  isAdmin:false};
  constructor(
    private afAuth: AngularFireAuth,
    private userForm: UserFormService
  ) { 
    // Before starting anything add this to constructor User information should be taken from Authentication service
   // localStorage.setItem('user', JSON.stringify(this.currentUser));
  //  this.userForm.edit(this.currentUser)

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        user.getIdTokenResult(true).then(idTokenResult => {
            console.log('My role is  =>',idTokenResult.claims.role)
            console.log('idTokenResult is   =>',idTokenResult.claims)
           if (user != null){
             //Get user from firebase user and save it in current user.
             this.currentUser.email = user.email
             this.currentUser.role =  idTokenResult.claims.role
             this.currentUser.displayName = user.displayName
             this.currentUser.uid = user.uid
             this.currentUser.isAdmin =  idTokenResult.claims.isAdmin
           // let currentUser = JSON.parse(this.userData.user);
           // currentUser.user["role"]=idTokenResult.claims.role
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            this.userForm.edit(this.currentUser)

            //console.log('Printing User so setting user is done ............and\n current user is  ',user,this.currentUser)
          }
        }
        )
      } else {
        // Didn't got any info of user so we are not saving it 
        console.log('Setting local storage to null')
        localStorage.setItem('user', null);
        //JSON.parse(localStorage.getItem('user'));
        this.userForm.edit(JSON.parse(localStorage.getItem('user')))
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
          usercred => { 
           // user
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log('Printing User so setting user is done .............2 ',usercred.user)
          this.currentUser.email = usercred.user.email
        //  this.currentUser.role =  'user'
          this.currentUser.displayName = usercred.user.displayName
          this.currentUser.uid = usercred.user.uid
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            this.userForm.edit(JSON.parse(localStorage.getItem('user')))
            resolve(usercred)},
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
          .then(() => {
            console.log('Setting local storage to null')
            localStorage.setItem('user', null);
            //JSON.parse(localStorage.getItem('user'));
            this.userForm.edit(JSON.parse(localStorage.getItem('user')))
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
   // return await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    // Ideally wait cloud function to set customclaims for user

    const provider = new auth.GoogleAuthProvider();
     return  await auth().signInWithPopup(provider)
    .then((result) => {
      // User is signed in. Get the ID token.
      console.log('Get token after siging it ')
      return result.user.getIdToken();
    })
    .then((idToken) => {
      // Pass the ID token to the server.
      console.log('Sending post request to update custom claim')
      $.post(
        this.setcustomclaimURL,
        {
          idToken: idToken
        },
        (data, status) => {
          // This is not required. You could just wait until the token is expired
          // and it proactively refreshes.
          if (status == 'success' && data) {
            const json = JSON.parse(data);
            if (json && json.status == 'success') {
              // Force token refresh. The token claims will contain the additional claims.
              auth().currentUser.getIdToken(true);
              console.log('Printing User email when setclaim is done ',auth().currentUser.email)
              this.currentUser.email = auth().currentUser.email
            //  this.currentUser.role =  'user'
              this.currentUser.displayName = auth().currentUser.displayName
              this.currentUser.uid = auth().currentUser.uid
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                this.userForm.edit(JSON.parse(localStorage.getItem('user')))



              // Now redirect to dashboard
            }
          }
        }).catch((error) => {
          console.log("Error while sending post request to server to update user" , error);
        });
    }).catch((error) => {
      console.log("Error while Sign-In google user" , error);
    });

  }
}
