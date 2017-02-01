import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SkateSpotService } from '../../app/skate-spot.service';
import { SkateSpot } from '../../app/skate-spot.model';
import { FirebaseListObservable } from 'angularfire2';
import { FeatureModel } from '../../app/feature-model';
import { FeatureFilter } from '../../pipes/feature-filter';

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {
  lat: number = 45.523064;
  lng: number = -122.676483;
  clickedLat: number;
  clickedLon: number;
  zoom: number = 12;
  text: string;
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

  @Output() locSender = new EventEmitter();

  newSpot = null;
  newSpotDraggable = false;

  iconImg = "https://firebasestorage.googleapis.com/v0/b/skater-app-1d3e8.appspot.com/o/green-marker.png?alt=media&token=c174654d-9086-44a9-b484-0cdf57572797";

  spots: SkateSpot[] = [];

  constructor(public service: SkateSpotService) {

  }

  ngOnInit() {
    this.service.getSpots().subscribe(data => {
      data.forEach((elem) => {
        this.spots.push(elem);
      })
    });
  }

  mapClick(event) {
    if (this.newSpot === null) {
      this.clickedLat = event.coords.lat;
      this.clickedLon = event.coords.lng;
      this.newSpot = {
        lat: event.coords.lat,
        lon: event.coords.lng,
        draggable: true,
        open: false
      }
      var coords = {
        lat: this.clickedLat,
        lon: this.clickedLon
      }
      this.locSender.emit(coords)
    }
  }

  updateLoc(event) {
    this.clickedLat = event.coords.lat;
    this.clickedLon = event.coords.lng;
    var coords = {
      lat: this.clickedLat,
      lon: this.clickedLon
    };
    this.locSender.emit(coords)
  }

}
