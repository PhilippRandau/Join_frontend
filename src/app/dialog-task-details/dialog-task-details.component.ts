import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { HandleDataService } from '../services/handle-data.service';

@Component({
  selector: 'app-dialog-task-details',
  templateUrl: './dialog-task-details.component.html',
  styleUrls: ['./dialog-task-details.component.scss']
})
export class DialogTaskDetailsComponent {
  constructor(@Inject(
    MAT_DIALOG_DATA) public data: any,
    public dialogRef: DialogRef,
    private handleData: HandleDataService
    ) {
    console.log('Task detail data: ', data.task);
  }

  async subtaskChangedCheckbox(subtask){    
    let response: any = await this.handleData.updateData(`/subtasks/${subtask.id}/`, subtask);
    console.log(response);
  }
}
