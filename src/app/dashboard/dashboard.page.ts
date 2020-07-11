import { UserFormService } from './../services/user-form.service';
// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  user$: Observable<{}>;
  
  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private userForm:UserFormService
  ) { }

  ngOnInit() {

    this.user$ = this.userForm.user$.pipe(
      tap(user => {
        if (user) {
        } else {
        }
      })
    );
 //   this.authService.userDetails().subscribe(res => {
   //   console.log('Dashboard res', res);
     // if (res !== null) {
    //    this.userEmail = res.email;
     // } else {
     //   this.navCtrl.navigateBack('');
     // }
      //}, err => {
      //  console.log('err', err);
    //})

  }

  logout() {
    this.userForm.logout()
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
        this.userForm.logout()
      })
      .catch(error => {
        console.log(error);
      })
  }
}
