import { Component, OnInit } from '@angular/core';


declare var ol: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  lat?: number
  lng?: number
  map: any;

  getUserLocation(): void{
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;


      var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(ol.proj.fromLonLat([this.lng, this.lat]))
                })
            ]
        })
    });

      this.map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }), layer]});

        var view = this.map.getView();
        view.setCenter(ol.proj.fromLonLat([this.lng, this.lat]));
        view.setZoom(18);
    })
  }

  constructor() { }

  ngOnInit(): void {
    this.getUserLocation()
  }


}
