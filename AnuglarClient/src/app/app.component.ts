/* Robert Freiseisen  30.9.2020
   HTBLA Leonding     4BHIF */

import {Component, OnInit} from '@angular/core';
import {Person} from 'src/app/app.person';
import {TodoService} from './app.todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'PersonManager';
  public searchString: string = '';
  public actCountry: string = '';
  public imgUrl: string = '';
  public ncshow: boolean = true;
  public nsshow: boolean = true;
  public nlshow: boolean = true;


  public nc(){
    this.ncshow=!this.ncshow
  }
  
  
  public todoService: TodoService;

  constructor(ps: TodoService) {
    this.todoService = ps;
  }

  ngOnInit(): void {
    this.todoService.findAll();
  }
}
