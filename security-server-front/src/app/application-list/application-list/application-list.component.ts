import { Component, ViewChild } from '@angular/core';
import { Application } from 'src/app/models/application.interface';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.scss']
})

export class ApplicationListComponent {
  
  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  @ViewChild(MatSort) sort!: MatSort
  @ViewChild(MatPaginator) paginator!: MatPaginator
  
  displayedColumns: string[] = ['name', 'description', 'link', 'action']

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}

const ELEMENT_DATA: Application[] = [
  {
    id: 1,
    name: "Application 1",
    link: "youtube.com",
    description: "C'est une vraiment bonne application"
  },
  {
    id: 2,
    name: "Application 2",
    link: "youtube.com",
    description: "C'est une vraiment bonne application"
  },
  {
    id: 3,
    name: "Application 3",
    link: "youtube.com",
    description: "C'est une vraiment bonne application"
  },
  {
    id: 4,
    name: "Application 4",
    link: "youtube.com",
    description: "C'est une vraiment bonne application"
  },
  {
    id: 5,
    name: "Application 5",
    link: "youtube.com",
    description: "C'est une vraiment bonne application"
  },
  {
    id: 6,
    name: "Application 6",
    link: "youtube.com",
    description: "C'est une vraiment bonne application"
  },
]