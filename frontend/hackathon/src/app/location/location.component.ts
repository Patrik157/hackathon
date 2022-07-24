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
    {lat: 45.361006392722665, lng: 14.46103480742586},
    {lat: 45.343747791015495, lng: 14.415796578500297},
    {lat: 45.3786276457146, lng: 14.456053355877632},
    {lat: 45.32138300850355, lng: 14.47767524685327},
    {lat: 45.35605863245069, lng: 14.47458374964505},
    {lat: 45.348034959733276, lng: 14.437379358101492},
    {lat: 45.384307272066756, lng: 14.36253751578367},
    {lat: 45.35442609024473, lng: 14.396265861223759},
    {lat: 45.36894407235947, lng: 14.430723189418844},
    {lat: 45.325907224816355, lng: 14.483720001718515},
    {lat: 45.37025081305854, lng: 14.417347166824698},
    {lat: 45.38461805978712, lng: 14.38565399982592},
    {lat: 45.373451519811674, lng: 14.354824513059285},
    {lat: 45.36352998597223, lng: 14.48656188238422},
    {lat: 45.36370066892241, lng: 14.470139457147221},
    {lat: 45.32977198293515, lng: 14.470139457147221},
    {lat: 45.32977198293515, lng: 14.470139457147221},
    {lat: 45.32977198293515, lng: 14.470139457147221},
    {lat: 45.32977198293515, lng: 14.470139457147221},
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
