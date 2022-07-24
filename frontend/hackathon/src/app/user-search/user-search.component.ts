import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../user';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users$!: Observable<User[]>;
  private searchTerms = new Subject<string>();

  constructor(private userService: UserService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),        //ceka 300ms prije novog prosljedivanja
      distinctUntilChanged(),   //prosljeduje samo ako je drugacije nego zadnji put
      switchMap((term: string) => this.userService.searchHeroes(term))  //promjeni prikazane rezultate
    );
  }

}
