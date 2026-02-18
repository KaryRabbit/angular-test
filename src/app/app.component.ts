import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService } from './core/services/theme';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly themeService = inject(ThemeService);

  title = 'angular-test-project';
  readonly navItems: NavItem[] = [
    {
      icon: 'home',
      label: 'Overview',
      route: '/',
      description: 'Project summary and quick actions',
    },
    {
      icon: 'people',
      label: 'Users',
      route: '/users/table',
      description: 'Searchable user directory',
    },
    {
      icon: 'person_add',
      label: 'Create User',
      route: '/users/form',
      description: 'Submit a new user profile',
    },
    {
      icon: 'article',
      label: 'Posts',
      route: '/posts/table',
      description: 'Browse and filter posts',
    },
    {
      icon: 'add_circle',
      label: 'Create Post',
      route: '/posts/create',
      description: 'Publish a new post draft',
    },
  ];

  sidenavMode: 'over' | 'side' = 'side';
  sidenavOpen = true;

  // Expose theme signal to template
  get isDarkMode(): boolean {
    return this.themeService.isDark();
  }

  ngOnInit(): void {
    this.syncLayout(window.innerWidth);
  }

  onResize(event: Event): void {
    const width = (event.target as Window | null)?.innerWidth ?? 1024;
    this.syncLayout(width);
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private syncLayout(width: number): void {
    const mobile = width < 960;
    this.sidenavMode = mobile ? 'over' : 'side';
    this.sidenavOpen = !mobile;
  }
}
