import { Injectable } from '@angular/core';
import { SkateSpot } from './skate-spot.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()

export class SkateSpotService {
  skatespots: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.skatespots = angularFire.database.list('skatespots');
  }

  getSpots() {
    return this.skatespots;
  }
}
