import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  error?: string
  toggleVerification: boolean = false

  signup(username: string, email:string, password:string){
    this.userService.signUp({username, email, password} as User).subscribe({next: (v) => this.toggleVerification = true, error: (e) => this.error = e.error});
  }

  verify(verification: string){
    this.userService.verify(verification).subscribe();
  }

  constructor(private userService:UserService, private location: Location) { }

  ngOnInit(): void {
  }

}
