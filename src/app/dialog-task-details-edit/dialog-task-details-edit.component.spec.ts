import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTaskDetailsEditComponent } from './dialog-task-details-edit.component';

describe('DialogTaskDetailsEditComponent', () => {
  let component: DialogTaskDetailsEditComponent;
  let fixture: ComponentFixture<DialogTaskDetailsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogTaskDetailsEditComponent]
    });
    fixture = TestBed.createComponent(DialogTaskDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
