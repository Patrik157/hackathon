import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { UserToken } from '../user';
import { Router,NavigationStart} from '@angular/router';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  error?: string

  signIn(email: string, password: string){
    this.error = this.userService.logIn({email, password} as User)
  }

  constructor(private userService: UserService, private location: Location, private router: Router) { }

  ngOnInit(): void {
  }

}
