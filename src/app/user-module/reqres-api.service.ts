import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class User {
  constructor(
    public id: Number,
    public avatar: string,
    public email: string,
    public last_name: string,
    public first_name: string
  ) {}
}

export class CreatedUser {
  constructor(
    public id: Number,
    public job: string,
    public name: string,
    public createdAt: string
  ) {}
}

export class Data {
  constructor(public data: User[]) {}
}

@Injectable({
  providedIn: 'root',
})
export class ReqresApiService {
  baseURL: string = 'https://reqres.in/api/';
  constructor(private http: HttpClient) {}
  response: any;

  getUsers(page: Number): Observable<User[]> {
    return this.http
      .get<Data>(`${this.baseURL}users?page=${page}`)
      .pipe(map((d: Data) => d.data));
  }

  getUser(id: Number): Observable<Data> {
    return this.http.get<Data>(`${this.baseURL}users/${id}`);
  }

  createUser(data): Observable<CreatedUser> {
    return this.http.post<CreatedUser>(`${this.baseURL}users`, data);
  }
}
