import { TestBed } from '@angular/core/testing';

import { AddTaskDataService } from './add-task-data.service';

describe('AddTaskDataService', () => {
  let service: AddTaskDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTaskDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
