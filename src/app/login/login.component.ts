import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  showPwChecked: boolean = false;
  rememberMe: boolean = false;
  guestEmail = 'xxx@xx.xx';
  guestPassword = '?gu3s1.us3r!';

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder) {
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ngOnInit(): void {

  }

  async login(guest) {
    try {
      let response: any;
      if (guest === 'guest') {
        response = await this.auth.loginWithEmailAndPassword(this.guestEmail, this.guestPassword)
      } else {
        response = await this.auth.loginWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      }
      console.log(response);
      localStorage.setItem('token', response['token'])
      this.router.navigateByUrl('/summary');
    } catch (e) {
      console.log(e);
    }
  }

  toggleShowPW() {
    this.showPwChecked = !this.showPwChecked;
  }

  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }
}
