import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('gj-token');
  }

  logOut(): void {
    localStorage.removeItem('gj-token');
    location.reload();
  }

  storeToken(token: string): void {
    localStorage.setItem('gj-token', token);
  }

  fetchToken(): string {
    return localStorage.getItem('gj-token');
  }

  getUser(): User {
    console.log(jwt_decode(localStorage.getItem('gj-token')));
    return jwt_decode(localStorage.getItem('gj-token'));
  }

  getData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/users');
  }

  login(data): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/login', data);
  }

  register(data): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/register', data);
  }
}
