import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserFormService } from '../services/user-form.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  userclick = false
  userMgmtclick = false
  eventMgmtClick = false
  donationClick = false
  users$: Observable<User[]>

  constructor(    private userservice:UserService) {
   }

  ngOnInit() {

    this.users$ = this.userservice.users$
  }


  UserMgmtClick(){
    console.log('UserMgmtClick')
    this.userclick = true
    this.userMgmtclick = true
    this.eventMgmtClick = false
    this.donationClick = false
  }

  EventMgmtClick(){
    console.log('EventMgmtClick')
    this.userclick = true
    this.userMgmtclick = false
    this.eventMgmtClick = true
    this.donationClick = false
  }
  DonationClick(){
    console.log('DonationClick')
    this.userclick = true
    this.userMgmtclick = false
    this.eventMgmtClick = false
    this.donationClick = true

  }
}
