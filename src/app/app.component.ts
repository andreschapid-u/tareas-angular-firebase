import { Component } from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tareas con Angular y Firebase';

  constructor(private authService:AuthService) {

  }
  logout(){
    this.authService.logout()
  }

  isLoged() {
    return this.authService.isLoging();
  }
}
