import { Component, OnInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { User } from '../../../models/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  //users$! : Observable<MatTableDataSource<User>>; 
  displayedColumns: string[] = ['id', 'username', 'mail', 'avatar','action'];
  dataSource!: MatTableDataSource<User>;
  users!: User[]
  constructor(private _liveAnnouncer: LiveAnnouncer, private _userService: UserService,public dialog: MatDialog) {}
 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this._userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      this.updateDatatable();
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
    
    dialogRef.afterClosed().subscribe(
      data => { this.getUsers();
      });  
  }

  async deleteUser(user: User) {
    await firstValueFrom(this._userService.deleteUser(user.id!));
    this.users.splice(this.users.indexOf(user),1)
    this.updateDatatable();
  
  }
  
  async editUser(user: User) {
    const userDetail = await firstValueFrom(this._userService.getUserDetails(user.id!.toString()));
    
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      data: userDetail
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getUsers();
    });
  }

  private updateDatatable() {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
  }
}
