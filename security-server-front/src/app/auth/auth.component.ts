import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _authenticationService: AuthenticationService, private _router: Router) {}

  ngOnInit(): void {
    const codeGrant = this._route.snapshot.paramMap.get("codeGrant")
    this._authenticationService.getUserToken(codeGrant!).subscribe(() => {
      this._router.navigateByUrl("user/user-details")
    })
  }
}
