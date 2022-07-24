import { Component, OnInit } from '@angular/core';
import { Koordinate, User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HeatMapService } from '../heat-map.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  user?:User
  lat?:number
  lng?:number
  constructor(private userService: UserService, private router: Router, private heatMapService: HeatMapService) { }

  prijaviLokaciju(): void{
    this.addTrash(this.lat!, this.lng!);
    this.change();
  }

  addTrash(lat: number, lng: number){
    this.userService.addTrash({lat, lng} as Koordinate).subscribe();
  }

  change(){
    this.router.navigateByUrl("/stanjeZagadenja");
  }

  heatMap(){
    for(let i = 0; i < 20; i++){
      this.addTrash(this.heatMapService.heatMap[i].lat, this.heatMapService.heatMap[i].lng)
    }
  }

  ngOnInit(): void {
    //if(!this.userService.ua.includes("Android") || !this.userService.isLoggedin()){this.router.navigateByUrl("");}
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    })
    this.heatMapService.generate();

  }

}
