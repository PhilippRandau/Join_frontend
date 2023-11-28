import { Component } from '@angular/core';
import { HandleDataService } from '../services/handle-data.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  constructor(
    private handleData: HandleDataService,
  ) { this.loadDataContacts(); }

  contacts: any;
  currentUser: any;
  contactsSortedByName: any;

  async loadDataContacts() {
    this.currentUser = await this.handleData.getData('/user/');
    this.contacts = await this.handleData.getData('/contacts/');
    this.contactsSortedByName = this.contacts.sort((a, b) => (a.first_name < b.first_name ? -1 : 1));
  }
}
