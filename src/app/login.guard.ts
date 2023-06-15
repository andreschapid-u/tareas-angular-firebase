import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "./services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router,
              private auth: AuthService) { }
  canActivate():boolean {

    if(!this.auth.isLoging()){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
