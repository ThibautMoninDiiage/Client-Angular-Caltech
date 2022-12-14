import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'username', 'mail', 'avatar','role','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer, private _userService: UserService,public dialog: MatDialog) {}

  users$! : Observable<User[]>; 
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
   // this.users$ = this._userService.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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
      data => console.log("Dialog output:", data)
    );  
  }

}




const ELEMENT_DATA: User[] = [
  {id:0,username : "ShibaTheHut",mail : "thehut@goobdoy.org",avatar : "https://material.angular.io/assets/img/examples/shiba1.jpg",role : {name: "Admin"}},
  {id:1,username : "DiegoDelFuego",mail : "youkilledmyfather@ricardo.com",avatar : "https://1.bp.blogspot.com/-rijx86cFoCg/X9O240WX-oI/AAAAAAAAC9k/uE3Y9s2E0_A0gocCVZ71ovfmgDIUgIOzQCLcBGAsYHQ/s16000/Teckel-1.webp",role : {name: "Regular"}},
  {id:2,username : "AlbanGoldenBoy",mail : "iluvmymama@goobdoy.org",avatar : "https://www.espritdog.com/wp-content/uploads/2021/08/esprit-dog-le-golden-retriever.png",role : {name: "Admin"}},
  {id:3,username : "RottBailleur",mail : "meateater@diiage.org",avatar : "https://www.centrale-canine.fr/sites/default/files/styles/race_characteristic_562x562/public/race_images/race/0030_T.png.webp?itok=MoLHverR",role : {name: "Regular"}},
  {id:4,username : "DobieTheDober",mail : "dobdob@goobdoy.org",avatar : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07DZjS6KCfHytnDFA9TeZ0Tx0rU44HW1UZ0gIBuHXZqzGmmT5-3qZORPVLVnYxxJ74A0&usqp=CAU",role : {name: "Regular"}},
  {id:5,username : "Kikilhusky",mail : "wherearemyballs@plot.uk",avatar : "https://www.santevet.com/upload/admin/images/article/Chien%202/races_de_chiens/siberian-husky.jpg",role : {name: "Admin"}},
  {id:6,username : "Ichbinkapoot",mail : "iatemybrother@goobdoy.org",avatar : "https://www.santevet.com/upload/admin/images/article/PMO/FICHES%20RACES/CHIENS/berger_allemand_fiche_race_santevet_assurance.jpg",role : {name: "Regular"}},
  {id:7,username : "Sharpsharp",mail : "tiredforever@goobdoy.org",avatar : "https://as2.ftcdn.net/v2/jpg/00/06/01/47/1000_F_6014732_NTuj5MfTs3xmGmovBr7VGvL5j9AW0hcD.jpg",role : {name: "Regular"}},
  {id:8,username : "Bulldoug",mail : "dougthebull@goobdoy.org",avatar : "https://www.espritdog.com/wp-content/uploads/2021/07/bulldog-anglais-header-fiche-de-race-e1640178021952.png",role : {name: "Regular"}},
  {id:9,username : "BigBeagle",mail : "bigisthename@diiage.org",avatar : "https://www.omlet.fr/images/cache/664/768/Dog-Beagle-A_Lovely,_little_beagle_sitting_patiently,_waiting_for_some_attention.jpg",role : {name: "Regular"}},
  {id:10,username : "Shibaba",mail : "bashi@goobdoy.org",avatar : "https://material.angular.io/assets/img/examples/shiba1.jpg",role : {name: "Regular"}},

];