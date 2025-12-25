import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from './form/form.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { ReqresApiService } from './reqres-api.service';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { CreateUserPopupComponent } from './create-user-popup/create-user-popup.component';
import {  MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { CommonModule } from '@angular/common';
import { UserModuleRoutingModule } from './user-module-routing.module';
import { TablePopupComponent } from './table-popup/table-popup.component';

@NgModule({
  declarations: [
    TableComponent,
    TablePopupComponent,
    FormComponent,
    CreateUserPopupComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatPaginatorModule,
    UserModuleRoutingModule
  ],
  providers: [ReqresApiService],
})
export class UserModuleModule {}
