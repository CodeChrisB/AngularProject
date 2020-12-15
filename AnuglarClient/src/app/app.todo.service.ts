import {Injectable} from '@angular/core';
import {Person} from './app.person';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {todo} from '../app/parts/interface/todo'


@Injectable({
  providedIn: 'root'
})

export class TodoService {

  http: HttpClient;
  public persons;
  url: string = 'http://localhost:8080/person';

  constructor(http: HttpClient) {
    this.http = http;
  }

  // GET-Request: Liefert Response als Observable
  findAll(): void {
    this.http.get<Person[]>(this.url + '/findAll').subscribe(data => this.persons = data);
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

  static todos: todo[] = [
    {id:1,"person":"Chris","descripton":"Create a todolist","priority":2,"urgency":"urgency","length":15},
    {id:2,"person":"Aigner","descripton":"Pls do something in Syp","priority":1,"urgency":"urgency","length":1},
    {id:3,"person":"Auernig","descripton":"Tinf Stuff","priority":3,"urgency":"urgency","length":5},
    {id:4,"person":"Bauer","descripton":"Weird Loal stuff","priority":4,"urgency":"urgency","length":7},
    {id:5,"person":"Haslinger","descripton":"JPA Stuff","priority":1,"urgency":"urgency","length":16},
    {id:6,"person":"Robert","descripton":"Database","priority":1,"urgency":"urgency","length":13},
    {id:7,"person":"Marc","descripton":"Note Scanning","priority":2,"urgency":"urgency","length":6},
    {id:8,"person":"Jonas","descripton":"Get a katana","priority":4,"urgency":"urgency","length":12},
    {id:9,"person":"Emil","descripton":"Mc Anti Hack Plugin","priority":1,"urgency":"urgency","length":14}
  ]

 static getAllTodo() : todo[]
  {
    return this.todos;
  }

  static addTodo(todo :todo):void{
    todo.id=this.todos.length+2;
    this.todos.push(todo)
  }

  static remove(id:number){
    this.todos = this.todos.filter(t=> t.id != id)
  }



  static sortName(){
    return this.todos.sort((a,b)=>a.person.localeCompare(b.person))
   }

   static sortDescripton(){
    this.todos= this.todos.sort((a,b)=>a.descripton.localeCompare(b.descripton))
  }

}
