import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private auth: AuthService) {
  }

  async login() {
    try {
      let response: any  = await this.auth.loginWithUsernameAndPassword(this.username, this.password)
      console.log(response);
      localStorage.setItem('token', response['token'])
    } catch (e) {
      console.log(e);
    }
  }
}
