import { Component } from '@angular/core';
import { HandleDataService } from '../services/handle-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userBubbleMenu: boolean = false;
  currentUser: any;

  constructor(private handleData: HandleDataService,) {

    this.loadCurrentUser();
  }

  async loadCurrentUser() {
    this.currentUser = await this.handleData.getData('/user/');
  }

  toggleUserBubbleMenu() {
    this.userBubbleMenu = !this.userBubbleMenu;
  }

  editUser() {

  }


  logout() {

  }
}
