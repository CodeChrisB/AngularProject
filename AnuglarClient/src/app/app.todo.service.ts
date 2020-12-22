import {Injectable} from '@angular/core';
import {Person} from './app.person';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {todo} from '../app/parts/interface/todo'
import { List } from './parts/list/list.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  http: HttpClient;
  public persons;
  url: string = 'http://localhost:3000/todo';
  search:string="";
 
  constructor(http: HttpClient) {
    this.http = http;
  }

  // GET-Request: Liefert Response als Observable
  findAll(): Observable<todo[]> {
    return this.http.get<todo[]>(this.url + '/findAll').pipe(map(data=>data));
  }

  addPerson(person:Person): void {
    console.log('i am in addPerson')
    this.persons.push(person);
    console.log(this.persons)
    const body = JSON.stringify(person);
    console.log(body)
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    console.log(headers)

    const options = {
      headers: headers
    }
    console.log(options)
    this.http.post<Person>(this.url + '/create', body, options).subscribe(data => this.findAll());

  }

  delete(id : number):void{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers
    }
    console.dir(this.url + '/delete/' + id)
    this.http.delete<Person>(this.url + '/delete/' + id, options).subscribe(data => this.persons = data);
    this.findAll()
  }

  todos: todo[] = [];

  getAllTodo() : todo[]
  {
    console.dir(this.url + '/findAll')
    this.http.get<todo[]>(this.url + '/findAll').subscribe(data => {
      this.todos= data;
    });
    return this.todos;
  }



  addTodo(todo :todo):void{
    todo.id=this.todos.length+2;
    this.todos.push(todo)
  }


  remove(id:number){
    this.todos = this.todos.filter(t=> t.id != id)
  }



  sortName(){
    return this.todos.sort((a,b)=>a.person.localeCompare(b.person))
   }

   sortDescripton(){
    this.todos= this.todos.sort((a,b)=>a.description.localeCompare(b.description))
  }

}
