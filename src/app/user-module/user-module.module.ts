import { NgModule } from '@angular/core';
import { TableComponent } from './table/table.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormComponent } from './form/form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReqresApiService } from './reqres-api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateUserPopupComponent } from './create-user-popup/create-user-popup.component';
import {  MatPaginatorModule } from '@angular/material/paginator';
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
