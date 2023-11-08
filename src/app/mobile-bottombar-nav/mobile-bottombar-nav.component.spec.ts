import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileBottombarNavComponent } from './mobile-bottombar-nav.component';

describe('MobileBottombarNavComponent', () => {
  let component: MobileBottombarNavComponent;
  let fixture: ComponentFixture<MobileBottombarNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobileBottombarNavComponent]
    });
    fixture = TestBed.createComponent(MobileBottombarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
