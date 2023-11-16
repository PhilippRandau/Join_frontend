import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddTaskDataService {
  createTaskInSection: string = 'To_Do';
  constructor() { }
}
