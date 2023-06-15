import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerUser: User = {
    email: '',
    password: '',
    displayName: '',
    emailVerified: false
  }
  constructor(private authService: AuthService,
              private router: Router
              ) { }

  ngOnInit(): void {

    this.verifyUser();
  }

  register(registerUser: User) {
    this.authService.register(registerUser)
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
