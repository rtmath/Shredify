import { Component } from '@angular/core';
import { MapMarker } from '../../app/map-marker.model';
import { MARKERS } from '../../app/markers';

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class MapComponent {
  lat: number = 45.523064;
  lng: number = -122.676483;
  markerLat: number = 45.5210;
  markerLng: number = -122.6541;
  clickedLat: number;
  clickedLon: number;
  zoom: number = 12;
  infoWindow: boolean = false;
  markers: MapMarker[] = [];
  text: string;
  currentMarker: MapMarker = null;

  constructor() {
    MARKERS.forEach((elem) => {
      this.markers.push(elem);
    })
  }

  mapClick(event) {
    if (this.currentMarker === null) {
      this.clickedLat = event.coords.lat;
      this.clickedLon =  event.coords.lng;
      var newMarker = new MapMarker(this.clickedLat, this.clickedLon, this.markers.length, "S", true, true, true);
      this.markers.push(newMarker);
      this.currentMarker = newMarker;
    }
  }

  setMarker(title) {
    this.markers.forEach((elem)=> {
      if (elem.title === title) {
        this.currentMarker = elem;
      }
    })
  }

}
