import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthService} from "./auth.service";
import {User} from "../models/user";
import {Task} from "../models/task";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class ServiceTasksService {
  private user: User;
  constructor(
    private afs: AngularFirestore,
    private router: Router,
    private messageService: MessageService,
    private auth: AuthService
  ) {
    this.user = this.auth.isLoging();
  }

  //Metodo que se encarga de crear una nueva tarea para el usuario logeado
  createTask(task: Task){
    this.user = this.auth.isLoging();
    task.user_id = this.user.uid;
    let taskJ:DocumentData = JSON.parse(JSON.stringify(task));

    return this.afs.collection('users').doc(this.user.uid).collection('pending-tasks').add(taskJ)
      .then(()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Se ha creado la tarea'});
      }).catch(()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido crear la tarea'});
      });
  }

  //Metodo que se encarga de obtener todas las tareas pendientes del usuario logeado
  getPendingTasks(){
    this.user = this.auth.isLoging();
    console.log("Usuario",this.user.email);
    return this.afs.collection('users').doc(this.user.uid).collection('pending-tasks').snapshotChanges();
  }

  //Metodo que se encarga de obtener todas las tareas completadas del usuario logeado
  getCompletedTasks(){
    this.user = this.auth.isLoging();
    return this.afs.collection('users').doc(this.user.uid).collection('completed-tasks').snapshotChanges();
  }

  //Metodo que se encarga de eliminar una tarea pendiente del usuario logeado
  deletePendingTask(id: string){
    this.user = this.auth.isLoging();
    return this.afs.collection('users').doc(this.user.uid).collection('pending-tasks').doc(id).delete()
      .then(()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Se ha eliminado la tarea de la lista de pendientes'});
        }).catch(()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido eliminar la tarea'});
      });
  }

  //Metodo que se encarga de eliminar una tarea completada del usuario logeado
  deleteCompletedTask(id: string){
    this.user = this.auth.isLoging();
    return this.afs.collection('users').doc(this.user.uid).collection('completed-tasks').doc(id).delete()
      .then(()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Se ha eliminado la tarea de la lista de completadas'});
      }).catch(()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido eliminar la tarea'});
      });
  }

  //Metodo que se encarga de actualizar una tarea pendiente del usuario logeado
  updatePendingTask(id: string, task: any){
    this.user = this.auth.isLoging();
    return this.afs.collection('users').doc(this.user.uid).collection('pending-tasks').doc(id).update(task)
      .then(()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Se ha actualizado la tarea'});
      }).catch(()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido actualizar la tarea'});
      });
  }

  //Metodo que se encarga de sacar una tarea de la lista de pendientes y agregarla a la lista de completadas
  completeTask(id: string, task: any){
    this.user = this.auth.isLoging();
    return this.afs.collection('users').doc(this.user.uid).collection('completed-tasks').add(task)
      .then(()=>{
        this.deletePendingTask(id);
      }).catch(()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido completar la tarea'});
      });
  }

  //Metodo que se encarga de sacar una tarea de la lista de completadas y agregarla a la lista de pendientes
  uncompleteTask(id: string, task: any){
    this.user = this.auth.isLoging();
    return this.afs.collection('users').doc(this.user.uid).collection('pending-tasks').add(task)
      .then(()=>{
        this.deleteCompletedTask(id);
      }).catch(()=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'No se ha podido completar la tarea'});
      });
  }

  //Metodo que se encarga de obtener una tarea pendiente del usuario logeado
  getPendingTask(id: string){
    this.user = this.auth.isLoging();
    return this.afs.collection('users').doc(this.user.uid).collection('pending-tasks').doc(id).snapshotChanges();
  }

  //Metodo que se encarga de obtener una tarea completada del usuario logeado
  getCompletedTask(id: string){
    this.user = this.auth.isLoging();
    return this.afs.collection('users').doc(this.user.uid).collection('completed-tasks').doc(id).snapshotChanges();
  }

}
