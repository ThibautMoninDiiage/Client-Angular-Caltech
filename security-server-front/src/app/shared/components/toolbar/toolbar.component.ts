import { Component, OnInit } from '@angular/core'
import { AuthenticationService } from 'src/app/services/authentication/authentication.service'
import jwt_decode from 'jwt-decode'
import { Token } from 'src/app/models/token.interface'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isUserAdmin!: boolean

  constructor(private _authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    var token = this._authenticationService.getToken()
    var decodedToken: Token = jwt_decode(token)
  }

}
