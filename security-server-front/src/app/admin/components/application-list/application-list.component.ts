import { animate, state, style, transition, trigger } from '@angular/animations';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddApplicationComponent } from 'src/app/admin/components/dialog-add-application/dialog-add-application.component';
import { Application } from 'src/app/models/application.interface'
import { ApplicationService } from 'src/app/services/application/application.service';
import { DeleteApplicationDialogComponent } from '../dialog-delete-application/dialog-delete-application.component';
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
  displayedColumns: string[] = ['id','name', 'description', 'secretCode' ,'url']
  columnsToDisplayWithExpand = [...this.displayedColumns,'modification', 'expand']
  expandedElement?: Application

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private _liveAnnouncer: LiveAnnouncer, private _applicationService: ApplicationService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getApps();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } 
    else {
      this._liveAnnouncer.announce('Sorting cleared')
    }
  }

  onCreate() {
    const dialogRef = this.dialog.open(DialogAddApplicationComponent,{data: null})

    dialogRef.afterClosed().subscribe(data => {
      this.getApps();
    });
  }

  openDialogToLinkUser(appId: number) {
    const dialogRef = this.dialog.open(DialogLinkUserComponent, {
      data: appId
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getApps();
    });
  }

  async deleteApp(app: Application) {
    const dialogRef = this.dialog.open(DeleteApplicationDialogComponent, {data : app});

    dialogRef.afterClosed().subscribe(data => {
      //this.getApps();
      this.applications.splice(this.applications.indexOf(app),1)
      this.updateDatatable();
    })


  }

  async editApp(application: Application) {

    const dialogRef = this.dialog.open(DialogAddApplicationComponent, {
      data: application
    });

    dialogRef.afterClosed().subscribe(data => {
      this.getApps();
    });

  }

  private getApps(){
    this._applicationService.getApplications()
      .subscribe((results: Application[]) => {
        this.applications = results
        this.updateDatatable();
      });
  }

  private updateDatatable() {
      this.dataSource = new MatTableDataSource(this.applications)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
  }
}
