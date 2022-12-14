import { Component, OnInit, ViewChild } from '@angular/core';
import { Application } from 'src/app/models/application.interface';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationService } from 'src/app/services/application.service';
import { from, map, Observable } from 'rxjs';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})

export class ApplicationListComponent implements OnInit {

  applications!: Application[]
  dataSource!: MatTableDataSource<Application>

  constructor(private _liveAnnouncer: LiveAnnouncer, private _applicationService: ApplicationService) { }

  ngOnInit(): void {
    this._applicationService.getApplications()
      .subscribe(results => {
        this.applications = results
        this.dataSource = new MatTableDataSource(this.applications)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      })
  }

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator
  
  displayedColumns: string[] = ['name', 'description', 'link', 'action']

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
    } else {
      this._liveAnnouncer.announce('Sorting cleared')
    }
  }

}
