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
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10,25,100];
   @ViewChild(MatPaginator) paginator: MatPaginator;
   dataSource = todo.slice(0,this.pageSize);
   pageIndex = 0

   goToPage($event){
    this.length = $event.length;
    this.pageSize =$event.pageSize;
    this.dataSource = todo.slice(this.pageSize* $event.pageIndex,this.pageSize* $event.pageIndex+this.pageSize);
    this.pageIndex = $event.pageIndex;
   }

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
      data: {name: 'this.name', animal: 'this.animal'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reload();
      this.firstPage();

    });
  }

  remove(id:number){
    alert('delete')
    TodoService.remove(id);
    this.reload();
    this.firstPage();
  }


}