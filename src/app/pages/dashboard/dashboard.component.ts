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
    this.emitService.uniData.subscribe((data) => {
      this.adminName = data;
    });
  }

  public async getAdmin() {
    const adminData = await localStorage.getItem('admininfo');
    this.adminData = JSON.parse(adminData);
  }
}
