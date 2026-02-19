import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import { ReqresApiService } from '../user-module/reqres-api.service';
import { JsonplaceholderApiService } from '../post-module/jsonplaceholder-api.service';

interface HighlightCard {
  title: string;
  description: string;
  route: string;
  cta: string;
  icon: string;
}

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  avgPostsPerUser: number;
  loading: boolean;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  private readonly userService = inject(ReqresApiService);
  private readonly postService = inject(JsonplaceholderApiService);

  readonly stats = signal<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    avgPostsPerUser: 0,
    loading: true,
  });

  readonly cards: HighlightCard[] = [
    {
      title: 'User Directory',
      description: 'Browse and search through user profiles with detailed information.',
      route: '/users/table',
      cta: 'View Users',
      icon: 'people',
    },
    {
      title: 'Post Feed',
      description: 'Explore posts with advanced filtering and search capabilities.',
      route: '/posts/table',
      cta: 'View Posts',
      icon: 'article',
    },
    {
      title: 'Create User',
      description: 'Add new users with validated forms and instant feedback.',
      route: '/users/form',
      cta: 'Create User',
      icon: 'person_add',
    },
    {
      title: 'Create Post',
      description: 'Publish new posts with rich content and validation.',
      route: '/posts/create',
      cta: 'Create Post',
      icon: 'add_circle',
    },
  ];

  ngOnInit(): void {
    this.loadDashboardStats();
  }

  private loadDashboardStats(): void {
    forkJoin({
      users: this.userService.getUsers(),
      posts: this.postService.getPosts(),
    }).subscribe({
      next: ({ users, posts }) => {
        const totalUsers = users.length;
        const totalPosts = posts.length;
        this.stats.set({
          totalUsers,
          totalPosts,
          avgPostsPerUser: Math.round(totalPosts / totalUsers),
          loading: false,
        });
      },
      error: () => {
        this.stats.update((s) => ({ ...s, loading: false }));
      },
    });
  }
}
