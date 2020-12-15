import { Component, OnInit } from '@angular/core';

const customers = [

]

interface todo {
  person:string,
  descripton:string,
  priority:number,
  urgency:string,
  length:number
}

const todo: todo[] = [
  {"person":"Chris","descripton":"descripton","priority":1,"urgency":"urgency","length":1,},
  {"person":"Chris","descripton":"descripton","priority":2,"urgency":"urgency","length":1},
  {"person":"Chris","descripton":"descripton","priority":3,"urgency":"urgency","length":1},
  {"person":"Chris","descripton":"descripton","priority":3,"urgency":"urgency","length":1},
  {"person":"Chris","descripton":"descripton","priority":2,"urgency":"urgency","length":1},
  {"person":"Chris","descripton":"descripton","priority":2,"urgency":"urgency","length":1},
  {"person":"Chris","descripton":"descripton","priority":4,"urgency":"urgency","length":1}
]


@Component({
selector: 'list-component',
templateUrl: './list.component.html',
styleUrls: ['./list.component.css']
})
export class List  {
  //init the data
  displayedColumns = ["Person","Description","Priority","Urgency", "Length","Actions"];


   // MatPaginator Inputs
   length = todo.length;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10];
   dataSource = todo.slice(0,this.pageSize);
   goToPage($event){
     this.length = $event.length;
     this.pageSize =$event.pageSize;
     this.dataSource = this.dataSource.slice(this.pageSize* $event.pageIndex,this.pageSize* $event.pageIndex+this.pageSize)
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

  addTodo(){
    
  }


}