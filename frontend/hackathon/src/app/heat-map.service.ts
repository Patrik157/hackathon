import { Injectable } from '@angular/core';
import { Koordinate, User  } from './user';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class HeatMapService {
  heatMap: Koordinate[] = [];

  generate(){
    for(let i = 0; i < 20; i++){
      let lat = Math.random()*(14.523287- 14.334288) + 14.334288
      let lng = Math.random()*(45.385354 - 45.316470) + 45.316470
      let temp: Koordinate = {lat: lat, lng: lng };
      this.heatMap.push(temp);
    }
  }

  constructor(private userService:UserService) { }
}
