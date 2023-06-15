import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

   //Metodo encargado de mostrar el formulario para crear una nueva tarea
  showFormCreateTask(){
    this.router.navigate(['task', 'create']);
  }
}
