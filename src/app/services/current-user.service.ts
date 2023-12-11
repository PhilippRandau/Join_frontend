import { Injectable } from '@angular/core';
import { HandleDataService } from './handle-data.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor(private handleData: HandleDataService) {
    this.loadCurrentUser();
  }

  currentUser: any;

  async loadCurrentUser() {
    this.currentUser = await this.handleData.getData('/user/');
    console.log('Current User logged in: ', this.currentUser);
    return this.currentUser;

  }
}
