import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { JsonplaceholderApiService } from '../jsonplaceholder-api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
})
export class PostsTableComponent {
  dataSource = new MatTableDataSource();
  currentPage = 0;
  user: any;
  pageSizes: number[] = [10, 20, 100];

  @ViewChild(MatPaginator)
  paginator;

  constructor(
    private jsonplaceholderService: JsonplaceholderApiService,
    public matDialog: MatDialog
  ) {}
  displayedColumns: string[] = ['id', 'userId', 'title', 'body'];

  ngOnInit() {
    this.openTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openTable() {
    this.jsonplaceholderService.getPosts().subscribe((result) => {
      this.dataSource.data = result;
    });
  }
}
