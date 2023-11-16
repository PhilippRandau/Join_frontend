import { Component } from '@angular/core';
import { AddTaskDataService } from '../services/add-task-data.service';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
constructor(
  public dataAddTask: AddTaskDataService,
  private fb: FormBuilder
){}

subtasks: Array<any> = [];
  newSubtask: string = '';

  newTaskForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength]],
    dueDate: ['', [Validators.required]],
    category: ['', [Validators.required]],
  });

  get title() { return this.newTaskForm.get('title'); }
  get dueDate() { return this.newTaskForm.get('dueDate'); }
  get category() { return this.newTaskForm.get('category'); }


  createTask() {

  }


  addNewSubtask() {
    this.subtasks.push(
      {
        'title': this.newSubtask,
        'completed': false
      })
  }
}
