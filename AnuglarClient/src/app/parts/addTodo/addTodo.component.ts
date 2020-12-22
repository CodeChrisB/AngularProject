import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'src/app/app.todo.service';
import { todo } from '../interface/todo';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Inject } from '@angular/core';


@Component({
selector: 'addTodo-component',
templateUrl: './addTodo.component.html',
styleUrls: ['./addTodo.component.css']
})


export class AddtodoComponent implements OnInit {

   

    getColor() :string{
        if(this.todo.priority==1)
          return 'red';
        if(this.todo.priority==2)
          return '#FF8800';
        if(this.todo.priority==3)
          return 'green';
        if(this.todo.priority==4)
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

todo : todo = {id:0,person:"Chris",description:"",priority:1,length:1}
constructor(public dialogRef: MatDialogRef<AddtodoComponent>,public todoService: TodoService,   @Inject(MAT_DIALOG_DATA) public data: any) { }

addTodo(){

if(this.updateTodo)
{
  this.todoService.findAll().subscribe(data=>console.dir(data.length))
  if(this.todo.person=="" ||this.todo.description =="")
      return

  this.todoService.update(this.todo).subscribe(data=>{
  this.dialogRef.close('Close');
 })


}else{
  this.todoService.findAll().subscribe(data=>console.dir(data.length))
  if(this.todo.person=="" ||this.todo.description =="")
      return

  this.todoService.addTodo(this.todo).subscribe(data=>{
  this.dialogRef.close('Close');
 })

}
 

  
   
}

/*person:string;
descripton:string;
priority:number =4;
urgency:string;
length:number; */
  isUpdate =false;
  updateTodo: todo;
  ngOnInit() {
    if(this.data!=null){
      this.isUpdate=true;
      this.todo = this.data;
    }
  }

}




