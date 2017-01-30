import { Component, Input } from '@angular/core';
import { SkateSpot } from '../../app/skate-spot.model';

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

  constructor() {

  }

}
