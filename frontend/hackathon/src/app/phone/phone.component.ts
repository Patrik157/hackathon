import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.userService.httpOptions.headers);
  }

}
