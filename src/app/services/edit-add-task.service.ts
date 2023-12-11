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
    public currentUserData: CurrentUserService
  ) { }

  createTaskInSection: string = 'To_Do';
  newSubtasks: Array<any> = [];

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


  async addNewSubtask(subtaskValue) {
    const newSubtaskData = {
      'title': subtaskValue,
      'completed': false
    }
    let response = await this.handleData.sendData('/subtasks/', newSubtaskData);
    this.newSubtasks.push(response);
    this.clearSubtaskInput(subtaskValue);
  }


  clearSubtaskInput(subtaskValue) {
    subtaskValue.setValue({
      addSubtask: '',
    });
  }
}
