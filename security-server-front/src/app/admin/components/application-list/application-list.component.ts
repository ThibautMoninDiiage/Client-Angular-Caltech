import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddApplicationComponent } from 'src/app/admin/components/dialog-add-application/dialog-add-application.component';
import { Application } from 'src/app/models/application.interface'
import { ApplicationService } from 'src/app/services/application/application.service';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})

export class ApplicationListComponent implements OnInit {

  applications!: Application[]
  dataSource!: MatTableDataSource<Application>
  displayedColumns: string[] = ['name', 'description', 'url', 'action']

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private _liveAnnouncer: LiveAnnouncer, private _applicationService: ApplicationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this._applicationService.getApplications()
      .subscribe(results => {
        this.applications = results
        this.dataSource = new MatTableDataSource(this.applications)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting cleared')
    }
  }

  onCreate() {
    const dialogRef = this.dialog.open(DialogAddApplicationComponent)

    dialogRef.afterClosed().subscribe(data => {
      this._applicationService.getApplications()
      .subscribe(results => {
        this.applications = results
        this.dataSource = new MatTableDataSource(this.applications)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      })
    })
  }
}
