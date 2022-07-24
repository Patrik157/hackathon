import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-stanje-zagadenja',
  templateUrl: './stanje-zagadenja.component.html',
  styleUrls: ['./stanje-zagadenja.component.css']
})
export class StanjeZagadenjaComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
