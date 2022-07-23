import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserToken } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = "https://localhost:7187/api/users";

  //'Authorization': `Bearer ${auth_token}`
  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  signUp(user: User): Observable<User>{
    const url = this.userUrl + "/Register";
    return this.http.post<User>(url, user, this.httpOptions);
  }

  logIn(user: User){
    const url = this.userUrl + "/Login";
    return this.http.post<UserToken>(url, user, this.httpOptions);
  }

  getUser(){
    return this.http.get<User>(this.userUrl, this.httpOptions);
  }

  constructor(private http: HttpClient) {}

}
