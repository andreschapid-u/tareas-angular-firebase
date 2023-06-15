import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import {LoginGuard} from "./login.guard";
import {FormTaskComponent} from "./components/tasks/form-task/form-task.component";


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'tasks', component: HomeComponent, canActivate: [LoginGuard],
  },
  {
    path: 'task/:state', component: FormTaskComponent, canActivate: [LoginGuard],
  },
  {
    path: 'task/show/:id', component: FormTaskComponent, canActivate: [LoginGuard],
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
