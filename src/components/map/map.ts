import { Component } from '@angular/core';


/*
  Generated class for the Map component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {
  lat: number = 45.523064;
  lng: number = -122.676483;
  markerLat: number = 45.4076;
  markerLng: number = -122.5704;
  clickedLat: number;
  clickedLon: number;
  zoom: number = 12;

  text: string;

  constructor() {

  }

  mapClick(event) {
    this.clickedLat = event.coords.lat;
    this.clickedLon =  event.coords.lng;
  }

}
