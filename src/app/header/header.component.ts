import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userBubbleMenu: boolean = false;

  toggleUserBubbleMenu() {
    this.userBubbleMenu = !this.userBubbleMenu;
  }

  editUser() {

  }


  logout() {

  }
}
