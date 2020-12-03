import { Component, OnInit } from '@angular/core';

const customers = [

]



@Component({
selector: 'list-component',
templateUrl: './list.component.html',
styleUrls: ['./list.component.css']
})
export class List  {
  //init the data
  displayedColumns = [""];


   // MatPaginator Inputs
   length = customers.length;
   pageSize = 10;
   pageSizeOptions: number[] = [5, 10];
   dataSource = customers.slice(0,this.pageSize);
   goToPage($event){

     this.length = $event.length;
     this.pageSize =$event.pageSize;
     this.dataSource = customers.slice(this.pageSize* $event.pageIndex,this.pageSize* $event.pageIndex+this.pageSize)
   }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }


}