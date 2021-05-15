import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { LoginService } from '../service/login.service';
import { Users } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  register: Boolean = false;
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string;
  user: Users = new Users();

  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private loginservice: LoginService) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]]
    })

    this.registerForm = this.fb.group({
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      confirmPassword: ['', [Validators.required]]

    }, { validator: this.checkPassword('password', 'confirmPassword') })
  }
  
  login() {
    this.loginservice.login(this.loginForm.value).subscribe(
      (response) => {
        this.errorMessage = null;
        this.user = response;
        this.auth.nextUser(this.user);
        this.router.navigate(['/home'])

      },
      (errorResponse) => {
        //error message if invalid contact number or password
        this.errorMessage = errorResponse.error.message;
        sessionStorage.clear();
      }
    );
  }
  getRegisterPage() {
    this.register = true;
    //open register page if the user is not registered already
  }
  getLoginPage() {
    this.register = false;
  }

  registerUser() { }

  checkPassword(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

}
