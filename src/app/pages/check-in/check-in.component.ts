import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NFC } from 'nfc-pcsc';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit {
  public checkForm: FormGroup;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkForm = new FormGroup({
      course: new FormControl('', Validators.required),
      uid: new FormControl(''),
    });
  }

  public checkInStudent() {
    const nfc = new NFC();
    nfc.on('reader', (reader) => {
      reader.on('card', (card) => {
        console.log(`${reader.reader.name}  card detected`, card);
      });
    });
    this.authService.loginAnom(
      this.checkForm.value.uid,
      this.checkForm.value.course
    );
    this.checkForm.reset();
  }
}
