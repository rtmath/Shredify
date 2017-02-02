import { Component, OnInit, Input } from '@angular/core';
import { SkateSpotService } from '../../app/skate-spot.service';
import { SkateSpot } from '../../app/skate-spot.model';
import { FirebaseListObservable } from 'angularfire2';
import { FeatureModel } from '../../app/feature-model';
import { FeatureFilter } from '../../pipes/feature-filter';
import { NavController } from 'ionic-angular';
import { DetailPage } from '../../pages/detail/detail';

@Component({
  selector: 'map-view',
  templateUrl: 'map-view.html'
})
export class MapViewComponent {
  lat: number = 45.523064;
  lng: number = -122.676483;
  zoom: number = 10;

  spots: SkateSpot[] = [];
  @Input() filteredSpots = [];

  constructor(public service: SkateSpotService, public navCtrl: NavController) {

  }

  ngOnInit() {

  }

  viewSpotDetails(spot) {
    this.navCtrl.push(DetailPage, {
      spot:spot
    })
  }

}
