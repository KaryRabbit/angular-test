import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

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
  private readonly createdPostsStorageKey = 'portfolio-created-posts';

  constructor(private readonly http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}posts`).pipe(
      map((posts) => [...this.getStoredCreatedPosts(), ...posts]),
      catchError(() => of(this.getStoredCreatedPosts()))
    );
  }

  createPost(data: CreatePostPayload): Observable<Post> {
    const normalizedPost: Post = {
      id: this.generateLocalId(),
      userId: Number(data.userId),
      title: (data.title ?? '').trim(),
      body: (data.body ?? '').trim(),
    };

    return this.http.post<Post>(`${this.baseUrl}posts`, normalizedPost).pipe(
      map((response) => ({
        ...normalizedPost,
        ...response,
        id: typeof response.id === 'number' ? response.id : normalizedPost.id,
      })),
      tap((post) => this.persistCreatedPost(post)),
      catchError(() => {
        this.persistCreatedPost(normalizedPost);
        return of(normalizedPost);
      })
    );
  }

  private persistCreatedPost(post: Post): void {
    const existingPosts = this.getStoredCreatedPosts().filter((item) => item.id !== post.id);
    this.setStoredCreatedPosts([post, ...existingPosts]);
  }

  private getStoredCreatedPosts(): Post[] {
    try {
      const raw = localStorage.getItem(this.createdPostsStorageKey);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as Post[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private setStoredCreatedPosts(posts: Post[]): void {
    localStorage.setItem(this.createdPostsStorageKey, JSON.stringify(posts));
  }

  private generateLocalId(): number {
    return Date.now();
  }
}
