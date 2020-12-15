import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddtodoComponent } from '../addTodo/addTodo.component';
import { List } from '../list/list.component';
import { TodoService } from 'src/app/app.todo.service';

@Component({
  selector: 'topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  constructor(public dialog: MatDialog) {}


  
  addTodo(){

   

    const dialogRef = this.dialog.open(AddtodoComponent, {
      width: '100%',
    });

  }

  ngOnInit(): void {
  }
}
