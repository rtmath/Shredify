import { Component, OnInit } from '@angular/core';
import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';
import { EditSpotComponent } from '../../components/edit-spot/edit-spot';
import { MapComponent } from '../../components/map/map';
import { MapViewComponent } from '../../components/map-view/map-view';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController } from 'ionic-angular';
import { FeatureModel } from '../../app/feature-model'
import { FeatureFilter } from '../../pipes/feature-filter';
import { DetailPage } from '../detail/detail';
import { AddSpotComponent } from '../../components/add-spot/add-spot';
import { Geolocation } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SkateSpotService]
})
export class HomePage implements OnInit {
  showMapVar: boolean = false;
  showFeaturesVar: boolean = true;
  skatespots: SkateSpot[] = [];
  filteredSpots: SkateSpot[] = [];
  skateSpotToDisplay;
  skateSpotToDisplayKey: string = "";
  features: FeatureModel;
  testFilter: FeatureModel = {
      stairs: false,
      rails: false,
      mannypad: false,
      gap: false,
      ledge: false,
      bank: false,
      wallride: false,
      drop: false,
      transitions: false
  }

  constructor(public navCtrl: NavController, public skateSpotService: SkateSpotService) {

  }

  ngOnInit() {
    this.skateSpotService.getSpots().subscribe(data => {
      data.forEach(elem => {
        this.skatespots.push(elem);
        this.filteredSpots.push(elem);
      })
    });
  }

  editSpot(key: string) {
    this.skateSpotToDisplay = this.skateSpotService.getSkateSpot(key);
    this.skateSpotService.getSkateSpot(key).subscribe(dataEmitted => {
      this.features = dataEmitted.features;
    })
  }

  deleteSpot(key: string) {
    this.skateSpotService.deleteSpot(key);
  }



  viewSpot(spot){
    this.navCtrl.push(DetailPage, {
      spot:spot
    })
  }

  newSpot() {
    this.navCtrl.push(AddSpotComponent);
  }
  showMap(){
    this.showMapVar = true;
    this.showFeaturesVar = false;
  }
  showFeatures(){
    this.showFeaturesVar = true;
    this.showMapVar = false;
  }

  toggleValue(name: string) {
    this.testFilter[name] = (this.testFilter[name]) ? false : true;
    this.filterMap();
  }

  getPropValue(name: string) {
    return (this.testFilter[name]);
  }

  filterMap() {
      if (this.skatespots != null && this.testFilter != null) {
        let output: SkateSpot[] = [];

        this.skatespots.forEach((elem) => {
          let match = true;
          for (var property in this.testFilter) {
            if (match && this.testFilter.hasOwnProperty(property)) {
              if (this.testFilter[property] === true) {
                if (elem.features[property] != this.testFilter[property]) {
                  match = false;
                }
              }
            }
          }
          if (match) {
            output.push(elem);
          }
        })
        this.filteredSpots = [];
        output.forEach((elem) => {
          this.filteredSpots.push(elem);
        })
      } else {
        this.filteredSpots = [];
        this.skatespots.forEach((elem) => {
          this.filteredSpots.push(elem);
        })
      }
  }
}
