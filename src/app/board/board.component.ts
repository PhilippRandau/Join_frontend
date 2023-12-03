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
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { AddTaskDataService } from '../services/add-task-data.service';
import { Router } from '@angular/router';
import { HandleDataService } from '../services/handle-data.service';

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
  ) {

  }

  ngOnInit(): void {
    this.loadBoard()
  }

  async loadBoard() {
    try {
      let response: any = await this.handleData.getData('/tasks/');
      debugger
      console.log(response);
      await this.replaceNestedIdsWithData(response);
      console.log(this.tasks);

      this.sortTasksInSections();

    } catch (e) {
      console.log(e);
    }
  }

  async replaceNestedIdsWithData(rawTasks) {

    await rawTasks.forEach(async (rawTask, i ) => {
      let assignedTos = [];
      let category = {};
      let subtasks = [];
      await rawTask.assigned_to.forEach(async assignedToID => {
        assignedTos.push(await this.handleData.getData('/user/' + assignedToID + '/'));
      });
      category = await this.handleData.getData('/categories/' + rawTask.category + '/');
      await rawTask.subtasks.forEach(async subtaskID => {
        subtasks.push(await this.handleData.getData('/subtasks/' + subtaskID + '/'));
      });
      rawTasks[i].assigned_to = assignedTos;
      rawTasks[i].category = category;
      rawTasks[i].subtasks = subtasks;
    });
    console.log('rawtasks: ',rawTasks);
    this.tasks = rawTasks;
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

  async updateTask(updateData, dropSection) {
    const body = await this.changeSectionOfDroppedTask(updateData, dropSection);

    const endPoint = `/tasks/`;

    return lastValueFrom(this.http.patch(environment.baseUrl + endPoint, body)).then(() => {
      console.log('updated: ' + updateData.id);
    });
  }

  changeSectionOfDroppedTask(updateData, dropSection) {
    updateData['section'] = dropSection;
    return updateData;
  }


  drop(event: CdkDragDrop<string[]>, dropSection) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log('same');

      console.log("Todo", this.To_Do);
      console.log("In Progress", this.In_Progress);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      console.log('other');

      console.log("Todo", this.To_Do);
      console.log("In Progress", this.In_Progress);

      this.updateTask(event.container.data[event.currentIndex], dropSection)
    }
  }

  trackByFunction(index, item) {
    return item.name;
  }
}
