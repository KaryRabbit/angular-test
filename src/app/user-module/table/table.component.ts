import { Component, ViewChild } from '@angular/core';
import { ReqresApiService } from '../reqres-api.service';
import { MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from '@angular/material/legacy-dialog';
import { TablePopupComponent } from '../table-popup/table-popup.component';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  dataSource = new MatTableDataSource()

  currentPage = 0;
  user: any;
  pageSizes: number[] = [3, 6];

  @ViewChild(MatPaginator)
  paginator;

  constructor(
    private reqresApiService: ReqresApiService,
    public matDialog: MatDialog
  ) {}
  displayedColumns: string[] = [
    'id',
    'avatar',
    'first_name',
    'last_name',
    'email',
    'openInNew',
  ];

  ngOnInit() {
    this.openTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openTable() {
    this.reqresApiService.getUsers(this.currentPage).subscribe(users => this.dataSource.data = users);
  }

  openModal(userId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '270px';
    dialogConfig.width = '550px';

    const userObser = this.reqresApiService.getUser(userId);
    userObser.subscribe((response) => {
      dialogConfig.data = {
        user: response.data,
      };
      this.matDialog.open(TablePopupComponent, dialogConfig);
    });
  }
}
