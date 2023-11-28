import { Component } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userBubbleMenu: boolean = false;

  constructor(public currentUserData: CurrentUserService) {

  }

  

  toggleUserBubbleMenu() {
    this.userBubbleMenu = !this.userBubbleMenu;
  }

  editUser() {

  }


  logout() {

  }
}
