import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { User } from '../../../models/user.interface';
import { map, Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  //users$! : Observable<MatTableDataSource<User>>; 
  displayedColumns: string[] = ['id', 'username', 'mail','role', 'avatar','action'];
  dataSource!: MatTableDataSource<User>;

  constructor(private _liveAnnouncer: LiveAnnouncer, private _userService: UserService,public dialog: MatDialog) {}
 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit() {
    this._userService.getUsers().subscribe(users => {
         this.dataSource = new MatTableDataSource(users);
         this.dataSource.sort = this.sort;
         this.dataSource.paginator = this.paginator;
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
      data => { this._userService.getUsers().subscribe(users => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });}
    );  
  }

}
