import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddTaskDataService } from '../services/add-task-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  summary: boolean = false;
  board: boolean = false;
  add_task: boolean = false;
  contacts: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dataAddTask: AddTaskDataService,) {
    let navPaths = ['summary', 'board', 'add_task', 'contacts']
    navPaths.forEach(navPath => {
      if (activatedRoute.snapshot.url[0].path === navPath) {
        this[navPath] = true;
      }
    });
  }

  setTaskSection() {
    this.dataAddTask.createTaskInSection = 'To_Do';
  }
}
