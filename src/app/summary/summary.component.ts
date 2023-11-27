import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { HandleDataService } from '../services/handle-data.service';
import { BehaviorSubject } from 'rxjs';
import { NgxAnimatedCounterParams } from '@bugsplat/ngx-animated-counter';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({
        opacity: 1,
      })),
      state('false', style({
        opacity: 0,
        visibility: 'hidden'
      })),
      transition('true => false', [
        animate('1s')
      ]),
    ]),
  ],
})
export class SummaryComponent {

  constructor(
    private handleData: HandleDataService,
  ) {
    this.loadDataTasks();
  }
  showWelcomeScreen: boolean = true;
  sections: Array<string> = ['To_Do', 'In_Progress', 'Awaiting_Feedback', 'Done'];
  tasks: any;
  To_Do: Array<any> = [];
  In_Progress: Array<any> = [];
  Awaiting_Feedback: Array<any> = [];
  Done: Array<any> = [];
  urgentTasks: Array<any>;
  prioUrgentTask: any;

  public boardParams: NgxAnimatedCounterParams = { start: 0, end: 0, interval: 0, increment: 0 };
  public inProgressParams: NgxAnimatedCounterParams = { start: 0, end: 0, interval: 0, increment: 0 };
  public awaitingFeedbackParams: NgxAnimatedCounterParams = { start: 0, end: 0, interval: 0, increment: 0 };
  public urgentParams: NgxAnimatedCounterParams = { start: 0, end: 0, interval: 0, increment: 0 };
  public toDoParams: NgxAnimatedCounterParams = { start: 0, end: 0, interval: 0, increment: 0 };
  public doneParams: NgxAnimatedCounterParams = { start: 0, end: 0, interval: 0, increment: 0 };


  async loadDataTasks() {
    this.tasks = await this.handleData.getData('/summary/');
    console.log('tasks: ', this.tasks);
    this.sections.forEach(section => {
      this.filterTasks(section);
    });
    this.filterUrgentTasks();
    this.animateWelcomeScreen();
  }

  filterTasks(sectionName) {
    this[sectionName] = this.tasks.filter((task) => task.section === sectionName);
    console.log(sectionName, this[sectionName]);
  }

  filterUrgentTasks() {
    this.urgentTasks = this.tasks.filter((task) => task.prio === 'Urgent');
    console.log('urgent', this.urgentTasks);
    this.findPrioUrgentTask();
  }

  findPrioUrgentTask() {
    this.prioUrgentTask = this.urgentTasks.reduce((latest, current) =>
      new Date(current.due_date) < new Date(latest.due_date) ? current : latest
    );
    console.log(this.prioUrgentTask);
  }

  setParams() {
    this.boardParams = { start: 0, end: this.tasks.length, interval: 200, increment: 1 };
    this.inProgressParams = { start: 0, end: this.In_Progress.length, interval: 200, increment: 1 };
    this.awaitingFeedbackParams = { start: 0, end: this.Awaiting_Feedback.length, interval: 200, increment: 1 };
    this.urgentParams = { start: 0, end: this.urgentTasks.length, interval: 200, increment: 1 };
    this.toDoParams = { start: 0, end: this.To_Do.length, interval: 200, increment: 1 };
    this.doneParams = { start: 0, end: this.Done.length, interval: 200, increment: 1 };
  }

  animateWelcomeScreen() {
    setTimeout(() => {
      this.setParams();
      this.showWelcomeScreen = false;
    }, 1500);
  }
}
