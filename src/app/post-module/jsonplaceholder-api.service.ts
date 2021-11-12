import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Post {
  constructor(
    public userId: Number,
    public id: Number,
    public title: string,
    public body: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class JsonplaceholderApiService {
  baseURL: string = 'https://jsonplaceholder.typicode.com/';
  constructor(private http: HttpClient) {}

  response: any;

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.baseURL}posts`);
  }

  createPost(data): Observable<Post> {
    return this.http.post<Post>(`${this.baseURL}posts`, data);
  }
}
