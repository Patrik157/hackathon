import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private heroesUrl = "api/";

  httpOptions = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  };

  signUp(user: User): Observable<User>{
    return this.http.post<User>(this.heroesUrl, user, this.httpOptions);
  }
  constructor(private http: HttpClient) { }
}
