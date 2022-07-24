import { Component, OnInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { MapHeatmapLayer } from '@angular/google-maps';
import { Koordinate } from '../user';
import { HeatMapService } from '../heat-map.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  /*
  center!: google.maps.LatLngLiteral
  map: any;
  marker!: MapMarker*/

  /*
  click(event: google.maps.MapMouseEvent){
    let a:string[] = JSON.stringify(event.latLng?.toJSON()).split(":").filter(b => b.includes("4"));
    let lt = Number(a[0].split(",").filter(b => b.includes("4")));
    let lg = Number(a[1].split("}").filter(b => b.includes("4")));
  }*/

  center!: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = {draggable: false, clickable: true};
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng?.toJSON()!);
    let a:string[] = JSON.stringify(event.latLng?.toJSON()).split(":").filter(b => b.includes("4"));
  }
  marker(event: google.maps.MapMouseEvent){
    this.markerPositions = this.markerPositions.filter(m => ((m.lat !== event.latLng?.toJSON().lat)&&(m.lng !==event.latLng?.toJSON().lat)));
  }

  kor:Koordinate = {lat: 1, lng: 13}

  heatmapOptions = {radius: 20};
  heatmapData =[
    {lat: 45.3285048047716, lng: 14.469356252114872},
    {lat: 45.32884423027377, lng: 14.469860507409672},
    {lat: 45.32927416632327, lng: 14.470590068261723},
    {lat: 45.32977198293515, lng: 14.470139457147221},
  ];

  constructor(private userService: UserService,private heatMapService: HeatMapService) { }

  click(){
    return this.userService.heatMap;
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }
  //heatmapData = this.click()
}
