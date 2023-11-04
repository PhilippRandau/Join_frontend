import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  name: string = '';
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  password: string = '';
  password2: string = '';
  showPwChecked: boolean = false;
  showPwChecked2: boolean = false;
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

  toggleShowPW() {
    this.showPwChecked = !this.showPwChecked;
  }

  async signUp() {
    this.spliceNameInFirstLastname();
    const username = this.randomUsername();
    console.log('username ' + username);
    
    try {
      let response: any = await this.auth.signUpWithNameEmailAndPassword(this.first_name, this.last_name, username, this.email, this.password, this.password2)
      console.log(response);
      this.router.navigateByUrl('/login');
    } catch (e) {
      console.log(e);
    }
  }

  spliceNameInFirstLastname() {
    debugger
    const firstLastname = this.name.split(' ');
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
}
