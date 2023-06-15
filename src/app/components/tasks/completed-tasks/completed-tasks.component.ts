import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServiceTasksService} from "../../../services/service-tasks.service";
import {Task} from "../../../models/task";
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.component.html',
  styleUrls: ['./completed-tasks.component.scss']
})
export class CompletedTasksComponent implements OnInit, OnDestroy {

  public tasks: Task[] = [];
  public cargando: boolean = true;
  onDestroy$: Subject<void> = new Subject();
  constructor(private tasksService: ServiceTasksService) { }

  ngOnInit(): void {
    this.getCompletedTasks();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  //Metodo encargado de obtener las tareas completadas del usuario logeado, maximno 10
  getCompletedTasks(){
    this.tasksService.getCompletedTasks().pipe(takeUntil(this.onDestroy$)).subscribe(data => {
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
      });
    });
  }

  //Metodo encargado de eliminar una tarea completada del usuario logeado
  deleteCompletedTask(id: string){
    this.tasksService.deleteCompletedTask(id);
  }

  //Metodo encargado de marcar una tarea como pendiente del usuario logeado
  undoCompletedTask(id: string, task: Task){
    this.tasksService.uncompleteTask(id, task);
  }

  //Metodo encargado de mostrar otras 10 tareas completadas del usuario logeado
  showMoreTasks(){
    this.tasksService.getCompletedTasks().pipe(takeUntil(this.onDestroy$)).subscribe(data => {
      this.tasks = [];
      data.forEach((element: any) => {
        this.tasks.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }
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
