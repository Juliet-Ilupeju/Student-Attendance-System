import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.scss'],
})
export class ViewAttendanceComponent implements OnInit {
  public checkInData;
  constructor(private funcService: FuncService) {}

  ngOnInit(): void {}

  public getStudents() {
    this.funcService.getRegisteredStudents().subscribe((data) => {
      this.checkInData = data;
    });
  }
}
