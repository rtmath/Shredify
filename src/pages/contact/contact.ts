import { Component } from '@angular/core';
import { Camera, CameraOptions } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public currentImage: string;

  constructor(public navCtrl: NavController, public af: AngularFire) {

  }


  takePicture(){

    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
        this.currentImage = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }


  upload() {

    let storageRef = firebase.storage().ref();

    const filename = Math.floor(Date.now() / 1000);

    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.currentImage, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      this.successAlert();
    });


    imageRef.getDownloadURL().then(function(url) {
      alert(url);

    });

  }

  successAlert() {
    alert("Upload Successful!");
  }



}
