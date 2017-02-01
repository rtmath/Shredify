import { Component, Input } from '@angular/core';
import { SkateSpot } from '../../app/skate-spot.model';
import { FirebaseListObservable } from 'angularfire2';
import { FeatureModel } from '../../app/feature-model';
import { FeatureFilter } from '../../pipes/feature-filter';

@Component({
  selector: 'spot-detail-map-view',
  templateUrl: 'spot-detail-map-view.html'
})
export class SpotDetailMapViewComponent {
  @Input() markerLat: number;
  @Input() markerLon: number;
  lat: number = 45.523064;
  lng: number = -122.676483;
  @Input() spot;
  zoom: number = 14;
  @Input() testFilter: FeatureModel = {
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


  constructor() {

  }

}
