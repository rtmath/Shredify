import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';
import { FeatureModel } from '../../app/feature-model';
import firebase from 'firebase';
import { Camera, CameraOptions, ScreenOrientation } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Geolocation } from 'ionic-native';

@Component({
  selector: 'add-spot',
  templateUrl: 'add-spot.html',
  providers: [SkateSpotService]
})
export class AddSpotComponent {

  selectLocationType = true;

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



  constructor(private skateSpotService: SkateSpotService, public navCtrl: NavController) {
    this.text = 'Hello World';
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

     this.navCtrl.push(HomePage)
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
          // alert(currentLat + currentLon);
    });
  }


  takePicture(){
    ScreenOrientation.lockOrientation('landscape');
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
        this.currentImage = "data:image/jpeg;base64," + imageData;
        ScreenOrientation.unlockOrientation();
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
      // alert(url);

      this.currentImageUrl = url;

      this.secondForm = true;
      this.firstForm = null;

      // imageRef.getDownloadURL().then(function(url) {
      //   alert(url);
      //
      // });
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

  // nextForm1() {
  //
  //   this.secondForm = true;
  //   this.firstForm = null;
  // }

  nextForm2() {
    this.secondForm = null;
    this.thirdForm = true;
  }

  // imageURL(url) {
  //   alert("2" + url.downloadURL);
  //   alert("3" + url);
  // }




}
