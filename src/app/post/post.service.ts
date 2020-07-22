import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiURL = "http://localhost:3000/posts/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  getAll():Observable<Post>{
    return this.httpClient.get<Post>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(post): Observable<Post> {
    console.log(post)
    return this.httpClient.post<Post>(this.apiURL , JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(id): Observable<Post> {
    return this.httpClient.get<Post>(this.apiURL+ id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  update(id, post): Observable<Post> {
    return this.httpClient.put<Post>(this.apiURL + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id){
    console.log(id);
    return this.httpClient.delete<Post>(this.apiURL  + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}

