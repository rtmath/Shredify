import { Injectable, Pipe } from '@angular/core';
import { FeatureModel } from '../app/feature-model';
import { SkateSpot } from '../app/skate-spot.model';

@Pipe({
  name: 'filter',
  pure: false
})

@Injectable()
export class FeatureFilter {

  transform(spots: SkateSpot[], features: FeatureModel) {
    if (spots != null && features != null) {
      let output: SkateSpot[] = [];

      spots.forEach((elem) => {
        let match = true;
        for (var property in features) {
          if (match && features.hasOwnProperty(property)) {
            if (features[property] === true) {
              if (elem.features[property] != features[property]) {
                match = false;
              }
            }
          }
        }
        if (match) {
          output.push(elem);
        }
      })
      return output;
    } else {
      return spots;
    }
 }
}
