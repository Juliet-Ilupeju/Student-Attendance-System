import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { FuncService } from './services/func.service';
import { ToastService } from './services/toast.service';
import { UiService } from './services/ui.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewStudentComponent } from './pages/view-student/view-student.component';
import { AddStudentComponent } from './pages/add-student/add-student.component';
import { ViewAttendanceComponent } from './pages/view-attendance/view-attendance.component';
import { RegStudentsComponent } from './pages/reg-students/reg-students.component';
import { SidenavComponent } from './misc/sidenav/sidenav.component';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { LoaderComponent } from './misc/loader/loader.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    DashboardComponent,
    ViewStudentComponent,
    AddStudentComponent,
    ViewAttendanceComponent,
    RegStudentsComponent,
    SidenavComponent,
    EditStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthGuard, AuthService, UiService, ToastService, FuncService],
  bootstrap: [AppComponent]
})
export class AppModule { }
