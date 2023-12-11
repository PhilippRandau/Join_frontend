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
    private fb: FormBuilder,
    private handleData: HandleDataService,
    private router: Router,
    public tasksDetails: TasksDetailsService,
    public currentUserData: CurrentUserService
  ) { }

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
  newSubtasks: Array<any> = [];
  newCategoryColors: Array<string> = ['#F44336', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50', '#FF9800']
  newCategoryOpen: boolean = false;
  selectedCategory: any;
  createTaskInSection: string = 'To_Do';


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

  async loadDataContacts() {
    this.creator = await this.currentUserData.loadCurrentUser();
    this.assignedTo.setValue([this.creator]);
    this.categories = await this.handleData.getData('/categories/');
    this.contacts = await this.handleData.getData('/contacts/');
  }


  compareContactObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }


  async createTask() {
    const newTask = {
      "section": this.createTaskInSection,
      "title": this.title.value,
      "description": this.description.value,
      "category": this.selectedCategory.id,
      "assigned_to": this.idsOf(this.assignedTo.value),
      "due_date": this.convertDateToISO(this.dueDate.value),
      "prio": this.prio.value,
      "subtasks": this.idsOf(this.newSubtasks),
      "creator": this.creator.id
    }
    let response = await this.handleData.sendData('/tasks/', newTask);
    console.log('task created: ', response);
    this.router.navigateByUrl('/board');
  }


  setPrio(prioValue) {
    this.prio.setValue(prioValue);
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
