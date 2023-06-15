import { MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginGuard} from "./login.guard";
import { FormTaskComponent } from './components/tasks/form-task/form-task.component';
import { PendingTasksComponent } from './components/tasks/pending-tasks/pending-tasks.component';
import { CompletedTasksComponent } from './components/tasks/completed-tasks/completed-tasks.component';
import { TaskComponent } from './components/tasks/task/task.component';
import {AnimateModule} from "primeng/animate";
import {CardModule} from "primeng/card";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {DividerModule} from "primeng/divider";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FormTaskComponent,
    PendingTasksComponent,
    CompletedTasksComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    AnimateModule,
    CardModule,
    ProgressSpinnerModule,
    DividerModule,
    DialogModule
  ],
  providers: [MessageService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
