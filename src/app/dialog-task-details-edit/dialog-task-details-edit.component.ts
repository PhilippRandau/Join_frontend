import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HandleDataService } from '../services/handle-data.service';
import { TasksDetailsService } from '../services/tasks-details.service';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { EditAddTaskService } from '../services/edit-add-task.service';
import { CurrentUserService } from '../services/current-user.service';

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
    public addEditTask: EditAddTaskService,
    public currentUserData: CurrentUserService
  ) {
    this.clonedSubtasks = [];
    this.subtaskIdsToDelete = [];
    console.log('Task detail data: ', tasksDetails.currentTaskData);
    this.loadDataContacts();
    this.fillInputsWithCurrentTaskData();
  }

  clonedSubtasks: Array<any>;
  subtaskIdsToDelete: Array<number> = [];

  async loadDataContacts() {
    this.addEditTask.creator = await this.currentUserData.currentUser;
    this.addEditTask.contacts = await this.handleData.getData('/contacts/');
    this.sortUsers();
  }

  sortUsers() {
    this.addEditTask.contacts.unshift(this.addEditTask.creator);
    const currentTask = this.tasksDetails.currentTaskData;
    currentTask.assigned_to.unshift(currentTask.assigned_to.splice(currentTask.assigned_to.findIndex(user => user.id === this.addEditTask.creator.id), 1)[0])
  }

  fillInputsWithCurrentTaskData() {
    const currentTask = this.tasksDetails.currentTaskData;
    this.addEditTask.title.setValue(currentTask.title);
    this.addEditTask.description.setValue(currentTask.description);
    this.addEditTask.prio.setValue(currentTask.prio);
    this.addEditTask.dueDate.setValue(currentTask.due_date);
    this.addEditTask.taskForm.controls['assignedTo'].setValue(currentTask.assigned_to);
    this.addEditTask.newSubtasks = currentTask.subtasks;
    this.addEditTask.category.setValue(currentTask.category);
    this.clonedSubtasks = this.addEditTask.newSubtasks;
  }


  acceptChanges() {
    this.acceptDeleteSubtasks();
    this.changeTask();
    this.applyLocally();
  }


  acceptDeleteSubtasks() {
    this.subtaskIdsToDelete.forEach(subtaskID => {
      this.handleData.deleteData(`/subtasks/${subtaskID}/`);
    });
    this.subtaskIdsToDelete = [];
  }


  async changeTask() {
    const editedTask = {
      "title": this.addEditTask.title.value,
      "description": this.addEditTask.description.value,
      "assigned_to": this.addEditTask.idsOf(this.addEditTask.assignedTo.value),
      "due_date": this.addEditTask.convertDateToISO(this.addEditTask.dueDate.value),
      "prio": this.addEditTask.prio.value,
      "subtasks": this.addEditTask.idsOf(this.addEditTask.newSubtasks),
    }
    let response = await this.handleData.updateData(`/tasks/${this.tasksDetails.currentTaskData.id}/`, editedTask);
    console.log('task changed: ', response);
  }


  applyLocally() {
    this.tasksDetails.currentTaskData.title = this.addEditTask.title.value;
    this.tasksDetails.currentTaskData.description = this.addEditTask.description.value;
    this.tasksDetails.currentTaskData.prio = this.addEditTask.prio.value;
    this.tasksDetails.currentTaskData.due_date = this.addEditTask.convertDateToISO(this.addEditTask.dueDate.value);
    this.tasksDetails.currentTaskData.assigned_to = this.addEditTask.assignedTo.value;
    this.tasksDetails.currentTaskData.subtasks = this.addEditTask.newSubtasks;
  }


  editSubtask(clonedSubtask) {
    this.addEditTask.addSubtask.setValue(clonedSubtask.title);
    this.deleteSubtask(clonedSubtask);
  }


  deleteSubtask(clonedSubtask) {
    this.subtaskIdsToDelete.push(clonedSubtask.id);
    this.clonedSubtasks.splice(this.clonedSubtasks.findIndex(subtask => subtask.id === clonedSubtask.id), 1);
  }
}
