import { UiService } from './ui.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
    providedIn: 'root'
})
export class FuncService {

    public createdAt = firebase.firestore.Timestamp.now().seconds;
    constructor(private firestore: AngularFirestore, private uiService: UiService, private storage: AngularFireStorage) { }

    public getRegisteredStudents() {
        return this.firestore.collection('studentProfile').valueChanges();
    }

    public delStudent(studID) {
        this.uiService.showLoader();
        return this.firestore.collection('studentProfile').doc(studID).delete().then(() => {
            this.uiService.hideLoader();
            this.uiService.showSuccess('Student Deleted Successfully');
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        });
    }

    public addStudent(data, file) {
        this.uiService.showLoader();
        return this.firestore.collection('studentProfile').add({
            prefix: data['prefix'],
            fname: data['fname'],
            lname: data['lname'],
            mname: data['mname'],
            address: data['address'],
            indexnum: data['indexnum'],
            program: data['program'],
            year: data['year'],
            course: data['course'],
            code: data['code'],
            fingerprint: '',
            createdAt: this.createdAt
        }).then((res) => {
            this.updateImage(res.id, file)
            this.uiService.hideLoader();
            this.uiService.showSuccess('Student Added Successfully');
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        })
    }

    public updateImage(key, file) {
        return this.storage.ref(`studentprofile/${key}`).put(file).then((data) => {
            data.ref.getDownloadURL().then((res) => {
                this.firestore.collection('studentProfile').doc(key).update({
                    photourl: res,
                    studentKey: key
                });
            });
        });
    }

    public editStudent(data, studID) {
        this.uiService.showLoader();
        return this.firestore.collection('studentProfile').doc(studID).update({
            prefix: data['prefix'],
            fname: data['fname'],
            lname: data['lname'],
            mname: data['mname'],
            address: data['address'],
            indexnum: data['indexnum'],
            program: data['program'],
            year: data['year'],
            course: data['course'],
            code: data['code'],
            fingerprint: '',
        }).then((res) => {
            this.uiService.hideLoader();
            this.uiService.showSuccess('Student Edited Successfully');
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        })
    }
}
