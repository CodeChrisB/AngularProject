import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { TodoService } from 'src/app/app.todo.service';
import { AddtodoComponent } from '../addTodo/addTodo.component';
import {todo} from '../../../app/parts/interface/todo'
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
selector: 'list-component',
templateUrl: './list.component.html',
styleUrls: ['./list.component.css']
})
export class List implements OnInit  {

ngOnInit(){
  this.todoService.findAll().subscribe(data=>{
    this.dataSource =data;
    console.dir(this.dataSource);
  });
  console.dir(this.todo);

  
}
  search:string;

  filter(searchString:string){
    this.todoService.findAll().subscribe(data=>{
      this.dataSource =data.filter(
        todo=> todo.person.indexOf(searchString)!=-1||
        todo.description.indexOf(searchString)!=-1||
        todo.priority ==1 && ('Major'.indexOf(searchString))!=-1||
        todo.priority ==2 && ('Medium'.indexOf(searchString))!=-1||
        todo.priority ==3 && ('Minor'.indexOf(searchString))!=-1||
        todo.priority !=1 && todo.priority !=2 &&todo.priority !=3 && ('None'.indexOf(searchString))!=-1 ||
        (todo.length.toString()+" Stunden") .indexOf(searchString)!=-1      
        )
    });

  }
  http;
  constructor(public dialog: MatDialog,public todoService: TodoService,http: HttpClient) {
    this.http = http;
  }

  //init the data
  displayedColumns = ["Person","Description","Priority", "Length","Actions"];

  
   // MatPaginator Inputs
   length = this.todoService.getAllTodo().length;;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   dataSource = this.todoService.getAllTodo();


   firstPage()
   {
    this.paginator.firstPage();
   }
   refresh(){
     this.dataSource=this.dataSource;
   }
   reload(){
    this.dataSource=this.todoService.getAllTodo();
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
  }
  sname=true;
  sortName(){
    if(this.sname){ 
      this.dataSource.sort((a,b)=>a.person.localeCompare(b.person))
      this.sname=!this.sname;
    }else{
      this.dataSource.sort((b,a)=>a.person.localeCompare(b.person))
      this.sname=!this.sname;
    }
   
  }
  sdesc=true
  sortDescripton(){
    if(this.sdesc){ 
      this.dataSource.sort((a,b)=>a.description.localeCompare(b.description))
      this.sdesc=!this.sdesc;
    }else{
      this.dataSource.sort((b,a)=>a.description.localeCompare(b.description))
      this.sdesc=!this.sdesc;
    }
  }

  sprio=true;
  sortPriority(){
    if(this.sprio){ 
      this.dataSource= this.dataSource.sort((a,b)=>a.priority < b.priority ? 0: 1 )
      this.sprio=!this.sprio;
    }else{
      this.dataSource= this.dataSource.sort((b,a)=>a.priority < b.priority ? 0: 1 )
      this.sprio=!this.sprio;
    }
  }

  slength=true;
  sortLength(){
    if(this.slength){ 
      this.dataSource= this.dataSource.sort((a,b)=>a.length < b.length ? 0: 1 )
      this.slength=!this.slength;
    }else{
      this.dataSource= this.dataSource.sort((b,a)=>a.length < b.length ? 0: 1 )
      this.slength=!this.slength;
    }
  }

  

  todo: todo[] = []

  


}