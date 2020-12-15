import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { TodoService } from 'src/app/app.todo.service';
import { AddtodoComponent } from '../addTodo/addTodo.component';
import {todo} from '../../../app/parts/interface/todo'
import { DomSanitizer } from '@angular/platform-browser';


const todo: todo[] = TodoService.getAllTodo();


@Component({
selector: 'list-component',
templateUrl: './list.component.html',
styleUrls: ['./list.component.css']
})
export class List  {


  search:string;

  filter(searchString:string){
    this.dataSource=TodoService.getAllTodo().filter(
      todo=> todo.person.indexOf(searchString)!=-1||
      todo.descripton.indexOf(searchString)!=-1||
      todo.priority ==1 && ('Major'.indexOf(searchString))!=-1||
      todo.priority ==2 && ('Medium'.indexOf(searchString))!=-1||
      todo.priority ==3 && ('Minor'.indexOf(searchString))!=-1||
      todo.priority !=1 && todo.priority !=2 &&todo.priority !=3 && ('None'.indexOf(searchString))!=-1 ||
      (todo.length.toString()+" Stunden") .indexOf(searchString)!=-1      
      )
  }
  constructor(public dialog: MatDialog) {}


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