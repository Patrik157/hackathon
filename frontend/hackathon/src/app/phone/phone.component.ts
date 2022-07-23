import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent implements OnInit {
  user?:User[]

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.userService.httpOptions.headers);
    this.userService.getUsers().subscribe(users => console.log(users));
  }

}
