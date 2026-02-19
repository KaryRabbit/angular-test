import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

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
  private readonly createdUsersStorageKey = 'portfolio-created-users';

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}users`).pipe(
      map((users) => [...this.getStoredCreatedUsers(), ...users]),
      catchError(() => of(this.getStoredCreatedUsers()))
    );
  }

  getUser(id: number): Observable<{ data: User }> {
    const localUser = this.getStoredCreatedUsers().find((user) => user.id === id);
    if (localUser) {
      return of({ data: localUser });
    }

    return this.http
      .get<User>(`${this.baseUrl}users/${id}`)
      .pipe(map((user) => ({ data: user })));
  }

  createUser(data: Partial<CreatedUser>): Observable<CreatedUser> {
    const normalizedUser: CreatedUser = {
      id: this.generateLocalId(),
      name: (data.name ?? '').trim(),
      username: (data.username ?? '').trim(),
      email: (data.email ?? '').trim(),
    };

    return this.http.post<CreatedUser>(`${this.baseUrl}users`, normalizedUser).pipe(
      map((response) => ({
        ...normalizedUser,
        ...response,
        id: typeof response.id === 'number' ? response.id : normalizedUser.id,
      })),
      tap((createdUser) => this.persistCreatedUser(createdUser)),
      catchError(() => {
        this.persistCreatedUser(normalizedUser);
        return of(normalizedUser);
      })
    );
  }

  private persistCreatedUser(createdUser: CreatedUser): void {
    const existingUsers = this.getStoredCreatedUsers().filter((user) => user.id !== createdUser.id);
    const userRecord: User = {
      id: createdUser.id,
      name: createdUser.name,
      username: createdUser.username,
      email: createdUser.email,
      phone: 'N/A',
      website: 'N/A',
      address: {
        street: 'N/A',
        suite: 'N/A',
        city: 'New User',
        zipcode: '00000',
      },
      company: {
        name: 'Personal Project',
        catchPhrase: 'Created in portfolio dashboard',
      },
    };

    this.setStoredCreatedUsers([userRecord, ...existingUsers]);
  }

  private getStoredCreatedUsers(): User[] {
    try {
      const raw = localStorage.getItem(this.createdUsersStorageKey);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as User[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private setStoredCreatedUsers(users: User[]): void {
    localStorage.setItem(this.createdUsersStorageKey, JSON.stringify(users));
  }

  private generateLocalId(): number {
    return Date.now();
  }
}
