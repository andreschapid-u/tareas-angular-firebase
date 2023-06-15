import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../../models/task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input('task') task: Task = new Task();
  showActions: boolean = false;
  @Input('showCompleted') showCompleted: boolean = false;
  @Input('classState') classState: string[] = [];

  @Output('editTaskEmiter') editTaskEmiter = new EventEmitter<Task>();
  @Output('deleteTaskEmiter') deleteTaskEmiter = new EventEmitter<Task>();
  @Output('completedTaskEmiter') completedTaskEmiter = new EventEmitter<Task>();
  @Output('showTasksEmiter') showMoreTasksEmiter = new EventEmitter<Task>();
  @Output('toPendingTaskEmiter') toPendingTaskEmiter = new EventEmitter<Task>();
  constructor() { }

  ngOnInit(): void {
    this.showActions = false;
    this.cargarAcciones();
  }


  //Metodo encargado de emitir el evento para mostrar el formulario para editar una tarea
  editTask(){
    this.editTaskEmiter.emit(this.task);
  }

  //Metodo encargado de emitir el evento para eliminar una tarea
  deleteTask(){
    this.deleteTaskEmiter.emit(this.task);
  }

  //Metodo encargado de emitir el evento para marcar una tarea como completada
  completedTask(){
    this.completedTaskEmiter.emit(this.task);
  }

  //Metodo encargado de emitir el evento para mostrar otras 10 tareas
  showMoreTasks(){
    this.showMoreTasksEmiter.emit(this.task);
  }

  //Metodo encargado de emitir el evento para marcar una tarea como pendiente
  value: number = 1;
  paymentOptions: any[] = [];
  undoCompletedTask(){
    this.toPendingTaskEmiter.emit(this.task);
  }

  toggleActions(){
    this.showActions = !this.showActions;
  }

  optionClick($event: any) {
    console.log("Evento", $event)
    console.log("Valor", this.value)
    console.log("Task", this.task)
    switch (this.value) {
      case 1:
        console.log("Completar tarea")
        this.completedTask();
        break;
      case 2:
        console.log("Editar tarea")
        this.editTask();
        break;
      case 3: case 5:
        console.log("Eliminar tarea")
        this.deleteTask();
        break;
      case 4:
        console.log("Marcar como pendiente")
        this.undoCompletedTask();
        break;
        default:
          console.log("No se ha seleccionado ninguna opción")
          break;
    }
  }

  private cargarAcciones() {
    if(this.showCompleted) {
      this.paymentOptions = [
        {name: 'Eliminar', value: 5},
        {name: 'Marcar como pendiente', value: 4}
      ];
    } else {
      this.paymentOptions = [
        {name: 'Marcar como completada', value: 1},
        {name: 'Editar', value: 2},
        {name: 'Eliminar', value: 3},
      ];
    }
  }

  showDetailsTask() {
    this.showMoreTasksEmiter.emit(this.task);
  }
}
