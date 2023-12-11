import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HandleDataService } from './handle-data.service';
import { Router } from '@angular/router';
import { TasksDetailsService } from './tasks-details.service';
import { CurrentUserService } from './current-user.service';

@Injectable({
  providedIn: 'root'
})
export class EditAddTaskService {

  constructor(
    private handleData: HandleDataService,
    public tasksDetails: TasksDetailsService,
    public currentUserData: CurrentUserService,
    private fb: FormBuilder,
  ) { }

  categories: any;
  contacts: any;
  creator: any;
  createTaskInSection: string = 'To_Do';
  newSubtasks: Array<any> = [];

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
  get category() { return this.taskForm.get('category'); }
  get dueDate() { return this.taskForm.get('dueDate'); }
  get assignedTo() { return this.taskForm.get('assignedTo'); }

  addSubtasksForm = this.fb.group({
    addSubtask: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  });

  get addSubtask() { return this.addSubtasksForm.get('addSubtask'); }

  
  setPrio(prioValue) {
    this.prio.setValue(prioValue);
  }

  newCategoryForm = this.fb.group({
    newCategory: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    newCategoryColor: ['', [Validators.required]],
  });

  get newCategory() { return this.newCategoryForm.get('newCategory'); }
  get newCategoryColor() { return this.newCategoryForm.get('newCategoryColor'); }


  compareContactObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  idsOf(objects) {
    let objectsToIDs = [];
    objects.forEach(object => {
      objectsToIDs.push(object.id);
    });
    return objectsToIDs;
  }

  convertDateToISO(date) {
    if (Object.prototype.toString.call(date) === '[object Date]') {
      return date.toISOString().substring(0, 10);
    }
    else {
      return date;
    }
  }


  async addNewSubtask() {
    const newSubtaskData = {
      'title': this.addSubtask.value,
      'completed': false
    }
    let response = await this.handleData.sendData('/subtasks/', newSubtaskData);
    this.newSubtasks.push(response);
    this.clearSubtaskInput();
  }


  clearSubtaskInput() {
    this.addSubtasksForm.setValue({
      addSubtask: '',
    });
  }
}
