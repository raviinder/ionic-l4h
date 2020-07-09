import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { ModalController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { filter, switchMap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { UserFormService } from '../services/user-form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  user$: Observable<User>;
 

  constructor(
    public modalCtrl: ModalController,
    private navCtrl: NavController,
    private authService: AuthenticateService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private userForm: UserFormService,
  ) { }

  ngOnInit() {
    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user.uid)))

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      role:'user'
    });
  }
  
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  
  loginUser(value) {
    this.userForm.create();
    this.authService.loginUser(value)
      .then(res => {
        this.errorMessage = "";
        // Login is successfull, will send GET /myrole user to figure out if User is of Which kind of role. 
          this.user$.subscribe(result => {
            this.userForm.edit(result);
            console.log('User has been logged in with role ',result.role);
            this.navCtrl.navigateForward('/menu/dashboard');
          },error => {
            console.log(error);

          });

      }, err => {
        this.errorMessage = err.message;
      })
  }

  // goToRegisterPage() {
  //   this.navCtrl.navigateForward('/menu/register');
  // }

  googleLogin() {
    this.authService.loginWithGoogle()
      .then(res => {
        console.log(res);
        this.errorMessage = "";
        this.navCtrl.navigateForward('/dashboard');
      }, err => {
        this.errorMessage = err.message;
      });
  }

  async openRegisterModal(){
    var registerPage = this.modalCtrl.create({component: RegisterPage});
    return (await registerPage).present();
  }

}