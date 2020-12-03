import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from 'src/app/app.person';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-component.html',
  styleUrls: ['./todo-component.css']
})
export class TodoCompnent implements OnInit {

  @Input() person: Person;
  @Output() deleteme: EventEmitter<Person> = new EventEmitter<Person>();

  constructor() {
  }

  ngOnInit(): void {

  }

  getImage(person): string {
    if (person.gender == "M") {
      return 'assets/man.png';
    }

    return 'assets/female.png';
  }

  onDelete(): void {
    this.deleteme.emit();
  }
}
