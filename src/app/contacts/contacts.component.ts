import { Component } from '@angular/core';
import { CurrentUserService } from '../services/current-user.service';
import { ContactsService } from '../services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  constructor(
    public currentUserData: CurrentUserService,
    public contactsData: ContactsService
  ) { this.loadDataContacts(); }


  contacts: any;
  contactsSortedByName: any;

  async loadDataContacts() {
    this.contacts = await this.contactsData.loadDataContacts();
    this.contactsSortedByName = this.contacts.sort((a, b) => (a.first_name < b.first_name ? -1 : 1));
    console.log('contacts ', this.contacts);
  }
}
