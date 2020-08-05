import { EmitterService } from './../../services/emitter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  adminData: any;
  adminName: string;
  constructor(private emitService: EmitterService) {}

  ngOnInit(): void {
    this.getAdmin();
    setTimeout(() => {
      this.emitService.uniData.subscribe((data) => {
        this.adminName = data;
      });
    }, 500);
  }

  public async getAdmin() {
    const adminData = await localStorage.getItem('adminData');
    this.emitService.changeUniData(adminData);
  }
}
