import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AddTaskDataService } from '../services/add-task-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HandleDataService } from '../services/handle-data.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewTaskComponent {

  constructor(
    public dataAddTask: AddTaskDataService,
    private handleData: HandleDataService,
    private fb: FormBuilder
  ) { this.loadDataNewTask(); }

  categories: any;
  contacts: any;
  creator: any;
  newSubtasks: Array<any> = [];
  newCategoryColors: Array<string> = ['#F44336', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50', '#FF9800']
  newCategoryOpen: boolean = false;
  selectedCategory: any;



  newTaskForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: [''],
    prio: [''],
    dueDate: ['', [Validators.required]],
    category: ['', [Validators.required]],
    assignedTo: [],
  });

  get title() { return this.newTaskForm.get('title'); }
  get description() { return this.newTaskForm.get('description'); }
  get prio() { return this.newTaskForm.get('prio'); }
  get dueDate() { return this.newTaskForm.get('dueDate'); }
  get category() { return this.newTaskForm.get('category'); }
  get assignedTo() { return this.newTaskForm.get('assignedTo'); }

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

  async loadDataNewTask() {
    this.creator = await this.handleData.getData('/user/');
    this.categories = await this.handleData.getData('/categories/');
    this.contacts = await this.handleData.getData('/contacts/');

    console.log("contacts: ", this.contacts);
    console.log("categories: ", this.categories);
    console.log('user logged in: ', this.creator);

    this.assignedTo.setValue([this.creator])
  }

  async createTask() {
    const newTask = {
      "section": this.dataAddTask.createTaskInSection,
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
  }

  idsOf(objects) {
    let objectsToIDs = [];
    objects.forEach(object => {
      objectsToIDs.push(object.id);
    });
    debugger
    return objectsToIDs;
  }

  convertDateToISO(date) {
    return date.toISOString().substring(0, 10);
  }

  setPrio(prioValue) {
    this.prio.setValue(prioValue);
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
    debugger
    this.newSubtasks.push(response);
    this.clearSubtaskInput();
  }

  clearSubtaskInput() {
    this.addSubtasksForm.setValue({
      addSubtask: '',
    });
  }
}
