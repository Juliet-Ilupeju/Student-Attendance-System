import { EmitterService } from './emitter.service';
import { UiService } from './ui.service';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adminuser;
  public createdAt = firebase.firestore.Timestamp.now().seconds;
  // tslint:disable-next-line:max-line-length
  constructor(
    public afauth: AngularFireAuth,
    public afs: AngularFirestore,
    public rt: Router,
    public toastS: ToastService,
    private emitService: EmitterService,
    private uiService: UiService
  ) { }
  public login(loginData) {
    this.uiService.showLoader();
    return this.afauth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(res => {
        console.log('logged');
        const adminuid = res.user.uid;
        this.authEmailCheck(loginData.email, adminuid);
      })
      .catch(err => {
        console.log('not not');
        this.uiService.hideLoader();
        this.toastS.mainError(err.message);
      });
  }
  public logout() {
    return this.afauth.signOut().then(() => {
      this.rt.navigate(['login']);
      localStorage.clear();
      window.location.reload();
    });
  }
  get authState(): any {
    return this.afauth.authState;
  }
  adminAuthUser() {
    return this.afauth.currentUser;
  }

  public authEmailCheck(email, adm) {
    firebase
      .firestore()
      .collection('admins')
      .where('email', '==', `${email}`)
      .get()
      .then(res => {
        console.log('not not');
        if (res.empty === true) {
          return this.afauth.signOut().then(() => {
            setTimeout(() => {
              this.toastS.mainError(`Cannot Login. Admins Only`);
              this.uiService.hideLoader();
            }, 1000);
          });
        } else {
          console.log('logged');
          this.rt.navigate(['dashboard']).then(() => {
            this.afs
              .collection('admins')
              .doc(`${adm}`)
              .valueChanges()
              .subscribe(data => {
                let mdata: any;
                mdata = data;
                const name = `${mdata.name}`;
                this.emitService.changeUniData(name);
                localStorage.setItem('adminData', name);
                this.toastS.mainSuccess(`Welcome ${name}`);
              });
            this.uiService.hideLoader();
          });
        }
      });
  }

  public loginAnom(uid, course) {
    
    // this.uiService.showLoader();
    // this.afauth.signInAnonymously().then(() => {
    //   this.afs.collection('studentProfile', ref => ref.where('indexnum', '==', `${uid}`)).get().toPromise().then((data) => {
    //     data.docs.map(userdata => {
    //       const mData = userdata.data();
    //       const name = `${mData.fname} ${mData.mname} ${mData.lname}`;
    //       this.userCheckIN(uid, name, course, this.createdAt, mData.studentKey);
    //     });
    //   });
    // });
  }

  public userCheckIN(id, name, course, time, key) {
    return this.afs
      .collection('attendance_checkin')
      .add({
        studentKey: key,
        stID: id,
        attendance_course: course,
        check_in_time: time,
        studentName: name,
      })
      .then(() => {
        this.uiService.showSuccess(`You're check-in successfully`);
        this.uiService.hideLoader();
      })
      .catch((err) => {
        this.uiService.hideLoader();
        this.toastS.mainError(err.message);
      });
  }
}
