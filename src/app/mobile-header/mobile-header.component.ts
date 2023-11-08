import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent {
  userBubbleMenu: boolean = false;

  toggleUserBubbleMenu() {
    this.userBubbleMenu = !this.userBubbleMenu;
  }

  editUser() {

  }


  logout() {

  }
}
