import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';
import { FeatureModel } from '../../app/feature-model';
import firebase from 'firebase';
import { Camera, CameraOptions } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

/*
  Generated class for the AddSpot component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'add-spot',
  templateUrl: 'add-spot.html',
  providers: [SkateSpotService]
})
export class AddSpotComponent {

  secondForm = null;

  firstForm = true;

  thirdForm = null;



  features: FeatureModel = new FeatureModel(false, false, false, false, false, false, false, false, false);

  text: string;

  public currentImage: string;

  public currentImageUrl: string;


  constructor(private skateSpotService: SkateSpotService, public navCtrl: NavController) {
    this.text = 'Hello World';
  }

  submitForm(newName: string, newNotes:string, newComments:string, newStokeMeter:number, newfiveOMeter:number){

    var newLat:number = 45.523064;
    var newLon:number = -122.676483;
    var newFeatures = this.features;
    var image = this.currentImageUrl;

    var newSkateSpot: SkateSpot = new SkateSpot(newName,
      newLat,
      newLon,
      newFeatures,
      image,
      newNotes,
      newComments,
      newStokeMeter,
      newfiveOMeter);
      console.log(newSkateSpot);
     this.skateSpotService.addSkateSpot(newSkateSpot);

     this.navCtrl.push(HomePage)
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
      var url = snapshot.downloadURL;
      alert(url);

      this.currentImageUrl = url;

      // imageRef.getDownloadURL().then(function(url) {
      //   alert(url);
      //
      // });
    });
  }

  successAlert() {
    alert("Upload Successful!");
  }

  nextForm1() {

    this.secondForm = true;
    this.firstForm = null;
  }

  nextForm2() {
    this.secondForm = null;
    this.thirdForm = true;
  }

  // imageURL(url) {
  //   alert("2" + url.downloadURL);
  //   alert("3" + url);
  // }




}
