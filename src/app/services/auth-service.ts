import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.prod';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,) { }

  loginWithEmailAndPassword(email: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      "email": email,
      "password": password
    };
    return lastValueFrom(this.http.post(url, body))
  }

  signUpWithNameEmailAndPassword(first_name: string, last_name: string, username: string, email: string, password: string, password2: string) {
    const url = environment.baseUrl + '/signup/';
    const body = {
      "first_name": first_name,
      "last_name": last_name,
      "username": username,
      "email": email,
      "password": password,
      "password2": password2,
    };
    return lastValueFrom(this.http.post(url, body))
  }
}
