import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, of } from 'rxjs';
import { JsonplaceholderApiService, Post } from '../jsonplaceholder-api.service';

@Component({
  selector: 'app-posts-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
})
export class PostsTableComponent implements OnInit {
  private readonly jsonplaceholderService = inject(JsonplaceholderApiService);

  readonly dataSource = new MatTableDataSource<Post>([]);
  readonly displayedColumns: string[] = ['id', 'userId', 'title', 'body'];
  readonly pageSizes: number[] = [10, 20, 50];
  readonly defaultPageSize = 10;

  loading = false;
  error = '';

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator | undefined) {
    if (!paginator) {
      return;
    }
    this.dataSource.paginator = paginator;
    paginator.pageSize = this.defaultPageSize;
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  retry(): void {
    this.loadPosts();
  }

  private loadPosts(): void {
    this.loading = true;
    this.error = '';

    this.jsonplaceholderService
      .getPosts()
      .pipe(
        catchError(() => {
          this.error = 'Unable to load posts right now. Please retry.';
          return of([] as Post[]);
        })
      )
      .subscribe((result) => {
        this.dataSource.data = result;
        this.dataSource.paginator?.firstPage();
        this.loading = false;
      });
  }
}
