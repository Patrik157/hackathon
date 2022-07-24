import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserToken } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "https://localhost:7187/api/users";
  private user?:User;
  private loggedin:boolean = false;
  private userlvl:number = -1;
  ua = navigator.userAgent;
  private loginError?: string


  private httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  signUp(user: User): Observable<User>{
    const url = this.userUrl + "/Register";
    return this.http.post<User>(url, user, this.httpOptions);
  }

  searchHeroes(term: string): Observable<User[]> {
    if(!term.trim()) {return of([]);}
    return this.http.get<User[]>(`${this.userUrl}/?name=${term}`);
  }

  isLoggedin():boolean{
    return this.loggedin;
  }

  getUserlvl(){
    return this.userlvl;
  }

  logIn(user: User){
    const url = this.userUrl + "/Login";
    this.http.post<UserToken>(url, user, this.httpOptions).subscribe({next: (v : UserToken) => {
      this.loggedin = true;
      this.loginError = undefined;
      this.httpOptions.headers = this.httpOptions.headers.append("Authorization", `Bearer ${v.token}`);
      this.user = v.user;
      this.userlvl = v.user.role
      if(this.ua.includes("Android")){
        this.router.navigateByUrl("/prijaviSmece");
      }
      else {this.router.navigateByUrl("/stanjeZagadenja");}
    }, error: (e) => this.loginError = e.error});
    return this.loginError;
  }

  constructor(private http: HttpClient, private router: Router) {}

}
