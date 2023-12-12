import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTaskDetailsComponent } from '../dialog-task-details/dialog-task-details.component';
import { Observable } from 'rxjs';
import { DialogTaskDetailsEditComponent } from '../dialog-task-details-edit/dialog-task-details-edit.component';

@Injectable({
  providedIn: 'root'
})
export class TasksDetailsService {

  constructor(public dialog: MatDialog) { }

  tasks: Array<any> = [];
  To_Do: Array<any> = [];
  In_Progress: Array<any> = [];
  Awaiting_Feedback: Array<any> = [];
  Done: Array<any> = [];
  tasksFilter: string = '';
  To_DoFiltered: Array<any> = [];
  In_ProgressFiltered: Array<any> = [];
  Awaiting_FeedbackFiltered: Array<any> = [];
  DoneFiltered: Array<any> = [];

  currentTaskData: any;

  openDetailsTask(taskData) {
    this.currentTaskData = taskData;
    let exitAnimationDuration = '250ms';

    this.dialog.open(DialogTaskDetailsComponent, {
      exitAnimationDuration,
      panelClass: 'task-details-dialog',
    });
  }

  openEditDetailsTask() {
    let exitAnimationDuration = '250ms';

    this.dialog.open(DialogTaskDetailsEditComponent, {
      exitAnimationDuration,
      panelClass: 'task-details-dialog',
    });
  }

  filterTaskSections() {
    const tasksFilter = this.tasksFilter.toLowerCase();
    this.tasks.forEach(task => {
      this[task.section + 'Filtered'] = this[task.section].filter((task) => (task.title.toLowerCase().includes(tasksFilter) || task.description.toLowerCase().includes(tasksFilter)) || task.category.title.toLowerCase().includes(tasksFilter));
      console.log(this[task.section].section, this[task.section + 'Filtered']);
    });
  }
}
