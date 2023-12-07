import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTaskDetailsComponent } from '../dialog-task-details/dialog-task-details.component';
import { Observable } from 'rxjs';
import { DialogTaskDetailsEditComponent } from '../dialog-task-details-edit/dialog-task-details-edit.component';

@Injectable({
  providedIn: 'root'
})
export class TasksDetailsService {

  constructor(public dialog: MatDialog,) { }

  tasks: Array<any> = [];
  To_Do: Array<any> = [];
  In_Progress: Array<any> = [];
  Awaiting_Feedback: Array<any> = [];
  Done: Array<any> = [];

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
}
