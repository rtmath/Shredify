import { FeatureModel } from './feature-model';

export class SkateSpot {
  constructor(
    public name: string,
    public lat: string,
    public lon: string,
    public features: FeatureModel,
    public image: string,
    public notes: string,
    public comments: string,
    public stokeMeter: number,
    public fiveOMeter: number
  ) { }
}