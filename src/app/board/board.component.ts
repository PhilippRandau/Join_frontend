import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.loadBoard()
  }

  async loadBoard() {
    try {
      let response: any = await this.getBoardTasks();
      this.tasks = response;
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  getBoardTasks() {
    const url = environment.baseUrl + '/tasks/';
    return lastValueFrom(this.http.get(url))
  }
}
