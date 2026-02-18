import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type CreatePostPayload = Pick<Post, 'userId' | 'title' | 'body'>;

@Injectable({
  providedIn: 'root',
})
export class JsonplaceholderApiService {
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private readonly http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}posts`);
  }

  createPost(data: CreatePostPayload): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}posts`, data);
  }
}
