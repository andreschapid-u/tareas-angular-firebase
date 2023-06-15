import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ServiceTasksService} from "../../../services/service-tasks.service";
import {Task} from "../../../models/task";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit {
  public formTask: FormGroup;
  titleError: boolean = false;
  descriptionError: boolean = false;
  @Input('task') task: Task = new Task();
  constructor(private taskService: ServiceTasksService,
              private fb: FormBuilder,
              private router:Router) {
    this.formTask = this.fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createTask() {
    //Validar que el formulario sea valido
    if (this.formTask.valid) {
      //Crear una tarea
      console.log(this.formTask.value);
      let task = new Task();
      task.title = this.formTask.value.title;
      task.description = this.formTask.value.description;
      task.created_at = (new Date()).toString();
      task.updated_at = '';
      this.taskService.createTask(task);
      this.router.navigate(['/tasks']);
    }else{
      this.titleError = this.formTask.value.title == null || this.formTask.value.title == '';
      this.descriptionError = this.formTask.value.description == null || this.formTask.value.description == '';
    }
  }

  /**
   * Retorna los controles del formulario
   **/
  public get form() {
    return this.formTask.controls;
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
