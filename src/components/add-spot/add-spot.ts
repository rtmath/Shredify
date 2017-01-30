import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';

/*
  Generated class for the AddSpot component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'add-spot',
  templateUrl: 'add-spot.html',
  providers: [SkateSpotService]
})
export class AddSpotComponent {

  text: string;

  constructor(private skateSpotService: SkateSpotService) {
    this.text = 'Hello World';
  }

  submitForm(newName: string, newImage:string, newFeatures:string, newNotes:string, newComments:string, newStokeMeter:number, newfiveOMeter:number){

    var newLat:string = "15";
    var newLon:string = "25";
    
    var newSkateSpot: SkateSpot = new SkateSpot(newName,
      newLat,
      newLon,
      newFeatures,
      newImage,
      newNotes,
      newComments,
      newStokeMeter,
      newfiveOMeter);
     this.skateSpotService.addSkateSpot(newSkateSpot);
  }

}
