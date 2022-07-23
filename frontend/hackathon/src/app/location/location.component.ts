import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  lat?: number;
  lng?: number;

  getUserLocation(): void{
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    })
  }

  constructor() { }

  ngOnInit(): void {
    this.getUserLocation();
  }

}
