import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { UserToken } from '../user';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  error?: string

  signIn(email: string, password: string){
    this.userService.logIn({email, password} as User).subscribe({next: (v : UserToken) => console.log(v.token), error: (e) => this.error = e.error});
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
