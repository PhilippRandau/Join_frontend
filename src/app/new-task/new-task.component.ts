import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { EditAddTaskService } from '../services/edit-add-task.service';
import { HandleDataService } from '../services/handle-data.service';
import { CurrentUserService } from '../services/current-user.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class NewTaskComponent implements OnInit {

  constructor(
    public addEditTask: EditAddTaskService,
    private handleData: HandleDataService,
    private router: Router,
    private fb: FormBuilder,
    public currentUserData: CurrentUserService
  ) {
  }

  ngOnInit() {
    this.loadDataContacts();
  }

  categories: any;
  contacts: any;
  creator: any;
  newSubtasks: Array<any> = [];
  newCategoryColors: Array<string> = ['#F44336', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50', '#FF9800']
  newCategoryOpen: boolean = false;
  selectedCategory: any;
  clonedSubtasks: Array<any>;
  subtaskIdsToDelete: Array<number> = [];


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
  get category() { return this.newTaskForm.get('category'); }
  get dueDate() { return this.newTaskForm.get('dueDate'); }
  get assignedTo() { return this.newTaskForm.get('assignedTo'); }

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


  async loadDataContacts() {
    this.creator = await this.currentUserData.loadCurrentUser();
    this.assignedTo.setValue([this.creator]);
    this.categories = await this.handleData.getData('/categories/');
    this.contacts = await this.handleData.getData('/contacts/');
  }

  async createTask() {
    const newTask = {
      "section": this.addEditTask.createTaskInSection,
      "title": this.title.value,
      "description": this.description.value,
      "category": this.selectedCategory.id,
      "assigned_to": this.addEditTask.idsOf(this.assignedTo.value),
      "due_date": this.addEditTask.convertDateToISO(this.dueDate.value),
      "prio": this.prio.value,
      "subtasks": this.addEditTask.idsOf(this.newSubtasks),
      "creator": this.creator.id
    }
    let response = await this.handleData.sendData('/tasks/', newTask);
    console.log('task created: ', response);
    this.router.navigateByUrl('/board');
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

  categoryColorChoosed(color) {
    this.newCategoryColor.setValue(color);
  }


  newCategoryTextColor() {
    return this.newCategoryColor.value === '' ? 'black' : 'white';
  }

}
