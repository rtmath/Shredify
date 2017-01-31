export class MapMarker {
  constructor(
    public markerLat: number,
    public markerLon: number,
    public title: number,
    public label: string,
    public isDraggable: boolean,
    public openInfoWindow: boolean,
    public infoWindow: boolean)
    { }
}
