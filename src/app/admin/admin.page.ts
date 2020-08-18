import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserFormService } from '../services/user-form.service';
import { tap } from 'rxjs/operators';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import Stackedit from 'stackedit-js';
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
  users1$: Observable<User[]>
  'User changed Value '
  changedUsers:User[] =[]
  errorMessage: string = '';
  successMessage: string = '';
  constructor(    private userservice:UserService) {
   }

  ngOnInit() {
    this.users1$ = this.userservice.newusers$
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
    'Get ready for editor which will open '
    var x = document.createElement("textarea");
    document.body.appendChild(x);
    const el = document.querySelector('textarea');
    const stackedit = new Stackedit();
  
    // Open the iframe
    stackedit.openFile({
      name: 'Filename', // with an optional filename
      content: {
        text: el.value // and the Markdown content.
      }
    });
  
    // Listen to StackEdit events and apply the changes to the textarea.
    stackedit.on('fileChange', (file) => {
      el.value = file.content.text;
    });

  }
  DonationClick(){
    console.log('DonationClick')
    this.userclick = true
    this.userMgmtclick = false
    this.eventMgmtClick = false
    this.donationClick = true

  }
  SaveClick(){
    ' Now get all user List and isAdmin  True or false'
    console.log(this.changedUsers)
    if (this.changedUsers.length != 0 ){
    ' Filter duplicates from list which user has selected 100 times.'
    this.changedUsers = this.changedUsers.filter((obj, pos, arr) => {
      return arr.map(mapObj =>
            mapObj.email).indexOf(obj.email) == pos;
      });
    console.log("Again list is ",this.changedUsers);
    ' Now send post request for selectec Admin Users '
      this.userservice.updateUsers(this.changedUsers).subscribe(_ => {
        console.log('Your account has been created. Please log in.');
        this.errorMessage = "";
        this.successMessage = "User's Updated.";
      },error => {
        console.log(error);
        this.errorMessage = error;
        this.successMessage = "";
      });
    'Clear list in last as user needs to startover again'
    this.changedUsers =[]
    }
  }
  OnUserClick(user){
   // console.log(user)
    this.changedUsers.push(user)
  }
}
