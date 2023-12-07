import { TestBed } from '@angular/core/testing';

import { TasksDetailsService } from './tasks-details.service';

describe('TaskDetailsService', () => {
  let service: TasksDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
