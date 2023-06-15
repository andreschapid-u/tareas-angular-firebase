import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { authUser } from 'src/app/models/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUser: authUser = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.verifyUser();
  }

  login(loginUser: authUser) {
    this.authService.login(loginUser.email, loginUser.password)
  }

  private verifyUser() {
    if (this.authService.isLoging()) {
      this.redirectToTasks();
    }
  }

  private redirectToTasks() {
    this.router.navigate(['/tasks']);
  }
}
