import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { DialogAddApplicationComponent } from 'src/app/admin/components/dialog-add-application/dialog-add-application.component';
import { Application } from 'src/app/models/application.interface'
import { User } from 'src/app/models/user.interface';
import { ApplicationService } from 'src/app/services/application.service';
import { DialogLinkUserComponent } from '../dialog-link-user/dialog-link-user.component';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ApplicationListComponent implements OnInit {

  applications!: Application[]
  dataSource!: MatTableDataSource<Application>
  displayedColumns: string[] = ['id','name', 'description', 'url']
  columnsToDisplayWithExpand = [...this.displayedColumns,'modification', 'expand']
  expandedElement?: Application

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private _liveAnnouncer: LiveAnnouncer, private _applicationService: ApplicationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getApps()
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
      this.getApps();
    })
  }

  openDialog(appId: number) {
    const dialogRef = this.dialog.open(DialogLinkUserComponent, {
      data: appId
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getApps();
    })
  }

  async deleteApp(appId: number) {
    await firstValueFrom(this._applicationService.deleteApp(appId));

    this.getApps();
  }

  private getApps(){
    this._applicationService.getApplications()
      .subscribe(results => {
        this.applications = results
        this.dataSource = new MatTableDataSource(this.applications)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      })
  }
}
