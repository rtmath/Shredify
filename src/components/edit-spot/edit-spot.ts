import { Component, OnInit, Input } from '@angular/core';
import { SkateSpot } from '../../app/skate-spot.model';
import { SkateSpotService } from '../../app/skate-spot.service';
import { FeatureModel } from '../../app/feature-model';

/*
  Generated class for the EditSpot component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'edit-spot',
  templateUrl: 'edit-spot.html'
})
export class EditSpotComponent implements OnInit {

  @Input() features: FeatureModel;
  @Input() skateSpotToDisplay;
  @Input() skateSpotToDisplayKey: string;

  constructor(public skateSpotService: SkateSpotService) {

  }

  ngOnInit() {

  }

  update(newName: string, newImage:string, newNotes:string, newComments:string, newStokeMeter:number, newfiveOMeter:number, keyId: string){
    var newLat:number = 45.523064;
    var newLon:number = -122.676483;

    var newSkateSpot: SkateSpot = new SkateSpot(newName,
      newLat,
      newLon,
      this.features,
      newImage,
      newNotes,
      newComments,
      newStokeMeter,
      newfiveOMeter);
     this.skateSpotService.updateSpot(newSkateSpot, keyId);
  }

}
