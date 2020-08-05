import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  adminData: any;

  constructor() { }

  ngOnInit(): void {
    this.getAdmin();
  }

  public async getAdmin() {
    const adminData = await localStorage.getItem('admininfo');
    this.adminData = JSON.parse(adminData);
  }
}
