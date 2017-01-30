import { Component, Input } from '@angular/core';
import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';

/*
  Generated class for the EditSpot component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'edit-spot',
  templateUrl: 'edit-spot.html'
})
export class EditSpotComponent {

  @Input() skateSpotToDisplay;

  constructor(public skateSpotService: SkateSpotService) {

  }

  update(newName: string, newImage:string, newFeatures:string, newNotes:string, newComments:string, newStokeMeter:number, newfiveOMeter:number, keyId: string){
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
     this.skateSpotService.updateSpot(newSkateSpot, keyId);
  }

}
