import {Injectable} from '@angular/core';
import {Person} from './app.person';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonService {

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

}
