import { Component, OnInit } from '@angular/core';
//import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SkateSpotService]
})
export class HomePage implements OnInit {

  skatespots: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public skateSpotService: SkateSpotService) {

  }

  ngOnInit() {
    this.skatespots = this.skateSpotService.getSpots();
  }

}
