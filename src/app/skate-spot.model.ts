export class SkateSpot {
  constructor(
    public name: string,
    public image: string,
    public lat: string,
    public lon: string,
    public features: string[],
    public notes: string[],
    public comments: string[],
    public stokeMeter: number,
    public fiveOMeter: number
  ) { }
}
