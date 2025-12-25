import { Component, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { JsonplaceholderApiService } from '../jsonplaceholder-api.service';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';

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
