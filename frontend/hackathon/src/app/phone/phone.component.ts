import { Component, OnInit } from '@angular/core';
import { Koordinate, User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  user?:User
  lat?:number
  lng?:number
  constructor(private userService: UserService, private router: Router) { }

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

  ngOnInit(): void {
    //if(!this.userService.ua.includes("Android") || !this.userService.isLoggedin()){this.router.navigateByUrl("");}
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    })
  }

}
