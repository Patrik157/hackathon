import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signup(username: string, email:string, password:string){
    this.userService.signUp({username, email, password} as User).subscribe({error: (e) => console.log(e)});
  }

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

}
