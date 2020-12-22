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

  addTodo(todo:todo): Observable<todo> {
    console.log('i am in addPerson')
    this.todos.push(todo);
    console.log(this.todos)
    const body = JSON.stringify(todo);
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
   return this.http.post<todo>(this.url + '/create', body, options).pipe(map(data=>data))

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






  remove(id:number): Observable<todo>{
    return this.http.delete<todo>(this.url + '/delete/' + id).pipe(map(data=>data));
  }



  sortName(){
    return this.todos.sort((a,b)=>a.person.localeCompare(b.person))
   }

   sortDescripton(){
    this.todos= this.todos.sort((a,b)=>a.description.localeCompare(b.description))
  }

}
