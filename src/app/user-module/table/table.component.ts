import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, of } from 'rxjs';
import { ReqresApiService, User } from '../reqres-api.service';
import { TablePopupComponent } from '../table-popup/table-popup.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  readonly dataSource = new MatTableDataSource<User>([]);
  readonly displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'city',
    'company',
    'openInNew',
  ];
  readonly pageSizes: number[] = [3, 6, 12];
  readonly defaultPageSize = 6;

  loading = false;
  error = '';

  private readonly reqresApiService = inject(ReqresApiService);
  private readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator | undefined) {
    if (!paginator) {
      return;
    }
    this.dataSource.paginator = paginator;
    paginator.pageSize = this.defaultPageSize;
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  openModal(userId: number): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '560px';

    this.reqresApiService.getUser(userId).subscribe((response) => {
      dialogConfig.data = {
        user: response.data,
      };
      this.dialog.open(TablePopupComponent, dialogConfig);
    });
  }

  retry(): void {
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.loading = true;
    this.error = '';

    this.reqresApiService
      .getUsers()
      .pipe(
        catchError(() => {
          this.error = 'Unable to load users right now. Please retry.';
          return of([] as User[]);
        })
      )
      .subscribe((users) => {
        this.dataSource.data = users;
        this.loading = false;
        this.dataSource.paginator?.firstPage();
      });
  }
}
