import { TestBed } from '@angular/core/testing';

import { EditAddTaskService } from './edit-add-task.service';

describe('EditAddTaskService', () => {
  let service: EditAddTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAddTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
