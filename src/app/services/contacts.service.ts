import { Injectable } from '@angular/core';
import { HandleDataService } from './handle-data.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private handleData: HandleDataService) {
  }

  async loadDataContacts() {
    let contacts = await this.handleData.getData('/contacts/');
    console.log('Current contacts is: ', contacts);
    return contacts;
  }
}
