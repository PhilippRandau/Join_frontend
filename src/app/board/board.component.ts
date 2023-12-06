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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { AddTaskDataService } from '../services/add-task-data.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../services/handle-data.service';
import { DialogTaskDetailsComponent } from '../dialog-task-details/dialog-task-details.component';

import { trigger, transition, style, animate, state } from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  state('void', style({ transform: 'translateX(100%)' })),
  transition(':enter', animate('300ms ease-in-out')),
  transition(':leave', animate('300ms ease-in-out', style({ transform: 'translateX(100%)' }))),
]);
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
  

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public dataAddTask: AddTaskDataService,
    private router: Router,
    private handleData: HandleDataService,
  ) {}


  ngOnInit(): void {
    this.loadBoard()
  }


  async loadBoard() {
    try {
      let response: any = await this.handleData.getData('/tasks/');
      this.tasks = await this.replaceNestedIdsWithData(response);
      this.sortTasksInSections();
    } catch (e) {
      console.log(e);
    }
  }


  async replaceNestedIdsWithData(rawTasks) {
    await Promise.all(rawTasks.map(async (rawTask, i) => {
      let assignedTos = await Promise.all(rawTask.assigned_to.map(async assignedToID => {
        return this.handleData.getData('/user/' + assignedToID + '/');
      }));

      let category = await this.handleData.getData('/categories/' + rawTask.category + '/');

      let subtasks = await Promise.all(rawTask.subtasks.map(async subtaskID => {
        return this.handleData.getData('/subtasks/' + subtaskID + '/');
      }));

      rawTasks[i].assigned_to = assignedTos;
      rawTasks[i].category = category;
      rawTasks[i].subtasks = subtasks;
    }));

    return rawTasks;
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


  openAddTask(section) {

    this.dataAddTask.createTaskInSection = section;
    this.router.navigateByUrl('/add_task');


    // const pathThroughData = {
    //   'createInSection': section
    // }
    // const dialogRef = this.dialog.open(DialogAddTaskComponent, {
    //   data: pathThroughData
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }


  async updateTaskSection(updatedTask, dropSection) {
    const body = { 'section': dropSection }
    return await this.handleData.updateData(`/tasks/${updatedTask.id}/`, body);
  }


  drop(event: CdkDragDrop<string[]>, dropSection) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateTaskSection(event.container.data[event.currentIndex], dropSection)
    }
  }


  trackByFunction(index, item) {
    return item.name;
  }


  openDetailsTask(taskData) {
    let exitAnimationDuration = '250ms';

    this.dialog.open(DialogTaskDetailsComponent, {
      exitAnimationDuration,
      data: { task: taskData, },
      panelClass: 'task-details-dialog',
    });
  }
}
