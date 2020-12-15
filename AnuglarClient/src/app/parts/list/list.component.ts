import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { TodoService } from 'src/app/app.todo.service';
import { AddtodoComponent } from '../addTodo/addTodo.component';
import {todo} from '../../../app/parts/interface/todo'



const todo: todo[] = TodoService.getAllTodo();


@Component({
selector: 'list-component',
templateUrl: './list.component.html',
styleUrls: ['./list.component.css']
})
export class List  {


  //init the data
  displayedColumns = ["Person","Description","Priority", "Length","Actions"];

  
   // MatPaginator Inputs
   length = todo.length;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   dataSource = todo;


   firstPage()
   {
    this.paginator.firstPage();
   }
   refresh(){
     this.dataSource=this.dataSource;
   }
   reload(){
    this.dataSource=TodoService.getAllTodo();
    this.length = this.dataSource.length;
    this.firstPage();
    this.refresh();
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  getColor(id:number) :string{
    if(id==1)
      return 'red';
    if(id==2)
      return '#FF8800';
    if(id==3)
      return 'green';
    return 'grey'
  }

  getPrior(id:number){
    if(id==1)
    return 'Major';
  if(id==2)
    return 'Medium';
  if(id==3)
    return 'Minor';
  return 'None'
  }

  constructor(public dialog: MatDialog) {}

  addTodo(){
    const dialogRef = this.dialog.open(AddtodoComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reload();
    });
  }

  remove(id:number){
    TodoService.remove(id);
  }


  sortName(){
   TodoService.sortName()
  }

  sortDescripton(){
    TodoService.sortDescripton();
  }

  sortPriority(){
    this.dataSource= this.dataSource.sort((a,b)=>a.priority < b.priority ? 0: 1 )
  }

  sortLength(){
    this.dataSource= this.dataSource.sort((a,b)=>a.length < b.length ? 1: 0 )
  }



}