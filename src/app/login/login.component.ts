import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showPwChecked: boolean = false;
  rememberMe: boolean = false;
  loginForm: any;
  loginData: any;

  constructor(
    private auth: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    // this.loginForm = new FormGroup({
    //   name: new FormControl(this.loginData.name, [
    //     Validators.required,
    //     Validators.minLength(4),
    //   ]),
    //   alterEgo: new FormControl(this.loginData.email),
    //   power: new FormControl(this.loginData.password, Validators.required)
    // });
  }

  async login() {
    try {
      let response: any = await this.auth.loginWithEmailAndPassword(this.email, this.password)
      console.log(response);
      localStorage.setItem('token', response['token'])
      this.router.navigateByUrl('/board');
    } catch (e) {
      console.log(e);
    }
  }

  loginAsGuest() {
    this.email = 'xxx@xx.xx';
    this.password = '?gu3s1.us3r!';
    this.login();
  }

  toggleShowPW() {
    this.showPwChecked = !this.showPwChecked;
  }

  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
  }
}
