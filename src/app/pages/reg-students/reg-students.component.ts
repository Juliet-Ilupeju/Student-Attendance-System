import { UiService } from './../../services/ui.service';
import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reg-students',
  templateUrl: './reg-students.component.html',
  styleUrls: ['./reg-students.component.scss'],
})
export class RegStudentsComponent implements OnInit {
  public students;
  constructor(private funcService: FuncService, private uiService: UiService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  public getStudents() {
    this.funcService.getRegisteredStudents().subscribe((data) => {
      this.students = data;
      console.log(data);
    });
  }

  public editStudent(key) {
    this.uiService.goToEditStudent(key);
  }

  public delStudent(key) {
    console.log(key);
    this.funcService.delStudent(key);
  }
}
