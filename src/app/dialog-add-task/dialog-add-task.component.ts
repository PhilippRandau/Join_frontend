import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
  }

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
