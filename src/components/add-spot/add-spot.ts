import { Component, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';
import { FeatureModel } from '../../app/feature-model';
import firebase from 'firebase';
import { Camera, CameraOptions, ScreenOrientation } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Geolocation } from 'ionic-native';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'add-spot',
  templateUrl: 'add-spot.html',
  providers: [SkateSpotService]
})
export class AddSpotComponent {

  selectLocationType = true;

//set back to null
  addImageButton = true;

  useLocation = null;

  useMap = null;

  secondForm = null;

  firstForm = null;

  thirdForm = null;

  locationSelected = null;

  clickedLat: number;

  clickedLon: number;

  features: FeatureModel = new FeatureModel(false, false, false, false, false, false, false, false, false);

  text: string;

  public currentImage: string;

  public currentImageUrl: string;


  public currentImageGallery: string;


  constructor(private skateSpotService: SkateSpotService, public navCtrl: NavController) {

  }

  submitForm(newName: string, newNotes:string, newComments:string, newStokeMeter:number, newfiveOMeter:number){

    var newLat:number = this.clickedLat;
    var newLon:number = this.clickedLon;
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
      this.navCtrl.pop(HomePage)
  }

  setLocation(event) {
    this.locationSelected = true;
    this.clickedLat = event.lat;
    this.clickedLon = event.lon;
  }


  currentLocation() {
    Geolocation.getCurrentPosition().then((resp) => {
      var currentLat: number = resp.coords.latitude;
      var currentLon: number = resp.coords.longitude;
      this.clickedLat = currentLat;
      this.clickedLon = currentLon;
      this.selectLocationType = null;
      this.firstForm = true;
    });
  }


  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
        this.addImageButton = null;
        this.currentImage = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        alert("Upload Failed!")
    });
  }

  selectFromGallery() {
    var options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL
    };
    Camera.getPicture(options).then((imageData) => {
      this.currentImage = "data:image/jpeg;base64," + imageData;
      // this.photoSelected = true;
      // this.photoTaken = false;
    }, (err) => {

    });
  }


  upload() {

    let storageRef = firebase.storage().ref();

    const filename = Math.floor(Date.now() / 1000);

    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.currentImage, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
      this.successAlert();
      var url = snapshot.downloadURL;
      this.currentImageUrl = url;
      this.secondForm = true;
      this.firstForm = null;

    });
  }

  successAlert() {
    alert("Upload Successful!");
  }

  goToLocationForm() {
    this.selectLocationType = null;
    this.useLocation = true;
  }

  goToMapForm() {
    this.selectLocationType = null;
    this.useMap = true;
  }

  nextForm() {
    this.useMap = null;
    this.firstForm = true;
  }

  nextForm2() {
    this.secondForm = null;
    this.thirdForm = true;
  }

}
