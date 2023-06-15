import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from "../../../models/task";
import {ServiceTasksService} from "../../../services/service-tasks.service";
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss']
})
export class PendingTasksComponent implements OnInit, OnDestroy {

  public tasks: Task[] = [];
  public cargando: boolean = true;
  onDestroy$: Subject<void> = new Subject();
  constructor(private tasksService: ServiceTasksService) { }

  ngOnInit(): void {
    this.getPendingTasks();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  //Metodo encargado de obtener las tareas pendientes del usuario logeado, maximno 10
  getPendingTasks(){
    this.tasksService.getPendingTasks().pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      this.tasks = [];
      this.cargando = false;
      data.forEach((element: any) => {
        let task: Task = {
          id: element.payload.doc.id,
          title: element.payload.doc.data().title,
          description: element.payload.doc.data().description,
          user_id: element.payload.doc.data().user_id,
          created_at: element.payload.doc.data().created_at,
          updated_at: element.payload.doc.data().updated_at
        }
        this.tasks.push(task);
        console.log("Elemento: ", element.payload.doc.id);
      });
      console.log("Tareas pendientes: ", this.tasks);
    });
  }

  //Metodo encargado de eliminar una tarea pendiente del usuario logeado
  deletePendingTask(id: string){
    console.log("Eliminando tarea pendiente: " + id);
    this.tasksService.deletePendingTask(id);
  }

  //Metodo encargado de marcar una tarea como completada del usuario logeado
  completeTask(id: string, task: Task){
    console.log("Completando tarea: " + id);
    this.tasksService.completeTask(id, task);
  }

  //Metodo encargado de editar una tarea pendiente del usuario logeado
  displayDialog: boolean = false;
  task: Task = {
    id: '',
    title: '',
    description: '',
    user_id: '',
    created_at: '',
    updated_at: ''
  };

  viewTask(task: Task) {
    console.log("Tarea a editar: ", task);
    this.task = task;
    this.displayDialog = true;
  }

  cerrarDialog() {
    this.displayDialog = false;
  }
}
