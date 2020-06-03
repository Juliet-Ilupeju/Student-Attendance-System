import { UiService } from './../../services/ui.service';
import { FuncService } from './../../services/func.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  public addStudentForm: FormGroup;
  public imgSelected = null;
  public imgSelectedSRC = "";
  constructor(private funcService: FuncService, private uiService: UiService) { }

  ngOnInit() {
    this.addStudentForm = new FormGroup({
      prefix: new FormControl('', Validators.required),
      fname: new FormControl('', Validators.required),
      lname: new FormControl('', Validators.required),
      mname: new FormControl(''),
      address: new FormControl('', Validators.required),
      indexnum: new FormControl('', Validators.required),
      program: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
    });
  }

  public selectImage(ev) {
    const reader = new FileReader();
    if (ev.target.files && ev.target.files.length) {
      const [file] = ev.target.files;
      this.imgSelected = file;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgSelectedSRC = reader.result as string;
      }
    }
  }

  public addStudent() {
    this.funcService.addAccount(this.addStudentForm.value, this.imgSelected)
  }

}
