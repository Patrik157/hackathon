import { Injectable } from '@angular/core';
import { User } from './user';
import { Koordinate } from './user';
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


   httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  signUp(user: User): Observable<User>{
    const url = this.userUrl + "/Register";
    return this.http.post<User>(url, user, this.httpOptions);
  }

  addTrash(koordinate: Koordinate) {
    const url = "https://localhost:7187/api/cords";
    return this.http.post<Koordinate>(url, koordinate, this.httpOptions);
  }

  searchHeroes(term: string): Observable<User[]> {
    if(!term.trim()) {return of([]);}
    return this.http.get<User[]>(`${this.userUrl}/?name=${term}`);
  }

  verify(verification: string){
    const url = this.userUrl + `/Confirm/${verification}`;
    return this.http.post(url, this.httpOptions);
  }

  isLoggedin():boolean{
    return this.loggedin;
  }

  getUserlvl(){
    return this.userlvl;
  }

  logIn(user: User){
    const url = this.userUrl + "/Login";
    this.http.post<User>(url, user, this.httpOptions).subscribe(u => {
      this.user = u
      this.loggedin = true;
      if(this.ua.includes("Android")){this.router.navigateByUrl("/prijaviSmece");}
        else{this.router.navigateByUrl("/stanjeZagadenja");}
    })
  }

  constructor(private http: HttpClient, private router: Router) {}

}
