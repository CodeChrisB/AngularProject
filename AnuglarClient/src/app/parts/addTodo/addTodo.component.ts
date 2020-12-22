import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'src/app/app.todo.service';
import { todo } from '../interface/todo';


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


person:string;
descripton:string;
priority:number =4;
urgency:string;
length:number;

todo : todo = {id:0,person:"",description:"",priority:1,length:1}
constructor(public dialogRef: MatDialogRef<AddtodoComponent>,public todoService: TodoService) { }

addTodo(){
  this.todoService.findAll().subscribe(data=>console.dir(data.length))
    if(this.todo.person=="" ||this.todo.description =="")
        return

    this.todoService.addTodo(this.todo).subscribe(data=>{
    this.dialogRef.close('Close');
   })


  
   
}

ngOnInit(){}
}