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

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewTaskComponent {

  constructor(
    public addEditTask: EditAddTaskService
  ) {
    this.addEditTask.loadDataContacts();
  }
}
