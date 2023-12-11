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
})
export class NewTaskComponent implements OnInit {

  constructor(
    public addEditTask: EditAddTaskService,
    private handleData: HandleDataService,
    private router: Router,
    public currentUserData: CurrentUserService
  ) {
    this.addEditTask.taskForm.reset();
    this.addEditTask.addSubtasksForm.reset();
    this.addEditTask.newCategoryForm.reset();
  }

  ngOnInit() {
    this.loadDataContacts();
  }


  newSubtasks: Array<any> = [];
  newCategoryColors: Array<string> = ['#F44336', '#9C27B0', '#3F51B5', '#2196F3', '#00BCD4', '#4CAF50', '#FF9800']
  newCategoryOpen: boolean = false;
  selectedCategory: any;


  async loadDataContacts() {
    this.addEditTask.creator = await this.currentUserData.loadCurrentUser();
    this.addEditTask.assignedTo.setValue([this.addEditTask.creator]);
    this.addEditTask.categories = await this.handleData.getData('/categories/');
    this.addEditTask.contacts = await this.handleData.getData('/contacts/');
  }

  async createTask() {
    const newTask = {
      "section": this.addEditTask.createTaskInSection,
      "title": this.addEditTask.title.value,
      "description": this.addEditTask.description.value,
      "category": this.selectedCategory.id,
      "assigned_to": this.addEditTask.idsOf(this.addEditTask.assignedTo.value),
      "due_date": this.addEditTask.convertDateToISO(this.addEditTask.dueDate.value),
      "prio": this.addEditTask.prio.value,
      "subtasks": this.addEditTask.idsOf(this.newSubtasks),
      "creator": this.addEditTask.creator.id
    }
    let response = await this.handleData.sendData('/tasks/', newTask);
    console.log('task created: ', response);
    this.router.navigateByUrl('/board');
  }

  async addNewCategory() {
    const newCategoryData = {
      "title": this.addEditTask.newCategory.value,
      "category_color": this.addEditTask.newCategoryColor.value
    }
    let response = await this.handleData.sendData('/categories/', newCategoryData);
    console.log("response post new category: ", response);
    await this.addEditTask.categories.push(response);
    this.selectedCategory = response;
    this.addEditTask.category.setValue(this.selectedCategory);
    this.backToSelectCategory();
  }


  backToSelectCategory() {
    this.newCategoryOpen = false;
    this.clearCategoryInputs();
  }


  clearCategoryInputs() {
    this.addEditTask.newCategoryForm.setValue({
      newCategory: '',
      newCategoryColor: ''
    });
  }

  categoryColorChoosed(color) {
    this.addEditTask.newCategoryColor.setValue(color);
  }


  newCategoryTextColor() {
    return this.addEditTask.newCategoryColor.value === '' ? 'black' : 'white';
  }

}
