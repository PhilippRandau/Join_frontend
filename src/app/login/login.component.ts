import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router) {
  }

  async login() {
    try {
      let response: any  = await this.auth.loginWithUsernameAndPassword(this.username, this.password)
      console.log(response);
      localStorage.setItem('token', response['token'])
      this.router.navigateByUrl('/board');
    } catch (e) {
      console.log(e);
    }
  }
}
