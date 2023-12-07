import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { HandleDataService } from '../services/handle-data.service';
import { TasksDetailsService } from '../services/tasks-details.service';

@Component({
  selector: 'app-dialog-task-details',
  templateUrl: './dialog-task-details.component.html',
  styleUrls: ['./dialog-task-details.component.scss']
})
export class DialogTaskDetailsComponent {
  constructor(    
    public dialogRef: DialogRef,
    private handleData: HandleDataService,
    public tasksDetails: TasksDetailsService
  ) {
    console.log('Task detail data: ', tasksDetails.currentTaskData);
  }

  async subtaskChangedCheckbox(subtask) {
    let response: any = await this.handleData.updateData(`/subtasks/${subtask.id}/`, subtask);
    console.log(response);
  }

  async deleteTask() {
    this.dialogRef.close();
    this.deleteTaskLocal();

    await this.handleData.deleteData(`/tasks/${this.tasksDetails.currentTaskData.id}/`);
  }

  deleteTaskLocal() {
    const currentTasksSection = this.tasksDetails.currentTaskData.section;
    const currentTasksID = this.tasksDetails.currentTaskData.id;
    const taskIndex = this.tasksDetails[currentTasksSection].findIndex(task => task.id === currentTasksID);
    this.tasksDetails[currentTasksSection].splice(taskIndex, 1);
  }
}
