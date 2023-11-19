import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AddTaskDataService } from '../services/add-task-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewTaskComponent implements OnInit {
  categories: any;
  contacts: any;
  prio: string = '';
  subtasks: Array<any> = [];
  newSubtask: string = '';
  newCategoryColors: Array<string> = ['#F44336', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50', '#CDDC39', '#FF9800']
  newCategoryColor: string = '';
  newCategoryOpen: boolean = false;

  newTaskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength]],
    dueDate: ['', [Validators.required]],
    category: ['', [Validators.required]],
    assignedTo: [''],
  });

  get title() { return this.newTaskForm.get('title'); }
  get dueDate() { return this.newTaskForm.get('dueDate'); }
  get category() { return this.newTaskForm.get('category'); }
  get assignedTo() { return this.newTaskForm.get('assignedTo'); }

  newCategoryForm = this.fb.group({
    newCategory: ['', [Validators.required]],
  });

  get newCategory() { return this.newCategoryForm.get('newCategory'); }

  constructor(
    public dataAddTask: AddTaskDataService,
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loadDataNewTask();
  }

  async loadDataNewTask() {
    this.categories = await this.getData('/categories/');
    this.contacts = await this.getData('/contacts/');
    console.log("contacts: ", this.contacts);
    console.log("categories: ", this.categories);
  }

  getData(endPoint) {
    const url = environment.baseUrl + endPoint;
    return lastValueFrom(this.http.get(url))
  }

  createTask() {
    console.log(this.category.value);
    console.log(this.assignedTo.value);
  }

  test() {
    console.log(this.dueDate.value);

  }

  categoryColorChoosed(color) {
    this.newCategoryColor = color;
  }

  async addNewCategory() {
    debugger
    await this.categories.push(
      {
        "title": this.newCategory.value,
        "category_color": this.newCategoryColor
      }
    )
    this.backToSelectCategory();
  }

  backToSelectCategory() {
    this.newCategoryOpen = false;
    this.newCategoryColor = '';
    this.clearCategoryInputs();
  }

  clearCategoryInputs() {
    this.newCategoryForm.setValue({
      newCategory: ''
    });
  }

  addNewSubtask() {
    this.subtasks.push(
      {
        'title': this.newSubtask,
        'completed': false
      })
  }
}
