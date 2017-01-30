import { Component, OnInit } from '@angular/core';
import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';
import { EditSpotComponent } from '../../components/edit-spot/edit-spot';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SkateSpotService]
})
export class HomePage implements OnInit {

  skatespots: FirebaseListObservable<any[]>;
  skateSpotToDisplay;

  constructor(public navCtrl: NavController, public skateSpotService: SkateSpotService) {

  }

  ngOnInit() {
    this.skatespots = this.skateSpotService.getSpots();
  }

  editSpot(key: string) {
    this.skateSpotToDisplay = this.skateSpotService.getSkateSpot(key);
  }

  deleteSpot(key: string) {
    this.skateSpotService.deleteSpot(key);
  }

}
