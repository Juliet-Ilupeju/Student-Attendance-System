import { CheckInComponent } from './pages/check-in/check-in.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';
import { AuthGuard } from './guard/auth.guard';
import { ViewAttendanceComponent } from './pages/view-attendance/view-attendance.component';
import { ViewStudentComponent } from './pages/view-student/view-student.component';
import { RegStudentsComponent } from './pages/reg-students/reg-students.component';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'add_student', component: AddStudentComponent, canActivate: [AuthGuard]},
  {path: 'check-in', component: CheckInComponent},
  {path: 'edit_student/:id', component: EditStudentComponent, canActivate: [AuthGuard]},
  {path: 'register_student', component: RegStudentsComponent, canActivate: [AuthGuard]},
  {path: 'view_students', component: ViewStudentComponent, canActivate: [AuthGuard]},
  {path: 'view_attendance', component: ViewAttendanceComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
