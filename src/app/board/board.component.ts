import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environments/environment.prod';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDragPlaceholder,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  tasks: Array<any> = [];
  To_Do: Array<any> = [];
  In_Progress: Array<any> = [];
  Awaiting_Feedback: Array<any> = [];
  Done: Array<any> = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.loadBoard()
  }

  async loadBoard() {
    try {
      let response: any = await this.getBoardTasks();
      this.tasks = response;
      console.log(this.tasks);
      this.sortTasksInSections();

    } catch (e) {
      console.log(e);
    }
  }

  getBoardTasks() {
    const url = environment.baseUrl + '/tasks/';
    return lastValueFrom(this.http.get(url))
  }

  sortTasksInSections() {
    this.tasks.forEach(task => {
      this[task.section].push(task);
    });
  }

  valueCompletedSubtasks(subtasks) {
    let indexCompletedSubtasks = this.completedSubtasks(subtasks);
    let completedPercent = 100 / subtasks.length * indexCompletedSubtasks;
    return completedPercent;
  }

  completedSubtasks(subtasks) {
    let indexCompletedSubtasks = 0;
    subtasks.forEach(subtask => {
      if (subtask['completed']) {
        indexCompletedSubtasks++;
      }
    });
    return indexCompletedSubtasks;
  }

  addTask(section) {

  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  trackByFunction(index, item) {
    return item.name;
  }
}
