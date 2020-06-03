import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegStudentsComponent } from './reg-students.component';

describe('RegStudentsComponent', () => {
  let component: RegStudentsComponent;
  let fixture: ComponentFixture<RegStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
