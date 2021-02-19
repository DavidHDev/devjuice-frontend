import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  isLoggedIn(): boolean {
    console.log(!!localStorage.getItem('gj-token'));
    return !!localStorage.getItem('gj-token');
  }

  storeToken(token: string): void {
    localStorage.setItem('gj-token', token);
  }

  fetchToken(): void {
    localStorage.getItem('gj-token');
  }

  getData(): Observable<any> {
    return this.http.get<any>('https://gjapi.herokuapp.com/users');
  }

  login(data): Observable<any> {
    return this.http.post<any>('http://localhost:3000/users/login', data);
  }

  register(data): Observable<any> {
    return this.http.post<any>('http://localhost:3000/users/register', data);
  }
}
