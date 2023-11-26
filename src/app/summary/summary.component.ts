import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HandleDataService } from '../services/handle-data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  constructor(
    private handleData: HandleDataService,
  ) {
    this.loadDataTasks();
  }
  sections: Array<string> = ['To_Do', 'In_Progress', 'Awaiting_Feedback', 'Done']
  tasks: any;
  To_Do: Array<any> = [];
  In_Progress: Array<any> = [];
  Awaiting_Feedback: Array<any> = [];
  Done: Array<any> = [];
  urgentTasks: Array<any>;
  prioUrgentTask: any;

  async loadDataTasks() {
    this.tasks = await this.handleData.getData('/summary/');
    console.log('tasks: ', this.tasks);
    this.sections.forEach(section => {
      this.filterTasks(section);
    });
    this.filterUrgentTasks();
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
}
