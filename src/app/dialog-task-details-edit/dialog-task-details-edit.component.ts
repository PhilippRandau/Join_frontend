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
    public currentUserData: CurrentUserService,
    private fb: FormBuilder,
  ) {
    this.clonedSubtasks = [];
    this.subtaskIdsToDelete = [];
    console.log('Task detail data: ', tasksDetails.currentTaskData);
    this.loadDataContacts();
    this.fillInputsWithCurrentTaskData();
  }

  taskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: [''],
    prio: [''],
    dueDate: ['', [Validators.required]],
    category: ['', [Validators.required]],
    assignedTo: [],
  });

  get title() { return this.taskForm.get('title'); }
  get description() { return this.taskForm.get('description'); }
  get prio() { return this.taskForm.get('prio'); }
  get dueDate() { return this.taskForm.get('dueDate'); }
  get category() { return this.taskForm.get('category'); }
  get assignedTo() { return this.taskForm.get('assignedTo'); }

  categories: any;
  contacts: any;
  creator: any;
  newCategoryColors: Array<string> = ['#F44336', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50', '#FF9800']
  newCategoryOpen: boolean = false;
  selectedCategory: any;
  clonedSubtasks: Array<any>;
  subtaskIdsToDelete: Array<number> = [];


  newCategoryForm = this.fb.group({
    newCategory: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    newCategoryColor: ['', [Validators.required]],
  });

  get newCategory() { return this.newCategoryForm.get('newCategory'); }
  get newCategoryColor() { return this.newCategoryForm.get('newCategoryColor'); }

  addSubtasksForm = this.fb.group({
    addSubtask: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  });

  get addSubtask() { return this.addSubtasksForm.get('addSubtask'); }


  categoryColorChoosed(color) {
    this.newCategoryColor.setValue(color);
  }


  newCategoryTextColor() {
    return this.newCategoryColor.value === '' ? 'black' : 'white';
  }


  async addNewCategory() {
    const newCategoryData = {
      "title": this.newCategory.value,
      "category_color": this.newCategoryColor.value
    }
    let response = await this.handleData.sendData('/categories/', newCategoryData);
    console.log("response post new category: ", response);
    await this.categories.push(response);
    this.selectedCategory = response;
    this.category.setValue(this.selectedCategory);
    this.backToSelectCategory();
  }


  backToSelectCategory() {
    this.newCategoryOpen = false;
    this.clearCategoryInputs();
  }


  clearCategoryInputs() {
    this.newCategoryForm.setValue({
      newCategory: '',
      newCategoryColor: ''
    });
  }


  async loadDataContacts() {
    this.creator = await this.currentUserData.currentUser;
    this.contacts = await this.handleData.getData('/contacts/');
    this.sortUsers();
  }

  sortUsers() {
    this.contacts.unshift(this.creator);
    const currentTask = this.tasksDetails.currentTaskData;
    currentTask.assigned_to.unshift(currentTask.assigned_to.splice(currentTask.assigned_to.findIndex(user => user.id === this.creator.id), 1)[0])
  }

  fillInputsWithCurrentTaskData() {
    const currentTask = this.tasksDetails.currentTaskData;
    this.title.setValue(currentTask.title);
    this.description.setValue(currentTask.description);
    this.prio.setValue(currentTask.prio);
    this.dueDate.setValue(currentTask.due_date);
    this.taskForm.controls['assignedTo'].setValue(currentTask.assigned_to);
    this.addEditTask.newSubtasks = currentTask.subtasks;
    this.category.setValue(currentTask.category);
    this.clonedSubtasks = this.addEditTask.newSubtasks;
  }


  setPrio(prioValue) {
    this.prio.setValue(prioValue);
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
      "title": this.title.value,
      "description": this.description.value,
      "assigned_to": this.addEditTask.idsOf(this.assignedTo.value),
      "due_date": this.addEditTask.convertDateToISO(this.dueDate.value),
      "prio": this.prio.value,
      "subtasks": this.addEditTask.idsOf(this.addEditTask.newSubtasks),
    }
    let response = await this.handleData.updateData(`/tasks/${this.tasksDetails.currentTaskData.id}/`, editedTask);
    console.log('task changed: ', response);
  }


  applyLocally() {
    this.tasksDetails.currentTaskData.title = this.title.value;
    this.tasksDetails.currentTaskData.description = this.description.value;
    this.tasksDetails.currentTaskData.prio = this.prio.value;
    this.tasksDetails.currentTaskData.due_date = this.addEditTask.convertDateToISO(this.dueDate.value);
    this.tasksDetails.currentTaskData.assigned_to = this.assignedTo.value;
    this.tasksDetails.currentTaskData.subtasks = this.addEditTask.newSubtasks;
  }


  editSubtask(clonedSubtask) {
    this.addSubtask.setValue(clonedSubtask.title);
    this.deleteSubtask(clonedSubtask);
  }


  deleteSubtask(clonedSubtask) {
    this.subtaskIdsToDelete.push(clonedSubtask.id);
    this.clonedSubtasks.splice(this.clonedSubtasks.findIndex(subtask => subtask.id === clonedSubtask.id), 1);
  }
}
