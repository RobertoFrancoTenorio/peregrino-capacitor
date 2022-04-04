import { Component,NgZone,OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../services/auth/auth.service'
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signInForm: FormGroup;
  submitError: string;

  constructor(
    public router: Router,
    private ngZone: NgZone,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'email': new FormControl('', Validators.compose([
        Validators.required,
        Validators.email,
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });
  }

  async redirectToHome(){
    await this.auth.getUserData();
    this.router.navigate(['/home']);
  }

  signInWithEmail() {
    this.auth.signInWithEmail(this.signInForm.value['email'], this.signInForm.value['password'])
    .then(user => {
      // navigate to user profile
      this.redirectToHome();
      this.signInForm.reset();
    })
    .catch(error => {
      switch(error.code) {
        case 'auth/user-not-found':
          this.submitError='El correo electrónico proporcionado no existe';
          break;
        case 'auth/wrong-password':
          this.submitError='La contraseña es incorrecta';
          break;
        default:
          this.submitError = error.message;
      }
    });
  }

  prueba(){
    if(this.submitError != null){
      console.log('Prueba')
      this.submitError == null
    }
  }

  alert(){
    Swal.fire(
      'Good job!',
      'You clicked the button!',
      'success'
    )
  }
}
