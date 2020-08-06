import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  public checkForm: FormGroup;
  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.checkForm = new FormGroup({
      course: new FormControl('', Validators.required),
      uid: new FormControl(''),
    });
  }

  public checkInStudent() {
    this.http.get('http://169.254.122.161:5000/read').subscribe((res) => {
      console.log(res);
    });
    this.authService.loginAnom(this.checkForm.value.uid, this.checkForm.value.course);
    this.checkForm.reset();
  }
}
