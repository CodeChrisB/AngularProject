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
  private findCurrentId() : number{
    var poped = this.personSevice.persons.pop();
    this.personSevice.persons.push(poped);
    if(poped == null)
    {
      return 1;
    }
    return poped.id + 1;
  }
  public personSevice: TodoService;

  constructor(ps: TodoService) {
    this.personSevice = ps;
  }

  ngOnInit(): void {
    this.personSevice.findAll();
  }
}
