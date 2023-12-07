import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HandleDataService } from '../services/handle-data.service';
import { TasksDetailsService } from '../services/tasks-details.service';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { EditAddTaskService } from '../services/edit-add-task.service';

@Component({
  selector: 'app-dialog-task-details-edit',
  templateUrl: './dialog-task-details-edit.component.html',
  styleUrls: ['./dialog-task-details-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogTaskDetailsEditComponent {
  constructor(
    public dialogRef: DialogRef,
    private handleData: HandleDataService,
    public tasksDetails: TasksDetailsService,
    public addEditTask: EditAddTaskService
  ) {
    console.log('Task detail data: ', tasksDetails.currentTaskData);
    this.loadDataContacts();
    this.fillInputsWithCurrentTaskData();
  }

  async loadDataContacts() {
    this.addEditTask.creator = await this.handleData.getData('/user/');
    this.addEditTask.contacts = await this.handleData.getData('/contacts/');
  }

  fillInputsWithCurrentTaskData() {
    console.log('assignedTo: ', this.addEditTask.assignedTo.value);
    const currentTask = this.tasksDetails.currentTaskData;
    this.addEditTask.title.setValue(currentTask.title);
    this.addEditTask.description.setValue(currentTask.description);
    this.addEditTask.prio.setValue(currentTask.prio);
    this.addEditTask.dueDate.setValue(currentTask.due_date);
    this.addEditTask.taskForm.controls['assignedTo'].setValue(currentTask.assigned_to);
    this.addEditTask.newSubtasks = currentTask.subtasks;
  }

  acceptChanges() {
    console.log('accept');

  }
}
