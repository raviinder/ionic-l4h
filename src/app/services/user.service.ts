import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { map, retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export type CreateUserRequest = { displayName: string, password: string, email: string, role: string };
export type UpdateUserRequest = { uid: string } & CreateUserRequest;

@Injectable({
  providedIn: 'root'
})
export class UserService {
 // private baseUrl ='http://localhost:5001/fir-test-a8277/us-central1/api/users'
 // private createurl ='http://localhost:5001/fir-test-a8277/us-central1/api/createuser'
  private baseUrl = 'https://us-central1-fir-test-a8277.cloudfunctions.net/api/users'
 private createurl ='https://us-central1-fir-test-a8277.cloudfunctions.net/api/createuser'
 
  constructor(
    private http: HttpClient
  ) { }

  get users$(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.baseUrl}`).pipe(
      map(result => {
        return result.users;
      })
    );
  }

  user$(id: string): Observable<User> {
    return this.http.get<{ user: User }>(`${this.baseUrl}/${id}`).pipe(
      retry(1),
      catchError(this.handleError),
      map(result => {
        return result.user;
      })
    );
  }

  create(user: CreateUserRequest) {
    return this.http.post(`${this.createurl}`, user).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  edit(user: UpdateUserRequest) {
    return this.http.patch(`${this.baseUrl}/${user.uid}`, user).pipe(
      map(_ => { })
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}



}



