// register.page.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthenticateService } from '../services/authentication.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, filter } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { UserFormService } from '../services/user-form.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  users$: Observable<User[]>;
  user$: Observable<User>;
  
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public modalCtrl: ModalController,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userForm: UserFormService,
    private afAuth: AngularFireAuth
  ) { }
  
  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      displayName:'RAVITESTUSER',
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      role:'user'
    });

    this.users$ = this.userService.users$;

    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid))
    );


  }


  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  tryRegister(value) {
    this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  create(value) {
      this.userService.create(value).subscribe(_ => {
        console.log('Your account has been created. Please log in.');
        this.errorMessage = "";
        this.successMessage = "Your account has been created. Please log in.";
        // Clear Values of email & password after successfull creation of  
        this.validations_form
      },error => {
        console.log(error);
        this.errorMessage = error;
        this.successMessage = "";
      });
  
  }

  goLoginPage() {
    this.navCtrl.navigateBack('/menu/login');
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
}
