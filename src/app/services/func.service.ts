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

    public addNewFeed(data, type) {
        this.uiService.showLoader();
        let newData = data;
        newData['createdAt'] = this.createdAt;
        newData['type'] = type;

        return this.firestore.collection('mainfeeds').add(newData).then((res) => {
            this.firestore.collection('mainfeeds').doc(res.id).update({
                feedKey: res.id
            });
            this.uiService.showSuccess('Feed Added Successfully');
            this.uiService.hideLoader();
        }).catch(err => {
            this.uiService.hideLoader();
            this.uiService.showError(err.message);
        });
    }

    public getNewsFeed(type) {
        return this.firestore.collection('mainfeeds', ref => ref.where('type', '==', type).orderBy('createdAt', 'desc')).valueChanges();
    }
    public deleteNewsFeed(key) {
        return this.firestore.collection('mainfeeds').doc(key).delete().then(() => {
            this.uiService.showSuccess('Feed Deleted Successfully');
        }).catch(err => {
            this.uiService.showError(err.message);
        })
    }

    public addAccount(data, file) {
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
}
