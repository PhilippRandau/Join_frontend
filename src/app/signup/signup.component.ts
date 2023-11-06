import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { asyncFullNameValidator } from '../validators/fullName.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  first_name: string = '';
  last_name: string = '';
  showPwChecked: boolean = false;
  showPwChecked2: boolean = false;
  rememberMe: boolean = false;
  signUpResponse: any;
  signUpErrorResponse: HttpErrorResponse;
  StrongPasswordRegx: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  EmailRegx: string = "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

  signUpForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)], [asyncFullNameValidator()]],
    email: ['', [Validators.required, Validators.pattern(this.EmailRegx)]],
    password: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
    password2: ['', [Validators.required, Validators.pattern(this.StrongPasswordRegx)]],
  })

  get name() { return this.signUpForm.get('name'); }
  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get password2() { return this.signUpForm.get('password2'); }



  ngOnInit(): void {

  }

  toggleShowPW() {
    this.showPwChecked = !this.showPwChecked;
  }

  async signUp() {
    this.spliceNameInFirstLastname();
    const username = this.randomUsername();
    console.log('username ' + username);

    try {
      this.signUpResponse = await this.auth.signUpWithNameEmailAndPassword(this.first_name, this.last_name, username, this.signUpForm.value.email, this.signUpForm.value.password, this.signUpForm.value.password2)
      console.log(this.signUpResponse);
      this.router.navigateByUrl('/login');
    } catch (e) {
      this.signUpErrorResponse = e;
      console.log(e);
    }
  }

  spliceNameInFirstLastname() {
    const firstLastname = this.signUpForm.value.name.split(' ');
    this.first_name = firstLastname[0];
    this.last_name = firstLastname[1];
  }

  randomUsername() {
    let length = 10;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
    }
  }
}
