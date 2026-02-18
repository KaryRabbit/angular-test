import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
    catchPhrase: string;
  };
}

export interface CreatedUser {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReqresApiService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private readonly http: HttpClient) {}

  getUsers(page?: number): Observable<User[]> {
    // Get all users - pagination is handled client-side by MatTableDataSource
    return this.http.get<User[]>(`${this.baseUrl}users`);
  }

  getUser(id: number): Observable<{ data: User }> {
    return this.http
      .get<User>(`${this.baseUrl}users/${id}`)
      .pipe(map((user) => ({ data: user })));
  }

  createUser(data: Partial<CreatedUser>): Observable<CreatedUser> {
    return this.http.post<CreatedUser>(`${this.baseUrl}users`, data);
  }
}
