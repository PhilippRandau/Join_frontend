import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HandleDataService {

  constructor(
    private http: HttpClient
  ) { }

  getData(endPoint) {
    const url = environment.baseUrl + endPoint;
    return lastValueFrom(this.http.get(url))
  }

  sendData(endPoint, body) {
    const url = environment.baseUrl + endPoint;
    return lastValueFrom(this.http.post(url, body))
  }
}
