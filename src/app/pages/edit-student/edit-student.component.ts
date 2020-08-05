import { Router, ActivatedRoute } from '@angular/router';
import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  public imgSelected = null;
  public studentData = {
    prefix: '',
    fname: '',
    lname: '',
    mname: '',
    address: '',
    indexnum: '',
    program: '',
    year: '',
    course: '',
    code: '',
  };
  public imgSelectedSRC = '';
  userKey: any;
  constructor(private funcService: FuncService, private activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe(params => {
      this.userKey = params.id;
    });
  }

  ngOnInit() {
    this.getStudentSingle();
  }

  public selectImage(ev) {
    const reader = new FileReader();
    if (ev.target.files && ev.target.files.length) {
      const [file] = ev.target.files;
      this.imgSelected = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgSelectedSRC = reader.result as string;
      };
    }
  }

  public editStudent() {
    this.funcService.editStudent(this.studentData);
  }


  public getStudentSingle() {
    setTimeout(() => {
      console.log(this.userKey);
      this.funcService.getStudent(this.userKey).subscribe(data => {
        data.map(res => {
          let resdata: any;
          resdata = res;
          this.studentData = resdata;
          this.imgSelectedSRC = resdata.photourl;
        });
      });
    }, 1000);
  }
}
